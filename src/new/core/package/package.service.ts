import {Injectable} from '@nestjs/common'
import {InfotravelService} from '../../../modules/infotravel/infotravel.service'
import {sumHotelFares} from './models/fares/sumHotelFares'
import {ConfigService} from '@nestjs/config'
import {sumFlightFares} from './models/fares/sumFlightFares'
import {sortTotalFares} from './models/fares/sortTotalFares'
import {TotalFares} from './models/fares/totalFares'
import {sumFares} from './models/fares/sumFares'
import {
  Fare,
  PackageAvailResponse,
} from '../../../modules/infotravel/services/availbility/entities/packageAvailbility.entity'
import {sumTotalFares} from './models/fares/sumTotalFares'
import {Currency} from '../../ports/input/api/payment/dto/start.payment.dto'

@Injectable()
export class PackageService {
  constructor(
    private readonly infotravelService: InfotravelService,
    private readonly configService: ConfigService,
  ) {}

  public async getDefaultFares({id, clientId}) {
    const packageData = await this.infotravelService.package.getPackageById(id)

    const packageAvailabilityParams =
      this.infotravelService.avail.createPackageDefaultAvailabilityParams({
        destinationId: packageData.destinations?.[0]?.destination?.id,
        destionationType: packageData.destinations?.[0]?.destination?.type,
        clientId,
        packageId: id,
        configService: this.configService,
      })

    const packageAvailability =
      await this.infotravelService.avail.getPackageAvailbility(
        packageAvailabilityParams,
      )

    const allAvailabilityFares =
      this.sumAllAvailabilityFares(packageAvailability)

    const cheapestFares = this.generateCheapestFares(
      allAvailabilityFares as any,
    )

    const greatestMiles = this.generateMostExpensiveMiles(
      allAvailabilityFares as any,
    )

    return {
      total: {
        totalPrice: {
          amount: sumTotalFares(Object.values(cheapestFares)).totalPrice,
          currency: Currency.BRL,
        },
        totalMiles: sumTotalFares(Object.values(greatestMiles)).totalMiles,
      },
      packageAvailabilityParams,
      detailed: {
        cheapestFares,
        greatestMiles,
      },
    }
  }

  private sumAllAvailabilityFares({packageAvails = []}: PackageAvailResponse) {
    let [
      hotelFares,
      flightFares,
      servicePackageFares,
      transferFares,
      insuranceFares,
      ticketFares,
      tourFares,
      serviceOtherFares,
    ] = [[], [], [], [], [], [], [], []]

    for (const packageAvailability of packageAvails) {
      hotelFares = hotelFares.concat(
        packageAvailability.hotelAvails?.map(sumHotelFares) || [],
      )
      flightFares = flightFares.concat(
        packageAvailability.flightAvails?.map(sumFlightFares) || [],
      )

      servicePackageFares = this.concatFaresAndTotalFares(
        packageAvailability.servicePackageAvails,
        servicePackageFares,
      )
      transferFares = this.concatFaresAndTotalFares(
        packageAvailability.transferAvails,
        transferFares,
      )
      insuranceFares = this.concatFaresAndTotalFares(
        packageAvailability.insuranceAvails,
        insuranceFares,
      )
      ticketFares = this.concatFaresAndTotalFares(
        packageAvailability.ticketAvails,
        ticketFares,
      )
      tourFares = this.concatFaresAndTotalFares(
        packageAvailability.tourAvails,
        tourFares,
      )
      serviceOtherFares = this.concatFaresAndTotalFares(
        packageAvailability.serviceOtherAvails,
        serviceOtherFares,
      )
    }
    hotelFares = hotelFares.sort(
      (a, b) => a.roomsFares[0]?.totalPrice - b.roomsFares[0]?.totalPrice,
    )

    const departureFares = flightFares.sort(
      (a, b) =>
        a.departureFares[0]?.totalPrice - b.departureFares[0]?.totalPrice,
    )

    const returnFares = flightFares.sort(
      (a, b) => a.returnFares[0]?.totalPrice - b.returnFares[0]?.totalPrice,
    )

    return [
      hotelFares,
      departureFares,
      returnFares,
      servicePackageFares,
      transferFares,
      insuranceFares,
      ticketFares,
      tourFares,
      serviceOtherFares,
    ]
  }

