import {HttpService} from '@nestjs/axios'
import {
  BadGatewayException,
  CACHE_MANAGER,
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common'
import {ConfigService} from '@nestjs/config'
import axiosRetry from 'axios-retry'
import {Cache} from 'cache-manager'
import {IUser} from '~/new/ports/output/externalSources/smiles/smile.interface'
import {userCategory} from '../database/entity/userCategory.entity'
import {User, UserRegister} from './dto/user.dto'
import {
  IFlightAvails,
  IGetToken,
  IinfoteraPackageById,
  InfoTravelPackageAvailbility,
  InfoTravelPackageAvailbilitySearchParams,
  IResponseAuthInfotravel,
  Utility,
} from './infotravel.interfaces'
import {InfrotavelAvailbilityService} from './services/availbility/infrotravelAvailbility.service'
import {InfotravelBookingReservationOutputBodyDTO} from './services/engines/dto/infotravel.booking.reservation.dto'
import {
  InfotravelCheckratesInputBodyDTO,
  InfotravelCheckratesOutputBodyDTO,
} from './services/engines/dto/infotravel.checkrates.engine.dto'
import {InfotravelSearchServiceEngine} from './services/engines/infotravelSearch.service'
import {InfrotavelPackageService} from './services/package/infotravelPackage.service'

@Injectable()
export class InfotravelService {
  @Inject(ConfigService)
  private config: ConfigService

  @Inject(HttpService)
  private readonly http: HttpService

  @Inject(CACHE_MANAGER) private cacheManager: Cache
  async getInfotravel() {
    return {
      name: 'Infotravel',
    }
  }

  public readonly avail = new InfrotavelAvailbilityService(this)

  public readonly package = new InfrotavelPackageService(this)

  public readonly searchEngine = new InfotravelSearchServiceEngine(this)

  onModuleInit() {
    axiosRetry(this.http.axiosRef, {
      retries: 3,
      retryDelay: (retryCount) => {
        return retryCount * 1000
      },
      retryCondition: (error) => {
        return error.response.status === 503
      },
    })

    this.http.axiosRef.interceptors.request.use(async (config) => {
      config.headers = {
        ...(config.headers || {}),
        'Content-Type': 'application/json',
      }
      if (config.url !== '/authenticate') {
        const {accessToken, type} = await this._getToken()
        config.headers.Authorization = `${type} ${accessToken}`
      }

      return config
    })

    this.http.axiosRef.interceptors.response.use(
      async (response) => {
        if (response.status === 403) {
          throw new UnauthorizedException({
            origin: 'infotera',
            code: 401,
            status: 'Unauthorized',
            cause: response.data.message,
          })
        } else if (response.status >= 500) {
          throw new InternalServerErrorException({
            origin: 'infotera',
            code: 501,
            status: 'InternalServerError',
            cause: response.data?.message,
          })
        }
        return response
      },
      async (error) => {
        if (error?.code === 'ECONNABORTED') {
          throw new HttpException('server infotravel - request timeout', 500, {
            cause: error,
          })
        }
        throw new InternalServerErrorException(error?.message)
      },
    )
  }

  async validToken() {
    const {accessToken} = await this._getToken()
    Logger.log(accessToken, 'ACCESS_TOKEN')
    return {
      name: 'Infotravel Token Gerado',
    }
  }

  async get<T = any>(path: string, params = {}): Promise<T> {
    return this._get<T>(path, params)
  }

  async _get<T = any>(path: string, params = {}): Promise<T> {
    try {
      console.log(`[Fetching ${path}] with parameters `, params)
      const data = await this.http.axiosRef.get(path, {
        params,
        timeout: 30000,
      })
      return data.data
    } catch (err) {
      Logger.error(`[Fetching ${path}] Error: `, err)
      throw new BadGatewayException(err?.message)
    }
  }

  _getEnv() {
    return {
      url_base: this.config.get('INFOTRAVEL_URL'),
      username: this.config.get('INFOTRAVEL_USERNAME'),
      password: this.config.get('INFOTRAVEL_PASSWORD'),
      client: this.config.get('INFOTRAVEL_CLIENT'),
      agency: this.config.get('INFOTRAVEL_AGENCY'),
    }
  }

  async _getToken(): Promise<IGetToken> {
    try {
      if (this.config.get('TOKEN_INFOTERA')) {
        return {
          accessToken: this.config.get('TOKEN_INFOTERA'),
          type: 'Bearer',
          expire_seconds: 7199,
        }
      }

      // const dataToken = await this.cacheManager.get<string>('token-infotravel')

      // if (dataToken) {
      //   return JSON.parse(dataToken)
      // }

      const env = this._getEnv()

      console.log('[Fetching /authenticate] with params: ', {
        username: env.username,
        password: env.password,
        client: env.client,
        agency: env.agency,
      })

      const {data} = await this.http.axiosRef.post<
        any,
        {data: IResponseAuthInfotravel}
      >(`/authenticate`, {
        username: env.username,
        password: env.password,
        client: env.client,
        agency: env.agency,
      })

      // await this.cacheManager.set('token-infotravel', JSON.stringify(data), {
      //   ttl: data.expire_seconds - 60,
      // } as any)
      console.log('[Fetching /authenticate] - data: ', data)

      return data
    } catch (err) {
      console.log('[Fetching /authenticate] - err: ', err)
      if (err?.response?.data) {
        throw new UnauthorizedException(err.response.data)
      }
      if (err?.code === 'ECONNABORTED') {
        throw new HttpException('server infotravel - request timeout', 500, {
          cause: err,
        })
      }
      throw new InternalServerErrorException(err?.message)
    }
  }

  async infoTravelSearchPackageById(id): Promise<IinfoteraPackageById> {
    return await this._get(`${this._getEnv().url_base}/package/${id}`)
  }

  async infoTravelGetHotelByKeyDetail(
    keyDetail: string,
  ): Promise<Utility.IHotelDetail> {
    return await this._get(
      `${this._getEnv().url_base}/utility/hotelDetail/${keyDetail}`,
    )
  }

  async infoTravelFlightAvailbility(params: {
    start: any
    end: any
    origin: any
    destination: any
    occupancy: any
  }): Promise<{message: string; flightAvail: IFlightAvails[]}> {
    return await this._get(`/avail/flight/`, {
      start: params.start,
      end: params.end,
      origin: params.origin,
      destination: params.destination,
      occupancy: params.occupancy,
    })
  }

  async infoTravelSearchPackage(
    params: InfoTravelPackageAvailbilitySearchParams,
  ): Promise<InfoTravelPackageAvailbility | {message: 'No availability'}> {
    const {
      start,
      occupancy,
      destination,
      destinationType,
      origin,
      originIata,
      originType,
    } = params

    return await this._get(`/avail/package/${params.packageType}`, {
      origin,
      originIata,
      originType,
      start,
      occupancy,
      destination,
      destinationType,
    })
  }

  async checkRates(input: InfotravelCheckratesInputBodyDTO) {
    const result =
      await this.http.axiosRef.post<InfotravelCheckratesOutputBodyDTO>(
        `/checkRate`,
        input,
      )
    return result.data
  }

  async getUserByMemberCode(memberNumber): Promise<User> {
    return await this.get(`backoffice/client/${memberNumber}`)
  }

  async createUserInfotravel(user: IUser, category: userCategory) {
    const body: UserRegister = {
      user: {
        name: `${user.firstName} ${user.lastName}`,
        email: user.electronicAddressList[0].address,
        telephones: [{number: user.phoneList[0].number, type: 'CELL'}],
        externalCode: user.memberNumber,
        category: {
          id: category?.id,
        },
        birth: user.birthDay,
        documents: user.documentList,
        address: {
          address: user.addressList[0]?.streetName,
          number: user.addressList[0]?.streetNumber,
          zipcode: user.addressList[0]?.zipCode,
        },
      },
    }
    const result = await this.http.axiosRef.post<UserRegister>(
      '/user/register',
      body,
    )
    return result.data
  }

  async clientSearch(
    input: string,
  ): Promise<{externalCode: string; id: number}> {
    const result = await this.http.axiosRef.get(`/backoffice/client/${input}`)
    return result.data
  }

  async safelyClientSearch(
    input: string,
  ): Promise<{externalCode: string; id: number} | undefined> {
    try {
      const client = await this.clientSearch(input)
      return client
    } catch (err) {
      return undefined
    }
  }

  async bookingReservation(input) {
    const result =
      await this.http.axiosRef.post<InfotravelBookingReservationOutputBodyDTO>(
        '/booking',
        input,
      )
    return result.data
  }

  async getBookingDetail(id: string) {
    const result = await this.http.axiosRef.get(`/booking/${id}`)
    return result.data
  }
}
