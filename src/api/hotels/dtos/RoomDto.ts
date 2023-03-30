import { FacilityDto } from './FacilityDto'
import { FareDto } from './FareDto'

export interface RoomDTO {
  id: string
  available: boolean
  recommended: boolean
  name: string
  refoundable?: boolean
  infos: [
    {
      icon: string
      title: string
    },
  ]
  price: {
    currency: string
    amount: number
  }
  facilities: FacilityDto[]
  fares: FareDto[]
}
