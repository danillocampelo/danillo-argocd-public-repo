import {InfotravelFareDTO} from '../../services/engines/dto/infotravel.fare.dto'
import {InfotravelTravellerDTO} from '../../services/engines/dto/infotravel.traveller.dto'

export interface InfotravelServiceOthersDto {
  locators: []
  other: InfotravelOthersDto
  names: InfotravelTravellerDTO[]
  fares: InfotravelFareDTO[]
}

export interface InfotravelOthersDto {
  code: number
  name: string
  description: string
  date: Date
  unique: boolean
  image: {
    large: string
    medium: string
    small: string
  }
}
