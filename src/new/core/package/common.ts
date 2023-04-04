import {ConfigService} from '@nestjs/config'
import dayjs from 'dayjs'
import {PackageAvailAdapter} from '~/modules/checkout/adapters/packageAvailable.adapter'
import {FlightsDTO} from '~/modules/checkout/dto/flight.dto'
import {
  IinfoteraPackageById,
  IinsuranceAvails,
  InfoTravelPackageAvailbility,
  IserviceOtherAvails,
  IServicePackageAvail,
  ITicketAvails,
  ITourAvails,
  ItransferAvails,
} from '~/modules/infotravel/infotravel.interfaces'
import {AvailbilityQueryDTO} from '~/modules/packages/dto/package.hotels.rooms.dto'
import {Fare} from '../../../modules/checkout/dto/fare.dto'
const config = new ConfigService()

export function sumAvailPoints(
  packageAvail: InfoTravelPackageAvailbility,
): number {
  const packageAvails = packageAvail.packageAvails[0]

  const Fares = {
    hotelAvails: maxhotelAvails(packageAvails.hotelAvails),
    flightAvails: maxFlights(
      PackageAvailAdapter.flightToFlightsDTO(packageAvails.flightAvails),
    ),
    ticketAvails: maxTicketAvail(packageAvails.ticketAvails),
    servicePackageAvails: maxservicePackageAvails(
      packageAvails.servicePackageAvails,
    ),
    tourAvails: maxTourAvails(packageAvails.tourAvails),
    insuranceAvails: maxInsuranceAvails(packageAvails.insuranceAvails),
    transferAvails: maxTransferAvails(packageAvails.transferAvails),
    serviceOtherAvails: maxServiceOtherAvails(packageAvails.serviceOtherAvails),
  }

  const points = sumFaresPoints([
    ...Fares.hotelAvails.fares,
    ...Fares.servicePackageAvails.fares,
    ...Fares.tourAvails.fares,
    ...(Fares.insuranceAvails.fares as Fare[]),
    ...(Fares.transferAvails.fares as Fare[]),
    ...(Fares.serviceOtherAvails.fares as Fare[]),
    ...Fares.ticketAvails.fares,
    ...Fares.flightAvails.depart[0].fares,
    ...Fares.flightAvails.return[0].fares,
  ])

  return points
}

function sumFaresPoints(fares: Fare[]) {
  return fares.reduce((acc, fare) => {
    return acc + (fare.point?.amount || 0)
  }, 0)
}

function maxServiceOtherAvails(serviceOtherAvails: IserviceOtherAvails[]) {
  return serviceOtherAvails
    ? serviceOtherAvails[0]
    : {fares: [{point: {amount: 0}}]}
}

function maxTransferAvails(TransferAvails: ItransferAvails[]) {
  return TransferAvails ? TransferAvails[0] : {fares: [{point: {amount: 0}}]}
}

function maxInsuranceAvails(InsuranceAvails: IinsuranceAvails[]) {
  return InsuranceAvails ? InsuranceAvails[0] : {fares: [{point: {amount: 0}}]}
}

function maxTourAvails(TourAvails?: ITourAvails[]) {
  return TourAvails ? TourAvails[0] : {fares: [{point: {amount: 0}}]}
}

function maxservicePackageAvails(
  servicePackageAvails?: IServicePackageAvail[],
) {
  return servicePackageAvails
    ? servicePackageAvails[0]
    : {fares: [{point: {amount: 0}}]}
}

function maxTicketAvail(tickets?: ITicketAvails[]) {
  return tickets
    ? tickets.reduce((acc, val) => {
        if (val.fares[0].point.amount > acc.fares[0].point.amount) {
          acc = val
        }

        return acc
      })
    : {fares: [{point: {amount: 0}}]}
}

function maxFlights(flights: FlightsDTO[]): FlightsDTO {
  return flights.reduce((acc, val) => {
    const accFares = acc.depart[0].fares[0]
    const valFares = val.depart[0].fares[0]
    if (
      accFares.point &&
      accFares.point.amount + accFares.point.amount >
        valFares.point.amount + valFares.point.amount
    ) {
      acc = val
    }
    return acc
  })
}

function maxhotelAvails(hotelAvails) {
  const allHotelsRooms = hotelAvails.reduce((acc, val) => {
    const rooms = val.roomGroups[0].rooms
    acc = acc.concat(rooms)
    return acc
  }, [])
  return maxRoomsFare(allHotelsRooms)
}

function maxRoomsFare(rooms) {
  const maxRoom = rooms.reduce((acc, val) => {
    const accFares = acc.fares[0]
    const valFares = val.fares[0]
    if (valFares.point && valFares.point.amount > accFares.point.amount) {
      acc = val
    }
    return acc
  })
  return maxRoom
}

export function mountPackageAvailParams(
  infotravel: IinfoteraPackageById,
  user: string,
): AvailbilityQueryDTO {
  return {
    origin: config.get('INFOTERA_PACKAGE_DEFAULT_ORIGIN') || 8253,
    originIata: config.get('INFOTERA_PACKAGE_DEFAULT_ORIGIN_IATA') || 'GRU',
    originType: config.get('INFOTERA_PACKAGE_DEFAULT_ORIGIN_TYPE') || 'A',
    startDate:
      config.get('INFOTERA_PACKAGE_DEFAULT_START_DATE') || '2023-04-01',
    occupancy: config.get('INFOTERA_PACKAGE_DEFAULT_OCCUPANCY') || 2,
    destination: infotravel.destinations[0].destination.id,
    destinationType: infotravel.destinations[0].destination.type,
    id: infotravel.id,
    clientId: user ?? config.get('USER_INFOTRAVEL_DEFAULT'),
  }
}
