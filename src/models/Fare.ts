import { Price } from './Price'

export interface Fare {
  type: string
  code?: string
  price: Price
}
