import { Fare } from './Fare'
import { Image } from './Image'
import { Metainfo } from './Metainfo'
import { Person } from './Person'
import { Price } from './Price'

export interface Room {
  id: string
  title: string
  recommended?: boolean
  remaining?: number
  maxGuests?: number
  metainfos: Metainfo[]
  price: Price
  fees: Price
  fares?: Fare[]
  startDate?: Date
  duration?: number
  guests: Partial<Person>[]
}
