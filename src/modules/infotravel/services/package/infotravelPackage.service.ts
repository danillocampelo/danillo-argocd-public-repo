import {forwardRef, Inject, Injectable} from '@nestjs/common'
import {
  IinfoteraPackageById,
  InfoTravelPackageAvailbility,
  InfoTravelPackageAvailbilitySearchParams,
} from '../../infotravel.interfaces'
import {InfotravelService} from '../../infotravel.service'

@Injectable()
export class InfrotavelPackageService {
  private readonly basePath = '/package'
  constructor(
    @Inject(forwardRef(() => InfotravelService))
    private readonly infotravelService: InfotravelService,
  ) {}

  async getPackageById(id: string): Promise<IinfoteraPackageById> {
    return await this.infotravelService.get(`${this.basePath}/${id}`)
  }

  async getPackage(
    params: InfoTravelPackageAvailbilitySearchParams,
  ): Promise<InfoTravelPackageAvailbility | {message: 'No availability'}> {
    return await this.infotravelService.get(
      `/avail/package/${params.packageType}`,
      {
        ...params,
      },
    )
  }
}
