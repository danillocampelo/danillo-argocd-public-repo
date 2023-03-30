import { Location } from './Location'
import { Image } from './Image'
import { Experience } from './Experience'
import { Hotel } from './Hotel'
import { Insurance } from './Insurance'
import { Price } from './Price'
import { Metainfo } from './Metainfo'
import { Roadmap } from './RoadMap'
import { Fare } from './Fare'
import { Flight } from './Flight'
import { FacilityDto } from '@api/hotels/dtos/FacilityDto'

export interface Package {
  id: string
  title: string
  subtitle: string
  insurance?: Insurance
  experience: Experience
  destination: Location
  packageDefault?: {
    days: number
    nights: number
    price: Price
    miles?: number
    installments?: {
      number?: number
      fare?: Fare
    }
  }
  hotels: Hotel[]
  metainfos?: Metainfo[]
  facilities?: FacilityDto[]
  texts?: {
    description: string
    type: number // Usado para definir a posição do texto nas telas
  }[]
  cover: Image
  highlight?: boolean
  images?: Image[]
  roadMap?: Roadmap
  startDate?: Date
  endDate?: Date
}
