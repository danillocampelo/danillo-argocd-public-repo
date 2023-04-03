import {ApiProperty} from '@nestjs/swagger'
import {FlightsDTO} from './flight.dto'
import {EtinararyAvail, HotelAvailDTO} from './hotelAvail.dto'
import {ServicePackage} from './servicePackage.dto'

export class AvailbilityDTO {
  @ApiProperty({type: [HotelAvailDTO]})
  hotels: HotelAvailDTO[]

  @ApiProperty({type: [FlightsDTO]})
  flights: FlightsDTO[]

  @ApiProperty({type: [EtinararyAvail]})
  itinerary: EtinararyAvail[]

  @ApiProperty({type: [ServicePackage]})
  servicePackages: ServicePackage[]

  @ApiProperty()
  checkoutMetadata: string

  @ApiProperty()
  tickets: any
  @ApiProperty()
  tours: any
  @ApiProperty()
  transfers: any
  @ApiProperty()
  serviceOthers: any
  @ApiProperty()
  insurances: any
}
