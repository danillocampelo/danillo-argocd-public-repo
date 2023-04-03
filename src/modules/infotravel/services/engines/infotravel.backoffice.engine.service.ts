import {Inject, Injectable} from '@nestjs/common'
import {InfotravelService} from '../../infotravel.service'
import {InfotravelBackofficeBooking} from './dto/infotravel.backoffice.booking.dto'

@Injectable()
export class InfotravelBackofficeEngineService {
  @Inject(InfotravelService)
  private readonly infotravelService: InfotravelService

  private readonly basePath = '/backoffice'

  async getBookingReservations(
    start = '2023-01-29',
    end = '2023-01-30',
  ): Promise<InfotravelBackofficeBooking> {
    return this.infotravelService.get<InfotravelBackofficeBooking>(
      `${this.basePath}/booking/search?start=${start}&end=${end}`,
    )
  }
}
