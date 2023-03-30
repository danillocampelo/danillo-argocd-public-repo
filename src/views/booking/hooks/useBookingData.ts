import { CheckoutFormData } from '@contexts/CheckoutContext/CheckoutContext'
import { PackageAvailability } from '@api/availability/AvailabilityServiceApi'
import { Room } from '@models/Room'
import { Hotel } from '@models/Hotel'
import { Flight } from '@models/Flight'
import {
  calculateTotalFares,
  reduceItemPrices,
} from '@utils/calculateTotalPrice'
import { Fare } from '@models/Fare'

type Props = {
  checkoutFormData: CheckoutFormData
  packageAvailability: PackageAvailability
}

type PriceInfo = {
  total: number
  fees: number
}

type Result = {
  occupancy: number
  prices: PriceInfo & {
    hotel: PriceInfo
    flights: PriceInfo
  }
  hotel: Hotel
  rooms: Room[]
  flights: {
    departure: Flight
    return: Flight
  }
}

export const useBookingData = ({
  checkoutFormData,
  packageAvailability,
}: Props): Result => {
  const departureFlight = packageAvailability?.departureFlights.find(
    (flight) => flight.id === checkoutFormData.departureFlightId,
  )
  const returnFlight = packageAvailability?.returnFlights.find(
    (flight) => flight.id === checkoutFormData.returnFlightId,
  )

  const flights = [departureFlight!, returnFlight!]

  const hotel = packageAvailability.hotels.find(
    (hotel) => hotel.id === checkoutFormData.hotelId,
  )!

  const roomIds = checkoutFormData.roomsId || []
  const rooms = hotel?.rooms.filter((room) => roomIds.includes(room.id)) || []

  hotel.rooms = rooms

  const occupancy =
    checkoutFormData?.roomsQuantities?.reduce((total, roomQuantity) => {
      total += roomQuantity.adults
      total += roomQuantity.children
      total += roomQuantity.babies
      return total
    }, 0) || 0

  const hotelAmount = rooms ? reduceItemPrices(rooms) : 0
  const flightsAmount = flights ? reduceItemPrices(flights) : 0

  const roomFeesArray: Fare[] = []
  rooms.forEach((room) =>
    roomFeesArray.push(
      ...(room.fares?.filter((fare) => fare.type !== 'FARE') || []),
    ),
  )

  const hotelFees = roomFeesArray.length
    ? calculateTotalFares(roomFeesArray)
    : 0

  const flightsFeesArray: Fare[] = []
  flights.forEach((flight) =>
    flightsFeesArray.push(
      ...(flight.fares?.filter((fare) => fare.type !== 'FARE') || []),
    ),
  )

  const flightFees = flightsFeesArray.length
    ? calculateTotalFares(flightsFeesArray)
    : 0

  return {
    occupancy,
    hotel,
    rooms,
    flights: {
      departure: departureFlight!,
      return: returnFlight!,
    },
    prices: {
      total: hotelAmount + flightsAmount,
      fees: hotelFees + flightFees,
      hotel: {
        total: hotelAmount,
        fees: hotelFees,
      },
      flights: {
        total: flightsAmount,
        fees: flightFees,
      },
    },
  }
}
