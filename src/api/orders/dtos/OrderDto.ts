import { FlightType } from '@models/Flight'
import { PersonType } from '@models/Person'

type FacilityDto = {
  id: number
  name: string
  description?: string
}

export type TravelerDto = {
  name: string
  type: PersonType
}

type RoomDto = {
  title: string
  description: string
  facilities: FacilityDto[]
  travellers: TravelerDto[]
}

export type OrderDto = {
  id: string
  package: {
    id: string
    name: string
    image: string
  }
  firstCheckIn: Date
  duration: number
  destination: string
  travellers: TravelerDto[]
  flights: {
    type: FlightType
    origin: string
    destination: string
    date: Date
  }[]
  hotels: {
    stars?: number
    image: string
    title: string
    description: string
    facilities: FacilityDto[]
    rooms: RoomDto[]
  }[]
  rooms: RoomDto[]
}
