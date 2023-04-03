import {HttpStatus, Inject, Injectable, Logger} from '@nestjs/common'
import {ConfigService} from '@nestjs/config'
import {UserAuthentication} from '~/common/auth/models/UserAuthentication'
import {
  IResponse,
  ResponseHttp,
} from '~/common/responseHttp/responseHttp.entity'
import {StatusReserve} from '~/modules/database/entity/reserve.entity'
import {StartPaymentInputDTO} from '~/new/ports/input/api/payment/dto/start.payment.dto'
import {BookingReserveService} from '../booking/bookingReserve.service'
import {ReserveService} from '../reserve/reserve.service'
import {PaymentDatasource} from './datasource/payment.datasource'
import {
  NotificationRequestItem,
  PaymentNotification,
  PaymentNotificationEventCode,
  PaymentNotificationSuccess,
  PaymentQueuePatterns,
  sendMessage,
} from './models/payment.notification'
import {PaymentQueue} from './queue/payment.queue'

@Injectable()
export class PaymentService {
  @Inject(PaymentDatasource)
  private readonly paymentDatasource: PaymentDatasource

  @Inject(PaymentQueue)
  private readonly paymentQueue: PaymentQueue
  private config = new ConfigService()
  private QUEUE_URL = this.config.get('QUEUE_URL')
  private QUEUE_URL_FAILURE = this.config.get('QUEUE_URL_FAILURE')
  private PAYMENT_MESSAGE_GROUP_ID = this.config.get('PAYMENT_MESSAGE_GROUP_ID')

  constructor(
    private readonly reserveService: ReserveService,
    private readonly bookingService: BookingReserveService,
  ) {}

  async handleNotifications(input: PaymentNotification): Promise<void> {
    Logger.log(
      '[PaymentService] [handleNotifications] input: ',
      JSON.stringify(input),
    )

    const notification = this.verifyNotification(
      input.notificationItems[0].NotificationRequestItem,
    )
    if (notification) {
      const params: sendMessage = {
        MessageBody: JSON.stringify(notification.message),
        QueueUrl: notification.queue,
        MessageGroupId: notification.groupId,
      }
      this.paymentQueue.sendMessage(params)
    }
  }

  verifyNotification(input: NotificationRequestItem) {
    if (input.eventCode === PaymentNotificationEventCode.Authorisation) {
      if (input.success === PaymentNotificationSuccess.TRUE) {
        return {
          message: {
            pattern: PaymentQueuePatterns.PAYMENT_QUEUE_PATTERN_SUCCESS,
            data: input,
          },
          queue: this.QUEUE_URL,
          groupId: this.PAYMENT_MESSAGE_GROUP_ID,
        }
      }

      if (input.success === PaymentNotificationSuccess.FALSE) {
        return {
          message: {
            pattern: PaymentQueuePatterns.PAYMENT_QUEUE_PATTERN_ERROR,
            data: input,
          },
          queue: this.QUEUE_URL_FAILURE,
          groupId: this.PAYMENT_MESSAGE_GROUP_ID,
        }
      }
    }
    return null
  }

  async startReserve(input: StartPaymentInputDTO, user: UserAuthentication) {
    try {
      const sessionResult = await this.paymentDatasource.startSession({
        amount: input?.amount,
        reference: input?.bookingId,
        returnUrl: input?.returnUrl,
      })
      if (!sessionResult) {
        return new ResponseHttp<IResponse>({
          statusCode: 422,
          message: 'Não foi possivel iniciar uma sessão de pagamento',
        })
      }
      const reserve = await this.reserveService.addReserve(
        input,
        sessionResult,
        user,
      )

      if (!reserve) {
        return new ResponseHttp<IResponse>({
          statusCode: 422,
          message:
            'Não foi possivel salvar a informações de reserva e pagamento',
        })
      }

      return new ResponseHttp<IResponse>({
        entity: sessionResult,
      })
    } catch (error) {
      return new ResponseHttp<IResponse>({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `Erro inesperado: ${error.message}`,
      })
    }
  }

  async handlePaymentMessage(input: NotificationRequestItem): Promise<void> {
    const pendingReservation = await this.reserveService.getPendingReservation(
      input.merchantReference,
    )
    try {
      if (pendingReservation) {
        const booking = await this.bookingService.bookingReservation({
          bookingId: Number(pendingReservation.bookingId),
          memberCode: pendingReservation.memberCode,
          paymentId: input.pspReference,
          reservationData: pendingReservation.reservationData,
        })

        if (!booking) {
          const notification = {
            message: {
              pattern: PaymentQueuePatterns.PAYMENT_QUEUE_PATTERN_ERROR,
              data: input,
            },
            queue: this.QUEUE_URL_FAILURE,
            groupId: this.PAYMENT_MESSAGE_GROUP_ID,
          }

          const params: sendMessage = {
            MessageBody: JSON.stringify(notification.message),
            QueueUrl: notification.queue,
            MessageGroupId: notification.groupId,
          }
          this.paymentQueue.sendMessage(params)

          Logger.error(
            '[PaymentService] [handlePaymentMessage] error: ',
            `Não foi possivel realizar a reserva do booking: ${input.merchantAccountCode}`,
          )
        }

        await this.reserveService.updateReservation(
          booking.booking.id.toString(),
          StatusReserve.success,
        )
        Logger.log(
          '[PaymentService] [handlePaymentMessage] error: ',
          `reserva realizada com sucesso, booking: ${input.merchantAccountCode}`,
        )
      }
    } catch (error) {
      Logger.error(
        '[PaymentService] [handlePaymentMessage] error: ',
        `Não foi possivel realizar a reserva do booking: ${input.merchantAccountCode}`,
      )
      const notification = {
        message: {
          pattern: PaymentQueuePatterns.PAYMENT_QUEUE_PATTERN_ERROR,
          data: {...input, errorMessage: error.message},
        },
        queue: this.QUEUE_URL_FAILURE,
        groupId: this.PAYMENT_MESSAGE_GROUP_ID,
      }

      const params: sendMessage = {
        MessageBody: JSON.stringify(notification.message),
        QueueUrl: notification.queue,
        MessageGroupId: notification.groupId,
      }
      this.paymentQueue.sendMessage(params)
    }
  }
}
