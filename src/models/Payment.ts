import { Price } from './Price'

export enum CardBrands {
  VISA = 'VISA',
  MASTERCARD = 'MASTERCARD',
  AMEX = 'AMEX',
  DINERS = 'DINERS',
  HIPERCARD = 'HIPERCARD',
  ELO = 'ELO',
  AURA = 'AURA',
  VISA_ELETRON = 'VISA_ELETRON',
  MASTERCARD_MAESTRO = 'MASTERCARD_MAESTRO',
  JCB = 'JCB',
  DISCOVER = 'DISCOVER',
}

export enum PaymentStatuses {
  CAPTURED = 'CAPTURED',
  AUTHORIZED = 'AUTHORIZED',
  ANALYZING = 'ANALYZING',
  PENDING = 'PENDING',
  RECURRENT = 'RECURRENT',
  DENIED = 'DENIED',
  CANCELED = 'CANCELED',
}

export enum PaymentMethod {
  CREDIT_CARD = 'CreditCard',
}

export interface Payment {
  id: string
  method: PaymentMethod
  status: PaymentStatuses
  installments: number
  cardBrand: CardBrands
  cardLastDigits: string
  price: Price
  date: Date
}
