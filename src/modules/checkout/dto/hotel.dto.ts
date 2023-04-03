import {Type} from 'class-transformer'
import {IsBoolean, IsDateString, IsNumber, IsString} from 'class-validator'
import {
  FaresDTO,
  MetadataDTO,
  PriceDTO,
  RoomsDTO,
  TagsDTO,
} from './hotel.attributes.dto'

export class HotelDTO {
  @IsString()
  id: string

  @IsBoolean()
  available: boolean

  @IsString()
  name: string

  @IsNumber()
  stars: number

  @Type(() => TagsDTO)
  tags: TagsDTO[]

  @IsDateString()
  checkIn: Date

  @IsDateString()
  checkOut: Date

  @Type(() => MetadataDTO)
  metadata: MetadataDTO[]

  @IsNumber()
  days: number

  @Type(() => RoomsDTO)
  rooms: RoomsDTO[]

  @Type(() => PriceDTO)
  price: PriceDTO[]
}
