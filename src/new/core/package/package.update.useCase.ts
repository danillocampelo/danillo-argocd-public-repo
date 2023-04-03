import {Injectable} from '@nestjs/common'
import {
  IResponse,
  ResponseHttp,
} from '~/common/responseHttp/responseHttp.entity'
import {PackageRepository} from '~/new/adapters/output/package/package.repository'

@Injectable()
export class PackageServiceUpdateUseCase {
  constructor(private readonly packageRepository: PackageRepository) {}

  async updatePackage(id, data): Promise<IResponse> {
    return new ResponseHttp<IResponse>({
      statusCode: 200,
      entity: await this.packageRepository.updatePackage(id, data),
    })
  }
}
