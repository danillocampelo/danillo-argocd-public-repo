import { FacilityDto } from './FacilityDto'
import { RoomDTO } from './RoomDto'

export interface HotelDto {
  id: string
  available: boolean
  name: string
  provider: string
  stars: number
  description: string
  images: {
    large?: string
    big?: string
    small: string
    medium: string
  }[]
  facilities: FacilityDto[]
  tags: {
    description: string
    type: 1 | 2 | 3 | 4
  }[]
  checkIn: Date
  checkOut: Date
  infos: {
    icon: string
    title: string
  }[]
  days: number
  rooms: RoomDTO[]
}
