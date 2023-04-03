import {HttpService} from '@nestjs/axios'
import {Inject} from '@nestjs/common'
import {ConfigService} from '@nestjs/config'
import {IUser} from './smile.interface'

export class SmilesService {
  @Inject(HttpService)
  private readonly http: HttpService

  @Inject(ConfigService)
  private readonly configService: ConfigService

  async getUserInfos(token: string): Promise<IUser> {
    const result = await this.http.axiosRef.get(
      `${this.getBaseUrl()}/members`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    return result.data?.data.member
  }

  private getBaseUrl() {
    return `${this.configService.get('SMILES_URL')}`
  }
}
