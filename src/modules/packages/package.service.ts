import {Injectable} from '@nestjs/common'
import {
  IResponse,
  ResponseHttp,
} from '~/common/responseHttp/responseHttp.entity'
import {InfotravelService} from '~/modules/infotravel/infotravel.service'
import {
  parseToIPackagesOutPutByIdDetails,
  parseToIPackagesOutPutList,
  parseToListWithoutExternalData,
  parseToPakcageWithouExternalData,
} from '../../common/parsers/packageParses'
import {IinfoteraPackageById} from '../infotravel/infotravel.interfaces'
import {IGetPackageByIdinput} from './dto/package.service.input.dto'
import {IPackageWithRelations} from './interfaces/package.interface'
import {PackageRepository} from './package.repository'

@Injectable()
export class PackageService {
  constructor(
    private readonly packageRepository: PackageRepository,
    private readonly infotravelService: InfotravelService,
  ) {}

  // //--- Mocks
  // getPackageByIdMock(params: IGetPackageByIdinput): IPackageOutput[] {
  //   Logger.debug('Package params:', params)
  //   const mock = packageMock
  //   return mock.filter((obj) => {
  //     return obj.id === params.id
  //   })
  // }

  async create(payload): Promise<IResponse> {
    return new ResponseHttp<IResponse>({
      statusCode: 200,
      entity: await this.packageRepository.createPackage(payload),
    })
  }

  async updatePackage(id, data): Promise<IResponse> {
    return new ResponseHttp<IResponse>({
      statusCode: 200,
      entity: await this.packageRepository.updatePackage(id, data),
    })
  }

  async deletePackage(id: number): Promise<IResponse> {
    return new ResponseHttp<IResponse>({
      statusCode: 200,
      entity: await this.packageRepository.deletePackage(id),
    })
  }

  async getPackageById(params: IGetPackageByIdinput): Promise<IResponse> {
    return new ResponseHttp<IResponse>({
      statusCode: 200,
      entity: this.packageRepository.package({id: Number(params.id)}),
    })
  }

  async getPackageWithRelationsById(
    params: IGetPackageByIdinput,
  ): Promise<any> {
    return this.packageRepository.packageFullInfoById({id: Number(params.id)})
  }

  async getPackageWithRelationsByExternalId(
    externalId: string,
  ): Promise<IPackageWithRelations> {
    return this.packageRepository.packageFullInfoByExternalId({externalId})
  }

  async packages(
    experiences?: number[] | string | string[] | any,
    highlight?: boolean,
    limit?: string,
    Offset?: string,
    onlyAvailable?: boolean,
  ): Promise<IResponse> {
    const where = {} as {highlight?: boolean; experiences?: {ids: number[]}}
    if (experiences) where.experiences = getExperiencesIds(experiences)
    if (highlight) where.highlight = highlight

    const packages = await this.packageRepository.packages({
      take: Number(limit) || 100,
      skip: Number(Offset) || 0,
      where,
    })

    const packageExternalData = await Promise.allSettled(
      packages.map((p) =>
        this.infotravelService.infoTravelSearchPackageById(p.externalId),
      ),
    )

    const filteredPackageExternalData = packageExternalData
      .map(
        (item) => (item as PromiseFulfilledResult<IinfoteraPackageById>)?.value,
      )
      .filter((externalPackage) => !!externalPackage)

    if (packageExternalData?.length && onlyAvailable) {
      return new ResponseHttp<IResponse>({
        statusCode: 200,
        entity: await this.getManyPackageAvail(packages, packageExternalData),
      })
    }

    if (!filteredPackageExternalData?.length) {
      return parseToListWithoutExternalData(packages)
    }

    return parseToIPackagesOutPutList(
      packages as any,
      packageExternalData.map(
        (item) => (item as PromiseFulfilledResult<IinfoteraPackageById>)?.value,
      ),
    )
  }

  async getManyPackageAvail(
    packages: IPackageWithRelations[],
    packageExternalData: PromiseSettledResult<IinfoteraPackageById>[],
  ): Promise<any> {
    const packageAvails = await Promise.allSettled(
      packageExternalData.reduce((acc, val) => {
        if (val.status == 'fulfilled' && val.value.hasOwnProperty('id')) {
          const re = new Promise(async (resolve, reject) => {
            resolve({
              ...(await this.getPackageAvails(val.value)),
              id: val.value.id,
            })
          })
          acc.push(re)
        }
        return acc
      }, [] as any),
    )

    const availablePackages = packages.filter(
      (pck) =>
        !!packageAvails.find((item: any) => item.value?.id === pck.externalId),
    )

    return parseToIPackagesOutPutList(availablePackages, packageAvails as any)
  }

  async smileGetById(options: {id: string}): Promise<IResponse> {
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

    const infotravel = await this.infotravelService
      .infoTravelSearchPackageById(
        packageWithRelations.externalId || options.id,
      )
      .catch((error) =>
        console.log(
          'Error: Request to infotera could not be fullfied ',
          error?.message,
        ),
      )

    if (!infotravel) {
      return new ResponseHttp<IResponse>({
        statusCode: 200,
        entity: parseToPakcageWithouExternalData(packageWithRelations),
      })
    }

    const hotelKeyDetails = infotravel?.destinations[0].packageHotels.map(
      (hotel) => hotel.keyDetail,
    )
    const hotels = await Promise.all(
      hotelKeyDetails.map(async (keyDetail) =>
        this.infotravelService.infoTravelGetHotelByKeyDetail(keyDetail),
      ),
    )

    return new ResponseHttp<IResponse>({
      statusCode: 200,
      entity: parseToIPackagesOutPutByIdDetails(
        infotravel,
        packageWithRelations || ({} as any),
        hotels,
      ),
    })
  }

  private getPackageAvails(infotravel: IinfoteraPackageById) {
    return this.infotravelService.infoTravelSearchPackage({
      origin: 8253,
      originIata: 'GRU',
      originType: 'A',
      start: new Date('2023-02-08').toJSON(),
      occupancy: 2,
      destination: infotravel.destinations[0].destination.id,
      destinationType: infotravel.destinations[0].destination.type,
      packageType: 'hotel_flight',
    })
  }
}
function getExperiencesIds(experiences: any): {ids: number[]} {
  return {
    ids: Array.isArray(experiences)
      ? experiences.reduce((e, v) => {
          if (v.length === 1) {
            e.push(Number(v))
            return e
          } else {
            e = e.concat(v.split(',').map(Number))
            return e
          }
        }, [])
      : experiences.split(',').map(Number),
  }
}
