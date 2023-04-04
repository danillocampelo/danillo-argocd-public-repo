import {InfotravelFareDTO} from '../../services/engines/dto/infotravel.fare.dto'
import {InfotravelTravellerDTO} from '../../services/engines/dto/infotravel.traveller.dto'

export interface InfotravelTransfersDto {
  locators: []
  transfer: InfotravelTransferDto
  names: InfotravelTravellerDTO[]
  fares: InfotravelFareDTO[]
}

export interface InfotravelTransferDto {
  name: string
  date: Date
  description: string
  type: string
  unique: boolean
  code: number
  segments: {
    transportDate: Date
    transportNumber: number
    transportNAme: string
    origin: string
    destination: string
    type: string
    vehicle: {
      type: string
    }
    transportType: string
  }[]
}
