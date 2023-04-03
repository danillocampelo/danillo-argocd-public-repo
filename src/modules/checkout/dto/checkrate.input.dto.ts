import {ApiProperty} from '@nestjs/swagger'
import {Type} from 'class-transformer'
import {ValidateNested} from 'class-validator'
import {PersonDTO} from './person.dto'

type CheckoutMetadata = string

export enum DocumentType {
  CPF = 'CPF',
  RG = 'RG',
}

export enum PersonAgeType {
  Adult = 'adult',
  Child = 'child',
  Infant = 'infant',
}

class CheckRatesHotelsRoomsInputDTO {
  @ApiProperty()
  id: string

  @ApiProperty({
    isArray: true,
    description: 'The persons information collected for this room.',
    type: PersonDTO,
  })
  @Type(() => PersonDTO)
  @ValidateNested()
  persons: PersonDTO[]
}

export enum HotelProvider {
  OMNIBEES = 'OMNIBEES',
  EXPEDIA = 'EXPEDIA',
  EXPEDIA_NAC = 'EXPEDIA NAC',
}

class CheckRatesHotelsInputDTO {
  @ApiProperty()
  id: number

  @ApiProperty({enum: HotelProvider})
  provider: HotelProvider

  @ApiProperty({isArray: true, type: CheckRatesHotelsRoomsInputDTO})
  @Type(() => CheckRatesHotelsRoomsInputDTO)
  @ValidateNested()
  rooms: CheckRatesHotelsRoomsInputDTO[]
}

class CheckRatesFlightsInputDTO {
  @ApiProperty({
    isArray: true,
    description:
      'The ids of the flights (usually both departure and returning flight ids).',
  })
  ids: string[]

  @ApiProperty({
    isArray: true,
    description: 'The persons information collected for this flight.',
    type: PersonDTO,
  })
  @Type(() => PersonDTO)
  @ValidateNested()
  persons: PersonDTO[]
}

class CheckRatesInsurancesInputDTO {
  @ApiProperty()
  id: string

  @ApiProperty({
    isArray: true,
    description: 'The persons information collected for this insurance.',
    type: PersonDTO,
  })
  @Type(() => PersonDTO)
  @ValidateNested()
  persons: PersonDTO[]
}

export class CheckRatesBaseInputDTO {
  @ApiProperty({
    type: String,
    description:
      'The checkoutMetadata string received in the checkout endpoint. (This is the package key from Infotravel, obtained in the package availability API).',
  })
  checkoutMetadata: CheckoutMetadata

  @ApiProperty({isArray: true, type: CheckRatesHotelsInputDTO})
  @Type(() => CheckRatesHotelsInputDTO)
  @ValidateNested()
  hotels: CheckRatesHotelsInputDTO[]

  @ApiProperty({isArray: true, type: CheckRatesFlightsInputDTO})
  @Type(() => CheckRatesFlightsInputDTO)
  @ValidateNested()
  flights: CheckRatesFlightsInputDTO[]

  @ApiProperty({
    isArray: true,
    required: false,
    type: CheckRatesInsurancesInputDTO,
    description: 'Insurances not implemented at the moment.',
  })
  insurances?: CheckRatesInsurancesInputDTO[]

  @ApiProperty()
  servicePackages: any

  @ApiProperty()
  tickets: any

  @ApiProperty()
  tours: any

  @ApiProperty()
  serviceOthers: any

  @ApiProperty()
  transfers: any
  toJSON() {
    return this
  }
}

export class CheckRatesInputDto extends CheckRatesBaseInputDTO {}
