import {Fare} from '../../../../../modules/checkout/dto/fare.dto'
import {
  HotelAvailDTO,
  RoomAvailDTO,
} from '../../../../../modules/checkout/dto/hotelAvail.dto'
import {HotelAvail} from '../../../../../modules/infotravel/services/availbility/entities/packageAvailbility.entity'
import {sortTotalFares} from './sortTotalFares'
import {sumFares} from './sumFares'

export const sumHotelFares = (hotelAvailability: HotelAvail) => {
  return hotelAvailability.roomGroups?.reduce(
    (acc, roomGroup) => {
      const roomGroupTotalFares = roomGroup.rooms?.reduce(
        (acc, room, i) => {
          const {totalPrice, totalMiles} = sumFares(room.fares)
          acc.roomsFares[i] = {
            totalPrice,
            totalMiles,
          }
          return acc
        },
        {roomsFares: []},
      )
      acc.roomsFares = [
        ...acc.roomsFares,
        ...sortTotalFares(roomGroupTotalFares.roomsFares),
      ]
      return acc
    },
    {roomsFares: []},
  )
}
