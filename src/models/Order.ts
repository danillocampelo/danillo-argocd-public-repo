import { Flight } from './Flight'
import { Hotel } from './Hotel'
import { Package } from './Package'
import { Payment } from './Payment'
import { Person } from './Person'
import { Room } from './Room'

export interface Order {
  id: string
  package: Pick<Package, 'id' | 'title' | 'cover' | 'destination'>
  flights: Partial<Flight>[]
  startDate: Date
  duration: number
  payment: Payment[]
  people: Pick<Person, 'name' | 'type'>[]
  hotels: Omit<Hotel, 'startDate' | 'endDate'>[]
  rooms: Room[]
}
