import { Fare } from './Fare'
import { Price } from './Price'

export interface Insurance {
  id: string
  name: string
  description: string
  recommended?: boolean
  price: Price
  fares?: Fare[]
}
