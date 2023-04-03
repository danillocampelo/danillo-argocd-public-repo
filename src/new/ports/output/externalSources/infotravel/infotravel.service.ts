import {HttpService} from '@nestjs/axios'
import {
  CACHE_MANAGER,
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common'
import {ConfigService} from '@nestjs/config'
import {
  IGetToken,
  IinfoteraPackageById,
  IResponseAuthInfotravel,
} from '~/modules/infotravel/infotravel.interfaces'
import {InfotravelDataSource} from './infotravel.datasource'
import {InfotravelUserDTO} from '~/new/ports/driven/externalSources/infotravel/dto/InfotravelUserDTO'

@Injectable()
export class InfotravelService implements InfotravelDataSource {
  @Inject(ConfigService)
  private config: ConfigService

  @Inject(HttpService)
  private readonly http: HttpService

  onModuleInit() {
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
            cause: response,
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
        throw new InternalServerErrorException(error)
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
    const data = await this.http.axiosRef.get(path, {
      params,
    })
    return data.data
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

      return data
    } catch (err) {
      if (err?.response?.data) {
        throw new UnauthorizedException(err.response.data)
      }
      if (err?.code === 'ECONNABORTED') {
        throw new HttpException('server infotravel - request timeout', 500, {
          cause: err,
        })
      }
      throw new InternalServerErrorException(err)
    }
  }

  async getUserByMemberCode(user: any): Promise<InfotravelUserDTO> {
    return this.get(`backoffice/client/${user.memberCode}`)
  }

  async createUserInfotravel(user: any) {
    const result = await this.http.axiosRef.post('/backoffice/register', user)
    return result.data
  }

  async infoTravelSearchPackageById(id): Promise<IinfoteraPackageById> {
    return await this._get(`${this._getEnv().url_base}/package/${id}`)
  }
}
