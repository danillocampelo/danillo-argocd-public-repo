import {ApiProperty} from '@nestjs/swagger'
import {IsEmail, IsString} from 'class-validator'
import {CheckRatesBaseInputDTO} from '~/modules/checkout/dto/checkrate.input.dto'

export class BookingInputContactDTO {
  @IsString()
  @ApiProperty()
  name: string

  @IsEmail()
  @ApiProperty()
  mail: string

  @IsString()
  @ApiProperty()
  telephone: string // TODO: figure out the format required by infotravel
}

export class BookingReservationInputDto extends CheckRatesBaseInputDTO {
  @ApiProperty({
    description: 'The bookingId obtained in the checkRates endpoint',
  })
  id: number

  @ApiProperty({type: BookingInputContactDTO})
  contact: BookingInputContactDTO
}

export class ReservationData {
  bookingId: number
  packageKey: string
  bookingHotels: {
    id: number
    rooms: {
      key: string
      names: any
    }[]
  }[]
  bookingFlights: {
    flights: {key: string}[]
    names: any
  }[]
  bookingTransfers?: {
    transfer: {
      key: string
    }
    names: any
  }[]
  bookingTours?: {
    tour: {
      key: string
    }
    names: any
  }[]
  bookingInsurances?: {
    insurance: {
      key: string
    }
    names: any
  }[]
  bookingServicePackages?: {
    servicePackage: {
      key: string
    }
    names: any
  }[]
  bookingTickets?: {
    ticket: {
      key: string
    }
    names: any
  }[]
  bookingServiceOthers?: {
    other: {
      key: string
    }
    names: any
  }[]
}
