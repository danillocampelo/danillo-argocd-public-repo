import { Location } from './Location'
import { Order } from './Order'
import { Person } from './Person'

export interface User extends Person {
  phone: string
  email: string
  address: Location
  order: Order[]
}
