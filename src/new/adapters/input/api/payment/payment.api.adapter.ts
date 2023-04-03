import {Injectable} from '@nestjs/common'
import {PaymentNotification} from '../../../../core/payment/models/payment.notification'
import {PaymentSession} from '../../../../core/payment/models/payment.session'
import {PaymentNotificationInputDTO} from '../../../../ports/input/api/payment/dto/payment.notification.dto'
import {
  StartPaymentInputDTO,
  StartPaymentOutputDTO,
} from '../../../../ports/input/api/payment/dto/start.payment.dto'

@Injectable()
export class PaymentApiAdatper {
  public toPaymentNotificationFromInputDTO(
    input: PaymentNotificationInputDTO,
  ): any {
    return input
  }

  public toSessionDTOFromPaymentSession(
    input: PaymentSession,
  ): StartPaymentOutputDTO {
    return {
      returnUrl: input.returnUrl,
      bookingId: input.reference,
      sessionId: input.id,
      amount: input.amount,
      sessionData: input.data,
    }
  }

  public toPaymentSessionFromSessionDTO(
    input: StartPaymentInputDTO,
  ): Partial<PaymentSession> {
    return {
      amount: input?.amount,
      reference: input?.bookingId,
      returnUrl: input?.returnUrl,
    }
  }
}
