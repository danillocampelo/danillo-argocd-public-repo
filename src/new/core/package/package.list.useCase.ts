import {Injectable} from '@nestjs/common'
import {
  IResponse,
  ResponseHttp,
} from '~/common/responseHttp/responseHttp.entity'
import {
  IinfoteraPackageById,
  InfoTravelPackageAvailbility,
} from '~/modules/infotravel/infotravel.interfaces'
import {InfotravelService} from '~/modules/infotravel/infotravel.service'
import {IPackageWithRelations} from '~/modules/packages/interfaces/package.interface'
import {IPackagesOutPutList} from '~/modules/packages/interfaces/package.service.output'
import {PackageRepository} from '~/new/adapters/output/package/package.repository'
import {
  parseToIPackagesAvailOutPutList,
  parseToIPackagesOutPutList,
} from '~/new/adapters/output/package/parse'
import {mountPackageAvailParams} from './common'

@Injectable()
export class PackageServiceListUseCase {
  constructor(
    private readonly packageRepository: PackageRepository,
    private readonly infotravelService: InfotravelService,
  ) {}

  async handler(
    user: string,
    experiences?: number[] | string | string[] | any,
    highlight?: boolean,
    limit?: string,
    Offset?: string,
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

    // return new ResponseHttp<IResponse>({
    //   statusCode: 200,
    //   entity: await this.getManyPackageAvail(
    //     packages as any,
    //     packageExternalData,
    //     user,
    //   ),
    // })

    //TODO: ajustar para considerar a chamada ao package availability
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
    user: string,
  ): Promise<IPackagesOutPutList[]> {
    const infoteraAvailsPackages = await this.makePackageAvails(
      packageExternalData,
      user,
    )

    const availablePackages = packages.filter((pck) => {
      {
        return infoteraAvailsPackages.find(
          (item: any) =>
            item.value.packageAvails && item.value?.id == pck.externalId,
        )
      }
    })
    const x = infoteraAvailsPackages.filter(
      (v) => v.status === 'fulfilled' && v.value.packageAvails,
    )

    return parseToIPackagesAvailOutPutList(
      availablePackages,
      x as PromiseFulfilledResult<InfoTravelPackageAvailbility>[],
    )
  }

  private async makePackageAvails(
    packageExternalData: PromiseSettledResult<IinfoteraPackageById>[],
    user: string,
  ): Promise<PromiseSettledResult<InfoTravelPackageAvailbility>[]> {
    return await Promise.allSettled(
      packageExternalData.reduce((acc, val) => {
        if (val.status == 'fulfilled' && val.value.hasOwnProperty('id')) {
          const re = new Promise(async (resolve) => {
            resolve({
              ...(await this.getPackageAvails(val.value, user)),
              id: val.value.id,
            })
          })
          acc.push(re)
        }
        return acc
      }, [] as any),
    )
  }

  private getPackageAvails(infotravel: IinfoteraPackageById, user) {
    return this.infotravelService.avail.getPackageAvailbility(
      mountPackageAvailParams(infotravel, user),
    )
  }

  /**
   *
   * @param experiences
   * @example '1,2,3,4'
   * @returns [1,2,3,4]
   */
  getExperiencesIds(experiences: string): {ids: number[]} {
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
