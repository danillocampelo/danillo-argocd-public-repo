import { Image } from './Image'
import { Room } from './Room'
import { Location } from './Location'
import { Metainfo } from './Metainfo'
import { Fare } from './Fare'
import { Price } from './Price'
import { FacilityDto } from '@api/hotels/dtos/FacilityDto'

export interface Hotel {
  id: string
  name: string
  description?: string
  provider: string
  stars: number
  images?: Image[]
  rooms?: Room[]
  facilities?: FacilityDto[]
  startDate?: Date
  endDate?: Date
  location?: Location
  metainfos?: Metainfo[]
  fares?: Fare[]
  recommended?: boolean
  price?: Price
  days?: number
}
