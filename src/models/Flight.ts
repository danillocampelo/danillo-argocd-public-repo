import { Airline } from './Airline'
import { Fare } from './Fare'
import { Metainfo } from './Metainfo'
import { Price } from './Price'
import { Route } from './Route'

export enum FlightType {
  DEPART = 'DEPART',
  RETURN = 'RETURN',
}

export interface FlightKeyPairs {
  [returnNumber: string]: { departKey: string; returnKey: string }
}
export interface Flight {
  id: string
  keyPairs?: FlightKeyPairs
  route: Route
  departureDate: Date
  arrivalDate: Date
  type: FlightType
  airline: Airline
  number: string
  duration: number
  price: Price
  fees: Price
  fares: Fare[]
  metainfos?: Metainfo
  recommended?: boolean
  scales?: Flight[]
}
