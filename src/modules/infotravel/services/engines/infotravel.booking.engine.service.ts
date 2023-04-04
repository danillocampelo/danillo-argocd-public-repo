import {Inject, Injectable} from '@nestjs/common'
import {ConfigService} from '@nestjs/config'
import * as dayjs from 'dayjs'
import {InfotravelService} from '../../infotravel.service'
import {
  InfotravelBookingDetailDTO,
  InfotravelSearchBooking,
} from './dto/infotravel.booking.detail.dto'

@Injectable()
export class InfotravelBookingEngineService {
  @Inject(InfotravelService)
  private readonly infotravelService: InfotravelService

  @Inject(ConfigService)
  private config: ConfigService

  private readonly basePath = '/booking'

  async getBookingDetail(id: string): Promise<InfotravelBookingDetailDTO> {
    const res = await this.infotravelService.get<InfotravelBookingDetailDTO>(
      `${this.basePath}/${id}`,
    )
    // [TODO 2 - NeedMoreBookings] We need bookings that only are "hotel-flight"
    if (!res.bookingPackages) {
      res.bookingPackages = [
        {
          bookingHotels: res.bookingHotels, //res.bookingPackages[0].bookingHotels,
          package: {id: 31, name: 'PACOTE GRAMADO E CANELA - TESTE'},
          bookingFlights: JSON.parse(
            '[{"flights":[{"airline":{"code":"G3","name":"Gol"},"origin":{"code":"GRU","city":{"name":"São Paulo"}},"destination":{"code":"FOR","city":{"name":"Fortaleza"}},"departure":"2023-01-14T07:00:00.000-03:00","arrival":"2023-01-14T11:00:00.000-03:00","number":"123","duration":"04:00","stopsCount":0,"available":true,"segments":[{"airline":{"code":"G3","name":"Gol"},"origin":{"code":"GRU","city":{"name":"São Paulo"}},"destination":{"code":"FOR","city":{"name":"Fortaleza"}},"number":"123","departure":"2023-01-14T07:00:00.000-03:00","arrival":"2023-01-14T11:00:00.000-03:00","classCode":"","baggage":{"quantity":1,"weight":23},"class":"ECONOMIC"}]},{"airline":{"code":"G3","name":"Gol"},"origin":{"code":"FOR","city":{"name":"Fortaleza"}},"destination":{"code":"GRU","city":{"name":"São Paulo"}},"departure":"2023-01-21T08:00:00.000-03:00","arrival":"2023-01-21T12:00:00.000-03:00","number":"124","duration":"04:00","stopsCount":0,"available":true,"segments":[{"airline":{"code":"G3","name":"Gol"},"origin":{"code":"FOR","city":{"name":"Fortaleza"}},"destination":{"code":"GRU","city":{"name":"São Paulo"}},"number":"124","departure":"2023-01-21T08:00:00.000-03:00","arrival":"2023-01-21T12:00:00.000-03:00","classCode":"","baggage":{"quantity":1,"weight":23},"class":"ECONOMIC"}]}],"names":[{"firstName":"JOAO","lastName":"DA SILVA","birth":"1993-12-01","age":29,"type":"ADT"},{"firstName":"MARIA","lastName":"DA SILVA","birth":"1993-12-01","age":29,"type":"ADT"}],"fares":[{"type":"FARE","price":{"currency":"BRL","amount":533.33},"priceNet":{"currency":"BRL","amount":400}},{"type":"BOARDING_RATE","description":"TAXA EMBARQUE","price":{"currency":"BRL","amount":20}},{"type":"BOARDING_RATE","description":"TAXA EMBARQUE","price":{"currency":"BRL","amount":20}}]}]',
          ),
        },
      ]
    }
    return res
  }

  async searchBooking(clientId: number): Promise<InfotravelSearchBooking[]> {
    const start = '2023-01-01'
    const end = dayjs().format('YYYY-MM-DD')
    const res = await this.infotravelService.get<any>(
      `booking/search?start=${start}&end=${end}&idExternalClient=${clientId}`,
    )
    return res
  }

  async getHotelDetail(keyDetail: string): Promise<any> {
    // [TODO 1 - DuplicatedCode] This code will need a refactor since it is also being done by another dev in another PR
    const res = await this.infotravelService.get<any>(
      `/utility/hotelDetail/${keyDetail}`,
    )
    return {
      hotel: {
        ...res.hotel,
        keyDetail,
      },
    }
  }

  async getPackageDetail(id: number): Promise<any> {
    // [TODO 1 - DuplicatedCode] This code will need a refactor since it is also being done by another dev in another PR
    const res = await this.infotravelService.get<any>(`/package/${id}`)
    return res
  }
}
