import {InfotravelFareDTO, InfotravelPriceDTO} from './infotravel.fare.dto'
import {InfotravelTravellerDTO} from './infotravel.traveller.dto'

export interface InfotravelHotelDTO {
  locators: string[]
  hotel: {
    id: number
    keyDetail: string
    name: string
    address: {
      zipcode: string
      address: string
      number: string
      complement: string
      city: {
        name: string
        state: string
        country: {
          code: string
          name: string
        }
      }
      neighborhood: string
      coordinates: {
        latitude: number
        longitude: number
      }
    }
  }
  rooms: InfotravelRoomDTO[]
}

export interface InfotravelRoomDTO {
  roomType: {
    code: string
    name: string
    description: string
  }
  fares: InfotravelFareDTO[]
  boardType: {
    code: string
    name: string
  }
  cancellationPolicies: {
    refundable: boolean
    penalties: {
      description: string
      price: InfotravelPriceDTO
      percent: number
    }[]
  }
  checkIn: string
  checkOut: string
  names: InfotravelTravellerDTO[]
}

export interface InfotravelFaclitiesDTO {
  id: number
  name: string
  items: InfotravelFacilityItemDTO[]
}

export interface InfotravelFacilityItemDTO {
  id: number
  name: string
}
