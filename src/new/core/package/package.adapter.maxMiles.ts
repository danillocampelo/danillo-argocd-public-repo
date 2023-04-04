import {PackageAvailAdapter} from '~/modules/checkout/adapters/packageAvailable.adapter'
import {FlightsDTO} from '~/modules/checkout/dto/flight.dto'
import {InfotravelService} from '~/modules/infotravel/infotravel.service'

export function main(packageAvail) {
  const packageAvails = packageAvail.packageAvails[0]

  const packageAvailAdapter = new PackageAvailAdapter(new InfotravelService())

  const Fares = {}
  let points = 0

  for (const key in packageAvails) {
    if (Object.hasOwnProperty.call(packageAvails, key)) {
      const element = packageAvails[key]
      if (key === 'hotelAvails') {
        Fares[key] = maxhotelAvails(element)
        points += Fares[key].fares[0].point.amount
      }
      if (key === 'flightAvails') {
        const flightsDTO = PackageAvailAdapter.flightToFlightsDTO(element)
        Fares[key] = maxflightAvails(flightsDTO)
      }
    }
  }

  return points
}

function maxflightAvails(flightsDTO: FlightsDTO[]) {
  const maxDepart = flightsDTO
  return 0
}

export function sumFares(fares) {
  return fares.reduce((acc, val) => {
    acc += val[0].point.amount
    return acc
  }, 0)
}

export function maxhotelAvails(hotelAvails) {
  const x = hotelAvails.reduce((acc, val) => {
    const rooms = val.roomGroups[0].rooms
    acc = acc.concat(rooms)
    return acc
  }, [])
  return maxRoomsFare(x)
}

export function maxRoomsFare(rooms) {
  const maxRoom = rooms.reduce((acc, val) => {
    if (val.fares[0].point.amount > acc.fares[0].point.amount) {
      acc = val
    }
    return acc
  })
  return maxRoom
}
