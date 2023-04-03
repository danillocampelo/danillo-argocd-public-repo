import {Inject, Injectable} from '@nestjs/common'
import * as dayjs from 'dayjs'
import {InfotravelBookingEngineService} from '../infotravel/services/engines/infotravel.booking.engine.service'
import {BookingDatasource} from './booking.datasource'
import {BookingDetailDTO} from './dto/booking.detail.dto'
import {BookingsDTO} from './dto/bookings.dto'
// import {
//   StartPaymentInputDTO,
//   StartPaymentOutputDTO,
// } from './dto/start.payment.dto'

@Injectable()
export class BookingService {
  @Inject()
  private readonly InfotravelBookingEngineService: InfotravelBookingEngineService

  constructor(private readonly bookingDatasource: BookingDatasource) {}

  async getUserBookings(memberNumber: number): Promise<BookingsDTO> {
    // [TODO 4 - MyPurchases]:      Integrate with infotera's "my purchase" endpoint

    /*     const bookingIds = (
      await this.bookingDatasource.getUserBookings(userId?.toString())
    ).map(({id}) => id?.toString()) */
    const bookingIds = await this.InfotravelBookingEngineService.searchBooking(
      memberNumber,
    )
    const bookingIdsString = bookingIds.map((b) => b.id.toString())

    const bookings = await Promise.all(
      bookingIdsString.map((id) => this.bookingDatasource.getBookingDetail(id)),
    )
    const previous = bookings.filter(
      (booking) => dayjs(booking.firstCheckIn).diff(dayjs()) < 0,
    )
    const next = bookings.filter(
      (booking) => dayjs(booking.firstCheckIn).diff(dayjs()) > 0,
    )
    return {
      previous,
      next,
    }
  }

  async getBookingDetail(id: string): Promise<BookingDetailDTO> {
    return this.bookingDatasource.getBookingDetail(id)
  }
}
