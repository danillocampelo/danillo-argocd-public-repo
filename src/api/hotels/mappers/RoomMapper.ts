import {
  calculateTotalFares,
  calculateTotalFees,
} from '@utils/calculateTotalPrice'
import dayjs, { Dayjs } from 'dayjs'
import { Room } from '../../../models/Room'
import { RoomDTO } from '../dtos/RoomDto'
import { mapFare } from './FaresMapper'
import { mapMetainfoFromFacilities } from './MetainfoMapper'

export const mapRooms = (roomDto: RoomDTO, hotelDto?: any): Room => {
  const startDate: Dayjs | undefined =
    hotelDto.checkIn && dayjs(hotelDto.checkIn)
  const endDate: Dayjs | undefined =
    hotelDto.checkOut && dayjs(hotelDto.checkOut)
  const duration = startDate && endDate && endDate.diff(startDate, 'days')

  return {
    id: roomDto.id,
    title: roomDto.name,
    recommended: roomDto.recommended,
    metainfos: roomDto.facilities.map(mapMetainfoFromFacilities),
    fares: roomDto.fares.map(mapFare),
    startDate: startDate?.toDate(),
    duration,
    guests: [],
    price: {
      amount: calculateTotalFares(roomDto.fares),
      currency: roomDto.fares[0].price.currency || 'BRL',
    },
    fees: {
      amount: calculateTotalFees(roomDto.fares),
      currency: roomDto.fares[0].price.currency || 'BRL',
    },
  }
}
