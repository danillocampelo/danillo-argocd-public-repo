import {Inject, Injectable} from '@nestjs/common'
import {plainToClass, plainToInstance} from 'class-transformer'
import * as dayjs from 'dayjs'
import {InfotravelService} from '~/modules/infotravel/infotravel.service'
import {
  InfotravelBookingDetailDTO,
  InfotravelBookingPackagesDTO,
} from '../infotravel/services/engines/dto/infotravel.booking.detail.dto'
import {InfotravelBookingReservationInputBodyDTO} from '../infotravel/services/engines/dto/infotravel.booking.reservation.dto'
import {InfotravelBookingFlightsDTO} from '../infotravel/services/engines/dto/infotravel.flight.dto'
import {
  InfotravelHotelDTO,
  InfotravelRoomDTO,
} from '../infotravel/services/engines/dto/infotravel.hotel.dto'
import {InfotravelBackofficeEngineService} from '../infotravel/services/engines/infotravel.backoffice.engine.service'
import {InfotravelBookingEngineService} from '../infotravel/services/engines/infotravel.booking.engine.service'
import {
  BookingDetailDTO,
  SimpleFlightTypeDTO,
  TravellerTypeDTO,
} from './dto/booking.detail.dto'
import {BookingReservationInputDto} from './dto/booking.reservation.input.dto'
import {BookingInfotravelMapper} from './mappers/booking.infotravel.mapper'

@Injectable()
export class BookingDatasource {
  @Inject(InfotravelBookingEngineService)
  private readonly infotravelBookingEngineService: InfotravelBookingEngineService

  @Inject(InfotravelService)
  private readonly infotravelService: InfotravelService

  @Inject(BookingInfotravelMapper)
  private readonly bookingMapper: BookingInfotravelMapper

  @Inject(InfotravelBackofficeEngineService)
  private readonly infotravelBackofficeEngineService: InfotravelBackofficeEngineService

  async getUserBookings(userId: string) {
    if (!userId) {
      return []
    }
    const {bookings} =
      await this.infotravelBackofficeEngineService.getBookingReservations()

    return bookings
  }

  async getBookingDetail(id: string): Promise<BookingDetailDTO> {
    const bookingDetail =
      await this.infotravelBookingEngineService.getBookingDetail(id)

    const bookingPackage =
      bookingDetail.bookingPackages?.length > 0 &&
      bookingDetail.bookingPackages[0]

    const hotelKeyDetails =
      bookingPackage.bookingHotels?.map(({hotel}) => hotel.keyDetail) || []

    const [packageDetails, hotelDetails] = await Promise.all([
      this.infotravelBookingEngineService.getPackageDetail(
        bookingPackage.package?.id,
      ),
      Promise.all(
        hotelKeyDetails.map((keyDetails) =>
          this.infotravelBookingEngineService.getHotelDetail(keyDetails),
        ),
      ),
    ])

    return this.mapBooking(
      bookingDetail,
      bookingPackage,
      hotelDetails,
      packageDetails,
    )
  }

  private mapBooking(
    booking: InfotravelBookingDetailDTO,
    bookingPackage: InfotravelBookingPackagesDTO,
    hotelDetails: any[],
    packageDetails: any,
  ): BookingDetailDTO {
    const hotels = bookingPackage.bookingHotels || []
    const flights = bookingPackage.bookingFlights || []
    const {duration, firstCheckIn} = this.mapDuration(hotels)

    const hotelsDTO = this.mapHotels(hotelDetails, hotels)
    const res: BookingDetailDTO = {
      id: booking.id.toString(),
      package: {
        id: bookingPackage.package?.id?.toString(),
        name: bookingPackage.package?.name,
        image: packageDetails?.images?.[0]?.big,
      },
      firstCheckIn: firstCheckIn?.toDate(),
      duration: duration,
      destination: packageDetails.destinations?.[0]?.destination?.name,
      travellers: this.mapTravellersFromHotels(hotels),
      hotels: hotelsDTO,
      rooms: hotelsDTO.reduce((rooms, hotel) => [...rooms, ...hotel.rooms], []),
      flights: this.mapFlights(flights),
    }

    return plainToClass(BookingDetailDTO, res, {
      enableImplicitConversion: true,
    })
  }

  private mapDuration(bookingHotels: InfotravelHotelDTO[]) {
    const durationData: {
      firstCheckIn?: dayjs.Dayjs
      lastCheckOut?: dayjs.Dayjs
    } = bookingHotels.reduce(
      (acc, hotel) => {
        hotel.rooms.forEach((room) => {
          const checkIn = dayjs(room.checkIn)
          const checkOut = dayjs(room.checkOut)
          if (!acc.firstCheckIn || checkIn < acc.firstCheckIn) {
            acc.firstCheckIn = checkIn
          }
          if (!acc.lastCheckOut || checkOut > acc.lastCheckOut) {
            acc.lastCheckOut = checkOut
          }
        })
        return acc
      },
      {firstCheckIn: undefined, lastCheckOut: undefined},
    )

    return {
      ...durationData,
      duration:
        durationData.lastCheckOut?.diff(durationData.firstCheckIn, 'days') || 0,
    }
  }

  private mapTravellersFromRoom(room: InfotravelRoomDTO) {
    return room.names.map((item) => ({
      name: item.firstName + ' ' + item.lastName,
      type:
        item.type === 'ADT' ? TravellerTypeDTO.ADULT : TravellerTypeDTO.CHILD,
    }))
  }

  private mapTravellersFromHotels(bookingHotels: InfotravelHotelDTO[]) {
    return bookingHotels.reduce(
      (travellers, hotel) => [
        ...travellers,
        ...hotel.rooms?.reduce(
          (names, room) => [...names, ...this.mapTravellersFromRoom(room)],
          [],
        ),
      ],
      [],
    )
  }

  private mapHotels(hotelDetails: any[], bookingHotels: InfotravelHotelDTO[]) {
    return hotelDetails.map(({hotel}) => {
      const bookingHotel = bookingHotels.find(
        (item) => item.hotel.keyDetail === hotel.keyDetail,
      )
      return {
        stars: hotel.stars,
        image: hotel.images?.[0]?.large,
        title: hotel.name,
        description: hotel.description,
        facilities:
          hotel.facilities?.reduce(
            (acc, facilitiy) => [...facilitiy.items, ...acc],
            [],
          ) || [],
        rooms: bookingHotel.rooms.map((room) => {
          const roomDetail = hotel.rooms?.find(
            (item) => item.code === room.roomType.code,
          )
          return {
            title: roomDetail?.category || room.roomType.name,
            description: roomDetail?.decription || room.roomType.description,
            facilities:
              roomDetail?.facilities?.reduce(
                (acc, facilitiy) => [...facilitiy.items, ...acc],
                [],
              ) || [],
            travellers: this.mapTravellersFromRoom(room),
          }
        }),
      }
    })
  }

  private mapFlights(flights: InfotravelBookingFlightsDTO[]) {
    return flights.reduce(
      (acc, item) => [
        ...acc,
        ...item.flights.map((flight, i) => ({
          origin: flight.origin?.code,
          destination: flight.destination?.code,
          date: flight.departure,
          type:
            i % 2 === 0
              ? SimpleFlightTypeDTO.DEPART
              : SimpleFlightTypeDTO.RETURN,
        })),
      ],
      [],
    )
  }
}
