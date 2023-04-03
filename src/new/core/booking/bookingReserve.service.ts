import {Inject, Injectable} from '@nestjs/common'
import {BookingInfotravelMapper} from '~/modules/booking/mappers/booking.infotravel.mapper'
import {InfotravelService} from '~/modules/infotravel/infotravel.service'
import {InfotravelBookingReservationInputBodyDTO} from '~/modules/infotravel/services/engines/dto/infotravel.booking.reservation.dto'

@Injectable()
export class BookingReserveService {
  constructor(
    @Inject(InfotravelService)
    private readonly infotravelDataSource: InfotravelService,
    @Inject(BookingInfotravelMapper)
    private readonly bookingMapper: BookingInfotravelMapper,
  ) {}

  async bookingReservation(input: {
    memberCode: any
    bookingId: number
    paymentId: string
    reservationData: string
  }) {
    const userInfotravel = await this.infotravelDataSource.getUserByMemberCode(
      input.memberCode,
    )
    const inputBody = JSON.parse(input.reservationData)
    const infotravelInputBody =
      this.bookingMapper.mapBookingReservationInputToInfotravel(
        inputBody,
        userInfotravel.id,
        input.paymentId,
      )
    const result = await this.infotravelDataSource.bookingReservation(
      infotravelInputBody,
    )
    return result
  }
}
