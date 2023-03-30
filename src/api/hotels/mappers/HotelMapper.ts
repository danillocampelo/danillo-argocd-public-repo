import { calculateTotalFares } from '@utils/calculateTotalPrice'
import dayjs from 'dayjs'
import { Fare } from '../../../models/Fare'
import { Hotel } from '../../../models/Hotel'
import { HotelDto } from '../dtos/HotelDto'
import { RoomDTO } from '../dtos/RoomDto'
import { mapFare } from './FaresMapper'
import { mapMetainfoFromFacilities } from './MetainfoMapper'
import { mapRooms } from './RoomMapper'

export const calculateHotelPrice = (hotelDto: HotelDto) => {
  return (
    hotelDto.rooms.reduce((total: number | undefined, roomDto: RoomDTO) => {
      const roomTotal = calculateTotalFares(roomDto.fares)
      if (!total || roomTotal < total) return roomTotal
      return total
    }, undefined) || 0
  )
}

export const mapHotel = (hotelDto: HotelDto): Hotel => {
  return {
    id: hotelDto.id,
    name: hotelDto.name,
    provider: hotelDto.provider,
    description: hotelDto.description,
    images: hotelDto.images?.map((image) => ({
      src: image.large || image.big || '',
    })),
    rooms: hotelDto.rooms.map((room) => mapRooms(room, hotelDto)),
    startDate: dayjs(hotelDto.checkIn).toDate(),
    endDate: dayjs(hotelDto.checkOut).toDate(),
    metainfos: hotelDto.facilities.map(mapMetainfoFromFacilities),
    fares: hotelDto.rooms?.reduce(
      (acc: Fare[], { fares }) => [...acc, ...fares.map(mapFare)],
      [],
    ),
    stars: hotelDto.stars,
    days: hotelDto.days,
    price: {
      amount: calculateHotelPrice(hotelDto),
      currency: hotelDto.rooms[0].fares[0].price.currency || 'BRL',
    },
  }
}
