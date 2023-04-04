import {Injectable} from '@nestjs/common'
import {
  IResponse,
  ResponseHttp,
} from '~/common/responseHttp/responseHttp.entity'
import {PackageAvailAdapter} from '~/modules/checkout/adapters/packageAvailable.adapter'
import {
  IUtilityHotelDetail,
  IinfoteraPackageById,
} from '~/modules/infotravel/infotravel.interfaces'
import {InfotravelService} from '~/modules/infotravel/infotravel.service'
import {IPackageWithRelations} from '~/modules/packages/interfaces/package.interface'
import {PackageRepository} from '~/new/adapters/output/package/package.repository'
import {parseToIPackagesOutPutByIdDetails} from '~/new/adapters/output/package/parse'
import {mountPackageAvailParams, sumAvailPoints} from './common'
import {PackageAvailResponse} from '~/modules/infotravel/services/availbility/entities/packageAvailbility.entity'

@Injectable()
export class PackageServiceGetByIdUseCase {
  constructor(
    private readonly packageRepository: PackageRepository,
    private readonly infotravelService: InfotravelService,
    private readonly adapter: PackageAvailAdapter,
  ) {}

  async handler(options: {
    id: string
    user: string
    ignoreAvailability: boolean
  }): Promise<IResponse> {
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

    const infotravel = await this.infotravelService.package.getPackageById(
      packageWithRelations.externalId || options.id,
    )

    this.checkInfotravel(infotravel)

    const hotelId = infotravel?.destinations?.[0]?.packageHotels[0].id
    const hotelKeyDetails = infotravel?.destinations?.[0]?.packageHotels.map(
      (hotel) => hotel.keyDetail,
    )
    const hotels = await Promise.all(
      hotelKeyDetails.map(async (keyDetail) =>
        this.infotravelService.infoTravelGetHotelByKeyDetail(keyDetail),
      ),
    )

    let points = 0
    let cancellationPolicies = []

    if (!options?.ignoreAvailability) {
      const packageAvail = await this.getPackageAvails(infotravel, options.user)

      if (packageAvail) {
        if (packageAvail.hasOwnProperty('packageAvails')) {
          points = sumAvailPoints(packageAvail as any)
        }
        cancellationPolicies = this.cancellationPolicies(packageAvail, hotelId)
      }
    }

    return new ResponseHttp<IResponse>({
      statusCode: 200,
      entity: parseToIPackagesOutPutByIdDetails(
        infotravel,
        packageWithRelations || ({} as any),
        hotels,
        points,
        cancellationPolicies,
      ),
    })
  }

  private async checkInfotravel(infotravel) {
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
  }

  private cancellationPolicies(
    packageAvail: PackageAvailResponse,
    hotelId: number,
  ) {
    const currentHotel = packageAvail.packageAvails?.[0]?.hotelAvails.find(
      (a) => a?.hotel?.id === hotelId,
    )
    const cancellationPolicies =
      currentHotel?.roomGroups?.[0]?.rooms?.[0]?.cancellationPolicies?.penalties
    return cancellationPolicies
  }

  private group(xs, key) {
    return xs.reduce(function (rv, x) {
      ;(rv[x[key]] = rv[x[key]] || []).push(x)
      return rv
    }, {})
  }

  private async getHotelDetail(infotravel: IinfoteraPackageById) {
    const hotelKeyDetail =
      infotravel?.destinations[0].packageHotels[0].keyDetail
    const hotel = hotelKeyDetail
      ? await this.infotravelService.infoTravelGetHotelByKeyDetail(
          hotelKeyDetail,
        )
      : undefined
    return hotel
  }

  async getPackageWithRelationsByExternalId(
    externalId: string,
  ): Promise<IPackageWithRelations> {
    return this.packageRepository.packageFullInfoByExternalId({externalId})
  }

  private async getPackageAvails(
    infotravel: IinfoteraPackageById,
    user: string,
  ) {
    try {
      const packageAvailability =
        await this.infotravelService.avail.getPackageAvailbility(
          mountPackageAvailParams(infotravel, user),
        )
      return packageAvailability
    } catch (err) {
      return undefined
    }
  }
}
