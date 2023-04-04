import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common'
import {plainToClass} from 'class-transformer'
import {UserAuthentication} from '~/common/auth/models/UserAuthentication'
import {
  IResponse,
  ResponseHttp,
} from '~/common/responseHttp/responseHttp.entity'
import {PackageType} from '../infotravel/constants/constant'
import {InfotravelService} from '../infotravel/infotravel.service'
import {AvailbilityQueryDTO} from '../packages/dto/package.hotels.rooms.dto'
import {PackageAvailAdapter} from './adapters/packageAvailable.adapter'
import {AvailbilityDTO} from './dto/availbility.dto'
import {CheckoutOriginDTO} from './dto/checkout.origin.dto'
import {CheckRatesDTO} from './dto/checkrate.dto'
import {CheckRatesInputDto} from './dto/checkrate.input.dto'
import {FlightInputDTO} from './dto/flight.input.dto'
import {IAvailbaseOptions} from './dto/IAvailbaseOptions'
import {CheckoutInfotravelMapper} from './mappers/checkout.infotravel.mapper'

@Injectable()
export class CheckoutService {
  constructor(
    private readonly adapter: PackageAvailAdapter,
    private readonly infotravelService: InfotravelService,
    private readonly mapper: CheckoutInfotravelMapper,
  ) {}

  async getOrigins({
    query,
    packageType,
  }: {
    query?: string
    packageType?: PackageType
  }) {
    const {origins} = await this.infotravelService.searchEngine.getOrigin(
      query,
      packageType,
    )
    return new ResponseHttp<IResponse>({
      statusCode: HttpStatus.OK,
      entity: plainToClass(CheckoutOriginDTO, {origins}),
    })
  }

  async getPackageAvailbility(
    params: AvailbilityQueryDTO,
  ): Promise<ResponseHttp<IResponse>> {
    const packageInfrotavel =
      await this.infotravelService.package.getPackageById(params.id)
    if (!packageInfrotavel) {
      return new ResponseHttp<IResponse>({
        statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        message: `O pacote com id ${params.id} foi não encontrado`,
      })
    }

    const {id, type} = packageInfrotavel.destinations[0].destination

    const client = await this.infotravelService.safelyClientSearch(
      params.clientId,
    )

    if (!client?.id) {
      return new ResponseHttp<IResponse>({
        statusCode: HttpStatus.FORBIDDEN,
        message: 'Member Id not found',
      })
    }
    const packageAvailbilityResponse =
      await this.infotravelService.avail.getPackageAvailbility({
        ...params,
        destination: id,
        destinationType: type,
        clientId: client?.id.toString(),
      })

    if (
      (packageAvailbilityResponse &&
        packageAvailbilityResponse.message === 'No availability') ||
      packageAvailbilityResponse?.packageAvails?.length <= 0
    ) {
      return new ResponseHttp<IResponse>({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Sem disponibilidade de voos ou hoteis',
      })
    }

    const result = await this.adapter.packageAvailToCheckout(
      packageAvailbilityResponse.packageAvails[0],
    )

    return new ResponseHttp<IResponse>({
      statusCode: HttpStatus.OK,
      entity: result,
    })
  }

  async getFlightAvailbility(params: FlightInputDTO): Promise<IResponse> {
    const occupancy = `${params.adults}-${
      params.childs ? params.childs.toString() : '0'
    }`
    const infoTravelFlights =
      await this.infotravelService.infoTravelFlightAvailbility({
        start: params.startDate,
        end: params.endDate,
        origin: params.origin,
        destination: params.destination,
        occupancy,
      })

    const flightDTO = PackageAvailAdapter.flightToFlightsDTO(
      infoTravelFlights.flightAvail,
    )

    return new ResponseHttp<IResponse>({
      statusCode: HttpStatus.OK,
      entity: flightDTO,
    })
  }

