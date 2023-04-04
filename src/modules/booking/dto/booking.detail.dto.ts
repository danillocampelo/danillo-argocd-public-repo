import {ApiProperty} from '@nestjs/swagger'
import {Type} from 'class-transformer'

export class PackageDTO {
  @ApiProperty()
  id: string

  @ApiProperty()
  name: string

  @ApiProperty()
  image?: string
}

export enum TravellerTypeDTO {
  ADULT = 'ADULT',
  CHILD = 'CHILD',
}

export class TravellerDTO {
  @ApiProperty()
  name: string

  @ApiProperty({
    enum: TravellerTypeDTO,
    examples: [TravellerTypeDTO.ADULT, TravellerTypeDTO.CHILD],
  })
  type: TravellerTypeDTO
}

export enum SimpleFlightTypeDTO {
  DEPART = 'DEPART',
  RETURN = 'RETURN',
}

export class SimpleFlightDTO {
  @ApiProperty({
    enum: SimpleFlightTypeDTO,
    examples: [SimpleFlightTypeDTO.DEPART, SimpleFlightTypeDTO.RETURN],
  })
  type: SimpleFlightTypeDTO

  @ApiProperty()
  origin: string

  @ApiProperty()
  destination: string

  @ApiProperty()
  date: Date
}

export class Facility {
  @ApiProperty()
  id: number

  @ApiProperty()
  name: string

  @ApiProperty()
  description?: string
}

export class HotelDTO {
  @ApiProperty()
  stars: number

  @ApiProperty()
  image: string

  @ApiProperty()
  title: string

  @ApiProperty()
  description: string

  @ApiProperty({
    isArray: true,
    type: Facility,
  })
  @Type(() => Facility)
  facilities: Facility[]

  @ApiProperty()
  locators: string[]
}

export class RoomDTO {
  @ApiProperty()
  title: string

  @ApiProperty()
  description: string

  @ApiProperty({
    isArray: true,
    type: Facility,
  })
  @Type(() => Facility)
  facilities: Facility[]

  @ApiProperty({
    isArray: true,
    type: TravellerDTO,
  })
  @Type(() => TravellerDTO)
  travellers: TravellerDTO[]
}

export class VoucherDTO {
  @ApiProperty()
  url: string

  @ApiProperty()
  redirect: string
}

export class BookingDetailDTO {
  @ApiProperty()
  id: string

  @ApiProperty({
    type: PackageDTO,
  })
  @Type(() => PackageDTO)
  package: PackageDTO

  @ApiProperty()
  firstCheckIn: Date

  @ApiProperty()
  duration: number

  @ApiProperty()
  destination: string

  @ApiProperty({
    isArray: true,
    type: VoucherDTO,
  })
  @Type(() => VoucherDTO)
  voucher: VoucherDTO

  @ApiProperty({
    isArray: true,
    type: TravellerDTO,
  })
  @Type(() => TravellerDTO)
  travellers: TravellerDTO[]

  @ApiProperty({
    isArray: true,
    type: SimpleFlightDTO,
  })
  @Type(() => SimpleFlightDTO)
  flights: SimpleFlightDTO[]

  @ApiProperty({
    isArray: true,
    type: HotelDTO,
  })
  @Type(() => HotelDTO)
  hotels: HotelDTO[]

  @ApiProperty({
    isArray: true,
    type: RoomDTO,
  })
  @Type(() => RoomDTO)
  rooms: RoomDTO[]
}
