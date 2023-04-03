import {ApiProperty} from '@nestjs/swagger'
import {InfoteraFlightSegmentClass} from '~/modules/infotravel/services/engines/dto/commons/InfoteraFlightSegmentClass'
import {InfotravelDiscountType} from '~/modules/infotravel/services/engines/dto/commons/InfotravelDiscountType'
import {InfotravelPolicyType} from '../../infotravel/services/engines/dto/commons/InfotravelPolicyType'
import {PersonDTO} from './person.dto'
import {Policy2} from '~/modules/infotravel/services/engines/dto/infotravel.checkrates.engine.dto'

class CountryDTO {
  @ApiProperty({example: 'BR'})
  code: string
}

class CityDTO {
  @ApiProperty()
  name: string

  @ApiProperty({type: CountryDTO})
  country: CountryDTO
}

class LocationDTO {
  @ApiProperty({example: 'GRU'})
  code: string

  @ApiProperty({
    example:
      'GUARULHOS - GOVERNADOR ANDRÉ FRANCO MONTORO INTERNATIONAL AIRPORT',
  })
  name: string

  @ApiProperty({type: CityDTO})
  city: CityDTO
}

class AirlineDTO {
  @ApiProperty({example: 'G3'})
  code: string

  @ApiProperty({example: 'Gol'})
  name: string
}

export class FlightBaseDTO {
  @ApiProperty({type: AirlineDTO})
  airline: AirlineDTO

  @ApiProperty({type: LocationDTO})
  origin: LocationDTO

  @ApiProperty({type: LocationDTO})
  destination: LocationDTO

  @ApiProperty({example: '2023-02-10T10:20:00.000-03:00'})
  departure: string

  @ApiProperty({example: '2023-02-10T10:20:00.000-03:00'})
  arrival: string

  @ApiProperty({example: '1170'})
  number: string
}

class FlightBaggageDTO {
  @ApiProperty({example: 0})
  quantity: number
}

export class FlightSegmentDTO {
  @ApiProperty({example: 'J'})
  classCode: string

  @ApiProperty({
    example: InfoteraFlightSegmentClass.ECONOMIC,
    enum: InfoteraFlightSegmentClass,
  })
  class: InfoteraFlightSegmentClass

  @ApiProperty()
  baggage: FlightBaggageDTO
}

export class FlightDTO extends FlightBaseDTO {
  @ApiProperty()
  id: string

  @ApiProperty({example: '01:45'})
  duration: string

  @ApiProperty({example: 1})
  stopsCount: number

  @ApiProperty({type: FlightSegmentDTO, isArray: true})
  segments: FlightSegmentDTO[]
}

export class PolicyDTO {
  @ApiProperty()
  name: string

  @ApiProperty()
  description: string

  @ApiProperty({enum: InfotravelPolicyType})
  type: InfotravelPolicyType
}

export class FlightRateDTO {
  @ApiProperty({description: 'Total amount for flight fares.'})
  fareTotal: number

  @ApiProperty({
    type: FlightDTO,
    isArray: true,
    description:
      'At least one item for departure flight and one item for returning flight. More flights might be present.',
  })
  flights: FlightDTO[]

  @ApiProperty({type: PolicyDTO, isArray: true})
  policies: Policy2[]
}

export class RoomRateRoomTypeDTO {
  @ApiProperty()
  code: string
  @ApiProperty()
  name: string
  @ApiProperty()
  description: string
}

export class DiscountDTO {
  @ApiProperty()
  code: string
  @ApiProperty({enum: InfotravelDiscountType})
  type: InfotravelDiscountType
  @ApiProperty()
  description: string
  @ApiProperty()
  amount: number
}

export class CancellationPolicyPriceDTO {
  @ApiProperty()
  currency: string
  @ApiProperty()
  amount: number
  @ApiProperty({required: false})
  coefficient?: number
  @ApiProperty({type: DiscountDTO, isArray: true, required: false})
  discounts?: DiscountDTO[]
}

export class CancellationPolicyPenaltyDTO {
  @ApiProperty({description: 'Date string'})
  from: string
  @ApiProperty()
  description: string
  @ApiProperty({type: CancellationPolicyPriceDTO})
  price: CancellationPolicyPriceDTO
  @ApiProperty({description: 'Percentage of the policy', example: '100%'})
  percent: number
}

export class FacilitiesRateDTO {
  id: number
  name: string
}

export class CancellationPolicyDTO {
  @ApiProperty()
  refundable: boolean
  @ApiProperty({type: CancellationPolicyPenaltyDTO, isArray: true})
  penalties: CancellationPolicyPenaltyDTO[]
}

export class RoomRateDTO {
  @ApiProperty()
  id: string

  @ApiProperty()
  quantity: number

  @ApiProperty({type: RoomRateRoomTypeDTO})
  roomType: RoomRateRoomTypeDTO

  @ApiProperty()
  code: string

  @ApiProperty()
  category: string

  @ApiProperty()
  description: string

  @ApiProperty({type: CancellationPolicyDTO})
  cancellationPolicies: CancellationPolicyDTO

  @ApiProperty({type: PolicyDTO, isArray: true})
  policies: PolicyDTO[]
}

export class HotelRateDTO {
  @ApiProperty({example: 'ID for fetching hotel details'})
  hotelDetailId: string

  @ApiProperty({example: 'Wish Foz do Iguaçu'})
  hotelName: string

  @ApiProperty({example: 'Rua Frei Caneca'})
  adress?: string

  @ApiProperty({example: 'São Paulo'})
  city?: string

  @ApiProperty({description: 'Number hotel stars', example: 5})
  stars?: number

  @ApiProperty({description: 'Hotel facilities'})
  facilities?: FacilitiesRateDTO[]

  @ApiProperty()
  roomCount: number

  @ApiProperty({isArray: true})
  roomCategories: string[]

  @ApiProperty()
  travelerCount: number

  @ApiProperty({description: 'Total amount for hotel fares.'})
  fareTotal: number

  @ApiProperty({type: RoomRateDTO, isArray: true})
  rooms: any
}

export class CheckRatesDTO {
  @ApiProperty({
    description:
      'The id to create the booking with these rates. Use this to call the booking reservation API.',
  })
  bookingId: number

  @ApiProperty()
  persons: PersonDTO[]

  @ApiProperty({type: FlightRateDTO, isArray: true})
  flights: FlightRateDTO[]

  @ApiProperty({type: HotelRateDTO, isArray: true})
  hotels: HotelRateDTO[]

  @ApiProperty()
  reservationData: string
}
