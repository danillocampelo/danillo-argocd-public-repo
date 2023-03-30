import { FareDto } from '@api/hotels/dtos/FareDto'

export interface FlightDto {
  key: string
  airline: {
    code: string
    name: string
  }
  origin: {
    location: {
      iata: string
      city: string
    }
  }
  destination: {
    location: {
      iata: string
      city: string
    }
  }
  stops: number
  duration: number
  departure: Date
  arrival: Date
  number: string
  recommended: boolean
  fares: FareDto[]
  info: {
    icon: string
  }
}
