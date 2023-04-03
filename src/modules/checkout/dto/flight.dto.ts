import {ApiProperty} from '@nestjs/swagger'
import {Fare} from './fare.dto'

export class FlightDTO {
  key: string
  airline: Airline
  origin: Origin
  destination: Destination
  stops: number
  duration: number
  departure: Date
  arrival: Date
  number: string
  recommended: boolean
  info: Info[]

  @ApiProperty({type: Fare})
  fares: Fare[]
}

export class Airline {
  code: string
  name: string
}

export class Origin {
  location: Location
}

export class Destination {
  location: Location
}
export class Location {
  iata: string
  city: string
}

export class Info {
  icon: string
}

export class FlightsDTO {
  @ApiProperty({type: [FlightDTO]})
  depart: FlightDTO[]

  @ApiProperty({type: [FlightDTO]})
  return: FlightDTO[]
}
