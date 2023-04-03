import {PaymentSession} from '../models/payment.session'

export interface PaymentDatasource {
  startSession(input: Partial<PaymentSession>): Promise<PaymentSession>
}

export const PaymentDatasource = Symbol('PaymentDatasource')
