import {Body, Controller, Post, UseGuards} from '@nestjs/common'
import {Ctx, MessagePattern, Payload} from '@nestjs/microservices'
import {ApiBody, ApiResponse, ApiTags} from '@nestjs/swagger'
import {Authorized} from '~/common/auth/Authorized'
import {CurrentUser} from '~/common/auth/CurrentUser'
import {UserAuthentication} from '~/common/auth/models/UserAuthentication'
import {ResponseHttp} from '~/common/responseHttp/responseHttp.entity'
import {PaymentApiAdatper} from '~/new/adapters/input/api/payment/payment.api.adapter'
import {
  NotificationRequestItem,
  PaymentQueuePatterns,
} from '~/new/core/payment/models/payment.notification'
import {PaymentService} from '~/new/core/payment/payment.service'
import {SqsContext} from '~/new/ports/output/externalSources/aws/sqs.context'
import {PaymentNotificationInputDTO} from './dto/payment.notification.dto'
import {
  StartPaymentInputDTO,
  StartPaymentOutputDTO,
} from './dto/start.payment.dto'
import {AuthGuard} from '@nestjs/passport'

@Controller('payment')
export class PaymentController {
  constructor(
    private readonly service: PaymentService,
    private readonly adapter: PaymentApiAdatper,
  ) {}

  @ApiTags('payment')
  @ApiResponse({
    status: 200,
  })
  @Post('/notifications')
  @UseGuards(AuthGuard('basic'))
  async handleNotifications(
    @Body() body: PaymentNotificationInputDTO,
  ): Promise<any> {
    await this.service.handleNotifications(
      this.adapter.toPaymentNotificationFromInputDTO(body),
    )
    return new ResponseHttp({
      rawMessage: '[accepted]',
    })
  }

  @ApiTags('payment')
  @ApiResponse({
    status: 200,
    type: StartPaymentOutputDTO,
  })
  @ApiBody({
    type: StartPaymentInputDTO,
  })
  @Post('/session/start')
  @Authorized()
  async startPayment(
    @CurrentUser() user: UserAuthentication,
    @Body() input: StartPaymentInputDTO,
  ) {
    return await this.service.startReserve(input, user)
  }

  @MessagePattern(PaymentQueuePatterns.PAYMENT_QUEUE_PATTERN_SUCCESS)
  async processPayment(@Payload() data: any, @Ctx() context: SqsContext) {
    await this.service.handlePaymentMessage(
      context.getMessageBody<NotificationRequestItem>(),
    )
    context.deleteMessage()
  }

  // @Post('/payteste')
  // async testePayment(@Body() input: NotificationRequestItem) {
  //   await this.service.handlePaymentMessage(input)
  // }
}
