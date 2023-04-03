export interface CheckoutSessionInputDTO {
  amount: {
    value: number
    currency: string
  }
  returnUrl: string
  reference: string
}

export interface CheckoutSessionOutputDTO extends CheckoutSessionInputDTO {
  id: string
  sessionData: string
}
