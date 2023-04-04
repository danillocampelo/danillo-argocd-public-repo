import {InfotravelFareDTO} from '../../services/engines/dto/infotravel.fare.dto'
import {InfotravelTravellerDTO} from '../../services/engines/dto/infotravel.traveller.dto'

export interface InfotravelServicePackagesDto {
  locators: []
  servicePackge: InfotravelServicePackageDto
  names: InfotravelTravellerDTO[]
  fares: InfotravelFareDTO[]
}

export interface InfotravelServicePackageDto {
  code: number
  name: string
  date: Date
  description: string
  unique: boolean
  image: {
    large: string
    medium: string
    small: string
  }
}
