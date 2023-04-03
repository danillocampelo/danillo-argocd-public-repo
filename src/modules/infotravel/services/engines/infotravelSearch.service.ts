import {forwardRef, Inject, Injectable} from '@nestjs/common'
import {PackageType} from '../../constants/constant'
import {InfotravelService} from '../../infotravel.service'
import {InfotravelSearchEngineDTO} from './dto/infotravel.search.engine.dto'

@Injectable()
export class InfotravelSearchServiceEngine {
  // @Inject(InfotravelService)
  // private readonly infotravelService: InfotravelService
  private readonly basePath = '/searchEngine'
  constructor(
    @Inject(forwardRef(() => InfotravelService))
    private readonly infotravelService: InfotravelService,
  ) {}

  async getOrigin(
    query: string,
    packageType: PackageType = PackageType.HOTEL_FLIGHT,
  ): Promise<InfotravelSearchEngineDTO> {
    return this.infotravelService.get<InfotravelSearchEngineDTO>(
      `${this.basePath}/package/${packageType}/origin?name=${query}`,
    )
  }
}
