import {Injectable} from '@nestjs/common'
import {PaymentSession} from '../../../../core/payment/models/payment.session'
import {
  CheckoutSessionInputDTO,
  CheckoutSessionOutputDTO,
} from '../../../../ports/output/externalSources/adyen/dto/checkout.session.dto'

@Injectable()
export class AdyenAdapter {
  public toCheckoutSessionFromPaymentSession(
    session: Partial<PaymentSession>,
  ): CheckoutSessionInputDTO {
    return {
      amount: {
        value: session.amount?.value,
        currency: session.amount?.currency,
      },
      returnUrl: session.returnUrl,
      reference: session.reference,
    }
  }

  public toPaymentSessionFromCheckoutSession(
    session: CheckoutSessionOutputDTO,
  ): PaymentSession {
    return {
      amount: {
        value: session.amount?.value,
        currency: session.amount?.currency,
      },
      returnUrl: session.returnUrl,
      reference: session.reference,
      id: session.id,
      data: session.sessionData,
    }
  }
}
