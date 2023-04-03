export class PaymentSession {
  id?: string
  data?: string
  reference: string
  returnUrl: string
  amount: PaymentSessionAmount
}

export class PaymentSessionAmount {
  value: number
  currency: string
}
