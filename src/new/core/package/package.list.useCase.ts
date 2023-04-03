import {Injectable} from '@nestjs/common'
import {
  IResponse,
  ResponseHttp,
} from '~/common/responseHttp/responseHttp.entity'
import {IinfoteraPackageById} from '~/modules/infotravel/infotravel.interfaces'
import {InfotravelService} from '~/modules/infotravel/infotravel.service'
import {IPackageWithRelations} from '~/modules/packages/interfaces/package.interface'
import {IPackagesOutPutList} from '~/modules/packages/interfaces/package.service.output'
import {PackageRepository} from '~/new/adapters/output/package/package.repository'
import {parseToIPackagesOutPutList} from '~/new/adapters/output/package/parse'

@Injectable()
export class PackageServiceListUseCase {
  constructor(
    private readonly packageRepository: PackageRepository,
    private readonly infotravelService: InfotravelService,
  ) {}

  async handler(
    experiences?: number[] | string | string[] | any,
    highlight?: boolean,
    limit?: string,
    Offset?: string,
    onlyAvailable?: boolean,
  ): Promise<IResponse> {
    const where = {} as {highlight?: boolean; experiences?: {ids: number[]}}
    if (experiences) where.experiences = this.getExperiencesIds(experiences)
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

    if (onlyAvailable) {
      return new ResponseHttp<IResponse>({
        statusCode: 200,
        entity: await this.getManyPackageAvail(
          packages as any,
          packageExternalData,
        ),
      })
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
  ): Promise<IPackagesOutPutList[]> {
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

  getExperiencesIds(experiences: any): {ids: number[]} {
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
}
