import {Injectable} from '@nestjs/common'
import {PackageRepository} from '~/new/adapters/output/package/package.repository'
import {parseToCustomPackageList} from '~/new/adapters/output/package/parse'
import {InfotravelService} from '~/new/ports/output/externalSources/infotravel/infotravel.service'
import {ConfigService} from '@nestjs/config'

@Injectable()
export class PackageServiceCustomListUseCase {
  constructor(
    private readonly infotravelService: InfotravelService,
    private readonly configService: ConfigService,
  ) {}
  async handle() {
    const customIds = this.configService
      .get<string>('CUSTOM_PACKAGES_IDS')
      .split(',')
    const packageList = await Promise.all(
      customIds.map(async (id) => {
        return this.infotravelService.infoTravelSearchPackageById(parseInt(id))
      }),
    )

    return parseToCustomPackageList(packageList)
  }
}
