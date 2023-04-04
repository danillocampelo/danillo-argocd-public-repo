import { Fare } from "./fare.dto"

export class HotelAvailDTO {
  id: number
  available: boolean
  provider: string
  name: string
  stars: number
  checkIn: string
  checkOut: string
  days: number
  rooms: RoomAvailDTO & { [index: string]: any }
  facilities: any
  location: LocationHotelAvailDTO
}

export class RoomAvailDTO {
  fares: Fare[]
}

export class LocationHotelAvailDTO {
  adress: string
  city: string
}

export class EtinararyAvail {
  title: string
  description: string
}
