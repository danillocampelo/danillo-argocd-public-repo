import { Flight, FlightKeyPairs, FlightType } from '@models/Flight'
import {
  calculateTotalFares,
  calculateTotalFees,
} from '@utils/calculateTotalPrice'
import { FlightDto } from '../dtos/FlightDto'

export const mapFlight = (
  dto: FlightDto,
  type: FlightType,
  scales?: FlightDto[],
  keyPairs?: FlightKeyPairs,
): Flight => ({
  id: dto.number,
  keyPairs,
  airline: { id: dto.airline.code, ...dto.airline },
  departureDate: new Date(dto.departure),
  arrivalDate: new Date(dto.arrival),
  duration: dto.duration,
  number: dto.number,
  fares: dto.fares,
  recommended: dto.recommended,
  route: {
    from: {
      iata: {
        name: dto.origin.location.iata,
      },
      city: {
        name: dto.origin.location.city,
      },
      state: {
        name: '',
        uf: '',
      },
    },
    to: {
      iata: {
        name: dto.destination.location.iata,
      },
      city: {
        name: dto.destination.location.city,
      },
      state: {
        name: '',
        uf: '',
      },
    },
  },
  price: {
    amount: calculateTotalFares(dto.fares),
    currency: dto.fares[0].price.currency || 'BRL',
  },
  fees: {
    amount: calculateTotalFees(dto.fares),
    currency: dto.fares[0].price.currency || 'BRL',
  },
  type,
  scales: scales?.map((scale) => mapFlight(scale, type)),
})

type FlightWithScales = {
  flight: FlightDto
  scales: FlightDto[]
}

function findUniqueFlights(flights: FlightWithScales[]) {
  const flightNumbers: Set<string> = new Set()
  const uniqueFlights: FlightWithScales[] = []

  flights.forEach(({ flight, scales }) => {
    if (!flightNumbers.has(flight.number)) {
      flightNumbers.add(flight.number)
      uniqueFlights.push({ flight, scales })
    }
  })

  return uniqueFlights
}

export const mapFlights = (
  flightArrayPairs: { depart: FlightDto[]; return: FlightDto[] }[],
  type: FlightType,
) => {
  let flightsOfType: FlightWithScales[] = []

  if (type === FlightType.DEPART) {
    flightsOfType = flightArrayPairs.map((flightPair) => {
      const [flight, ...scales] = flightPair.depart
      return {
        flight,
        scales,
      }
    })
  } else {
    flightsOfType = flightArrayPairs.map((flightPair) => {
      const [flight, ...scales] = flightPair.return
      return {
        flight,
        scales,
      }
    })
  }

  const uniqueFlightsWithScales = findUniqueFlights(flightsOfType)

  return uniqueFlightsWithScales.map(({ flight, scales }) => {
    const keyPair = calculateFlightPairs(flight.number, type, flightArrayPairs)

    return mapFlight(flight, type, scales, keyPair)
  })
}

export const calculateFlightPairs = (
  number: string,
  type: FlightType,
  flightPairs: { depart: FlightDto[]; return: FlightDto[] }[],
) => {
  if (type === FlightType.RETURN) return undefined

  const pairs: FlightKeyPairs = {}

  flightPairs
    .filter((flightPair) => flightPair.depart[0].number === number)
    .forEach((flightPair) => {
      pairs[flightPair.return[0].number] = {
        departKey: flightPair.depart[0].key,
        returnKey: flightPair.return[0].key,
      }
    })

  return pairs
}
