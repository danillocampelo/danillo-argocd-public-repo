import {Injectable} from '@nestjs/common'
import {
  IResponse,
  ResponseHttp,
} from '~/common/responseHttp/responseHttp.entity'
import {InfotravelService} from '~/modules/infotravel/infotravel.service'
import {IPackageWithRelations} from '~/modules/packages/interfaces/package.interface'
import {PackageRepository} from '~/new/adapters/output/package/package.repository'
import { parseToIPackagesOutPutByIdDetails } from '~/new/adapters/output/package/parse'

@Injectable()
export class PackageServiceGetByIdUseCase {
  constructor(
    private readonly packageRepository: PackageRepository,
    private readonly infotravelService: InfotravelService,
  ) {}

  async handler(options: {id: string}): Promise<IResponse> {
    const packageWithRelations = await this.getPackageWithRelationsByExternalId(
      options.id,
    )

    if (!packageWithRelations) {
      return new ResponseHttp<IResponse>({
        statusCode: 404,
        entity: {
          origin: 'internal',
          code: 404,
          status: 'Not found',
        },
      })
    }

    const infotravel = await this.infotravelService.infoTravelSearchPackageById(
      packageWithRelations.externalId || options.id,
    )

    if (!infotravel) {
      return new ResponseHttp<IResponse>({
        statusCode: 404,
        entity: {
          origin: 'smile',
          code: 404,
          status: 'Not found',
        },
      })
    }
    //TO DO REMOVER [0] PARA O CASO DE MAIS DE UM HOTEL
    const hotelKeyDetails = infotravel?.destinations?.[0]?.packageHotels.map(hotel => hotel.keyDetail)
    const hotels = await Promise.all(hotelKeyDetails.map(
      async (keyDetail) => this.infotravelService.infoTravelGetHotelByKeyDetail(keyDetail)
      ))
    return new ResponseHttp<IResponse>({
      statusCode: 200,
      entity: parseToIPackagesOutPutByIdDetails(
        infotravel,
        packageWithRelations || ({} as any),
        hotels,
      ),
    })
  }

  async getPackageWithRelationsByExternalId(
    externalId: string,
  ): Promise<IPackageWithRelations> {
    return this.packageRepository.packageFullInfoByExternalId({externalId})
  }
}
