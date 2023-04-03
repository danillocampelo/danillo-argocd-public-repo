import {InfotravelFareDTO} from './infotravel.fare.dto'
import {InfotravelTravellerDTO} from './infotravel.traveller.dto'

export interface InfotravelBookingFlightsDTO {
  flights: InfotravelFlightDTO[]
  names: InfotravelTravellerDTO[]
  fares: InfotravelFareDTO[]
}

export interface InfotravelFlightDTO extends InfotravelFlightSegmentDTO {
  duration: string
  stopsCount: number
  available: boolean
  segments: (InfotravelFlightSegmentDTO & {
    classCode: string
    baggage: {
      quantity: number
      weight: number
    }
    class: string
  })[]
}

export interface InfotravelFlightSegmentDTO {
  airline: {
    code: string
    name: string
  }
  origin: InfotravelFlightCityDTO
  destination: InfotravelFlightCityDTO
  departure: Date
  arrival: Date
  number: string
}

export interface InfotravelFlightCityDTO {
  code: string
  city: {name: string}
}