  async checkRates(
    input: CheckRatesInputDto,
    user: UserAuthentication,
  ): Promise<CheckRatesDTO> {
    const infoteraClientId = await this.infotravelService.clientSearch(
      user.memberNumber,
    )
    const response = await this.infotravelService.checkRates(
      this.mapper.mapCheckRatesInputToInfotravel(input, infoteraClientId.id),
    )

    return this.mapper.mapInfotravelCheckrateToEntity(input, response)
  }

  async availability(options: {
    startDate: string
    endDate: string
    occupancy: string
    origin: number
    originIata?: string
    originType?: string
    destination: number
    fields?: string
  }): Promise<any | AvailbilityDTO> {
    const availabilityFunctions = this.filterFields(options, options.fields)

    const results = await Promise.all(availabilityFunctions)

    return results.reduce((a, v) => {
      return Object.assign(a, v)
    })
  }

  filterFields(options, fields: string) {
    const arr = fields.split(',')

    const fieldsList = this.getfieldList()

    return arr.reduce((acc, val: string) => {
      if (fieldsList.hasOwnProperty(val)) {
        acc.push(fieldsList[val](options))
      }
      return acc
    }, [])
  }

  private getfieldList() {
    return {
      hotel: this.availbilityHotel.bind(this),
      activity: this.availbilityActivity.bind(this),
      services: this.availbilityServices.bind(this),
      tickets: this.availbilityTickets.bind(this),
      transfers: this.AvailbilityTransfers.bind(this),
      serviceOthers: this.availbilityServiceOthers.bind(this),
      flights: this.availbilityFligts.bind(this),
    }
  }

  async AvailbilityTransfers(options) {
    return {
      transfers: await this.infotravelService.avail.AvailbilityTransfers({
        start: options.startDate,
        end: options.endDate,
        occupancy: options.occupancy,
        destination: options.destination,
        origin: options.origin,
        type: 'ROUND_TRIP',
      }),
    }
  }

  async availbilityServiceOthers(options: IAvailbaseOptions) {
    return {
      serviceOther: await this.infotravelService.avail.availbilityServiceOthers(
        {
          start: options.startDate,
          end: options.endDate,
          occupancy: options.occupancy,
          destination: options.destination,
        },
      ),
    }
  }

  async availbilityFligts(options: IAvailbaseOptions) {
    return {
      flights: PackageAvailAdapter.flightToFlightsDTO(
        (
          await this.infotravelService.avail.availbilityFlights({
            start: options.startDate,
            end: options.endDate,
            origin: 'GRU', //options.origin, // GRU
            occupancy: options.occupancy,
            destination: 'SDU', // options.destination, // SDU
          })
        ).flightAvail,
      ),
    }
  }

  async availbilityTickets(options: IAvailbaseOptions) {
    return {
      tickets: await this.infotravelService.avail.availbilityTickets({
        start: options.startDate,
        end: options.endDate,
        occupancy: options.occupancy,
        destination: options.destination,
      }),
    }
  }

  async availbilityServices(options: IAvailbaseOptions) {
    return {
      services: await this.infotravelService.avail.availbilityService({
        start: options.startDate,
        end: options.endDate,
        occupancy: options.occupancy,
        destination: options.destination,
      }),
    }
  }

  async availbilityActivity(options: IAvailbaseOptions) {
    return {
      tours: this.adapter.toursAvailsToTours(
        (
          await this.infotravelService.avail.availbilityActivity({
            start: options.startDate,
            end: options.endDate,
            occupancy: options.occupancy,
            destination: options.destination,
          })
        ).tourAvail,
      ),
    }
  }

  async availbilityHotel(options: IAvailbaseOptions) {
    return {
      hotel: await this.adapter.hotelAvailToHotelDTO(
        (
          await this.infotravelService.avail.AvailbilityHotel({
            start: options.startDate,
            end: options.endDate,
            occupancy: options.occupancy,
            destination: options.destination,
          })
        ).hotelAvail,
      ),
    }
  }
}
