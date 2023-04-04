import {InfotravelFareDTO} from '../../services/engines/dto/infotravel.fare.dto'
import {InfotravelTravellerDTO} from '../../services/engines/dto/infotravel.traveller.dto'

export interface InfotravelInsurancesDto {
  ticket: InfotravelInsuranceDto
  names: InfotravelTravellerDTO[]
  fares: InfotravelFareDTO[]
}

export interface InfotravelInsuranceDto {
  code: number
  name: string
  startDate: Date
  endDate: Date
  unique: boolean
  description: string
  image: {
    large: string
    medium: string
    small: string
  }
}
