import {HttpService} from '@nestjs/axios'
import {Inject, Injectable} from '@nestjs/common'
import {ConfigService} from '@nestjs/config'
import {plainToInstance} from 'class-transformer'
import {AdyenAdapter} from '../../../../adapters/output/externalSources/payment/adyen.adapter'
import {PaymentDatasource} from '../../../../core/payment/datasource/payment.datasource'
import {PaymentSession} from '../../../../core/payment/models/payment.session'
import {
  CheckoutSessionInputDTO,
  CheckoutSessionOutputDTO,
} from './dto/checkout.session.dto'
import {CancelOrRefoundDTO} from './dto/cancelOrRefound.response'

@Injectable()
export class AdyenCheckoutService implements PaymentDatasource {
  @Inject(ConfigService)
  private readonly configService: ConfigService

  @Inject(HttpService)
  private readonly http: HttpService

  @Inject()
  private readonly adapter: AdyenAdapter

  async startSession(input: Partial<PaymentSession>): Promise<PaymentSession> {
    const res = await this.post<
      CheckoutSessionInputDTO,
      CheckoutSessionOutputDTO
    >(`/sessions`, this.adapter.toCheckoutSessionFromPaymentSession(input))

    return plainToInstance(
      PaymentSession,
      this.adapter.toPaymentSessionFromCheckoutSession(res.data),
    )
  }

  private async post<I = any, O = any>(url: string, input?: I) {
    try {
      const res = await this.http.axiosRef.post<O>(
        `${this.getBaseUrl()}/${url}`,
        {
          merchantAccount: this.configService.get('ADYEN_MERCHANT_ACCOUNT'),
          ...input,
        },
        {
          headers: {
            Authorization: `Basic ${this.configService.get(
              'ADYEN_BASIC_AUTHORIZATION',
            )}`,
          },
        },
      )
      return res
    } catch (err) {
      console.log('err: ', err)
      throw err
    }
  }

  private getBaseUrl() {
    return `${this.configService.get('ADYEN_URL')}`
  }

  async cancelOrRefound(pspReference: string, reference: string) {
    const result = await this.post<{reference: string}, CancelOrRefoundDTO>(
      `/payments/${pspReference}/reversals`,
      {
        reference: reference,
      },
    )
    return result.data
  }
}
