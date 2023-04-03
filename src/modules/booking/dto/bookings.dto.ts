import {ApiProperty} from '@nestjs/swagger'
import {BookingDetailDTO} from './booking.detail.dto'

export class BookingsDTO {
  @ApiProperty({
    isArray: true,
    type: BookingDetailDTO,
  })
  previous: BookingDetailDTO[]

  @ApiProperty({
    isArray: true,
    type: BookingDetailDTO,
  })
  next: BookingDetailDTO[]
}