  private generateCheapestFares([
    hotelFares,
    departureFlightsFares,
    returnFlightFares,
    servicePackageFares,
    transferFares,
    insuranceFares,
    ticketFares,
    tourFares,
    serviceOtherFares,
  ]) {
    const hotelCheapestFare = hotelFares?.[0]?.roomsFares?.[0]
    const departureFlightCheapestFare =
      departureFlightsFares?.[0]?.departureFares?.[0]
    const returnFlightCheapestFare = returnFlightFares?.[0]?.returnFares?.[0]
    const servicePackageCheapestFare = this.getCheapestFare(servicePackageFares)
    const transferCheapestFare = this.getCheapestFare(transferFares)
    const insuranceCheapestFare = this.getCheapestFare(insuranceFares)
    const ticketCheapestFare = this.getCheapestFare(ticketFares)
    const tourCheapestFare = this.getCheapestFare(tourFares)
    const serviceOtherCheapestFare = this.getCheapestFare(serviceOtherFares)

    return {
      hotelCheapestFare,
      departureFlightCheapestFare,
      returnFlightCheapestFare,
      servicePackageCheapestFare,
      transferCheapestFare,
      insuranceCheapestFare,
      ticketCheapestFare,
      tourCheapestFare,
      serviceOtherCheapestFare,
    }
  }

  private generateMostExpensiveMiles([
    hotelFares,
    departureFlightsFares,
    returnFlightFares,
    servicePackageFares,
    transferFares,
    insuranceFares,
    ticketFares,
    tourFares,
    serviceOtherFares,
  ]) {
    const mostExpensiveRoomFare =
      hotelFares?.[hotelFares.length - 1]?.roomsFares || []
    const hotelFare =
      mostExpensiveRoomFare[mostExpensiveRoomFare.length - 1] || []

    const mostExpensiveDepartureFares =
      departureFlightsFares[departureFlightsFares.length - 1]?.departureFares ||
      []
    const departureFlightFare =
      mostExpensiveDepartureFares[mostExpensiveDepartureFares.length - 1] || []

    const mostExpensiveReturnFares =
      returnFlightFares[returnFlightFares.length - 1]?.returnFares || []
    const returnFlightFare =
      mostExpensiveReturnFares[mostExpensiveReturnFares.length - 1] || []

    const servicePackageFare = this.getMostExpensiveMiles(servicePackageFares)
    const transferFare = this.getMostExpensiveMiles(transferFares)
    const insuranceFare = this.getMostExpensiveMiles(insuranceFares)
    const ticketFare = this.getMostExpensiveMiles(ticketFares)
    const tourFare = this.getMostExpensiveMiles(tourFares)
    const serviceOtherFare = this.getMostExpensiveMiles(serviceOtherFares)

    return {
      hotelFare,
      departureFlightFare,
      returnFlightFare,
      servicePackageFare,
      transferFare,
      insuranceFare,
      ticketFare,
      tourFare,
      serviceOtherFare,
    }
  }

  private concatFaresAndTotalFares(
    sourceFares: {fares: Fare[]}[],
    targetFares: TotalFares[],
  ) {
    return sortTotalFares(
      targetFares.concat(
        sourceFares?.map((item) => sumFares(item.fares)) || [],
      ),
    )
  }

  private getCheapestFare(totalFares: TotalFares[]): TotalFares | undefined {
    return totalFares.sort((a, b) => a?.totalPrice - b?.totalPrice)?.[0]
  }

  private getMostExpensiveMiles(
    totalFares: TotalFares[],
  ): TotalFares | undefined {
    return totalFares.sort((a, b) => b?.totalMiles - a?.totalMiles)?.[0]
  }
}
