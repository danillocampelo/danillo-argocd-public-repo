import {FlightAvail} from '../../../../../modules/infotravel/services/availbility/entities/packageAvailbility.entity'
import {sortTotalFares} from './sortTotalFares'
import {sumFares} from './sumFares'

export const sumFlightFares = (flightAvailability: FlightAvail) => {
  const flightsTotalFares = flightAvailability.routes?.reduce(
    (acc, {numberRoute, flights}) => {
      const totalFares = flights.map((flight) => {
        const {totalPrice, totalMiles} = sumFares(flight.fares)
        return {
          totalPrice,
          totalMiles,
          type: numberRoute % 2 === 0 ? 'return' : 'departure',
        }
      })

      acc.departureFares = sortTotalFares(
        acc.departureFares.concat(
          totalFares.filter(({type}) => type === 'departure'),
        ),
      )
      acc.returnFares = sortTotalFares(
        acc.returnFares.concat(
          totalFares.filter(({type}) => type === 'return'),
        ),
      )
      return acc
    },
    {departureFares: [], returnFares: []},
  )

  return flightsTotalFares
}
