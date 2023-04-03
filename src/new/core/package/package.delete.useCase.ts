import {Injectable} from '@nestjs/common'
import {
  IResponse,
  ResponseHttp,
} from '~/common/responseHttp/responseHttp.entity'
import {PackageRepository} from '~/new/adapters/output/package/package.repository'

@Injectable()
export class PackageServiceDeleteUseCase {
  constructor(private readonly packageRepository: PackageRepository) {}

  async deletePackage(id: number): Promise<IResponse> {
    return new ResponseHttp<IResponse>({
      statusCode: 200,
      entity: await this.packageRepository.deletePackage(id),
    })
  }
}
