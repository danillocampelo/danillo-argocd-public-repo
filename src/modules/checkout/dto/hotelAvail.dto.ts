export class HotelAvailDTO {
  id: number
  available: boolean
  provider: string
  name: string
  stars: number
  checkIn: string
  checkOut: string
  days: number
  rooms: any
  facilities: any
  location: LocationHotelAvailDTO
}

export class LocationHotelAvailDTO {
  adress: string
  city: string
}

export class EtinararyAvail {
  title: string
  description: string
}
