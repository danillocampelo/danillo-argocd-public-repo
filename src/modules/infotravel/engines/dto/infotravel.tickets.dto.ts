import {InfotravelFareDTO} from '../../services/engines/dto/infotravel.fare.dto'
import {InfotravelTravellerDTO} from '../../services/engines/dto/infotravel.traveller.dto'

export interface InfotravelTicketsDto {
  locators: []
  ticket: InfotravelTicketDto
  names: InfotravelTravellerDTO[]
  fares: InfotravelFareDTO[]
}

export interface InfotravelTicketDto {
  code: number
  name: string
  star: Date
  end: Date
  unique: boolean
  image: {
    large: string
    medium: string
    small: string
  }
}
