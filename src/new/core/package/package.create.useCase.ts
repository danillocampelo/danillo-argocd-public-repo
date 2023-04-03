import {Injectable} from '@nestjs/common'
import {
  IResponse,
  ResponseHttp,
} from '~/common/responseHttp/responseHttp.entity'
import {PackageRepository} from '~/new/adapters/output/package/package.repository'

@Injectable()
export class PackageServiceCreateUseCase {
  constructor(private readonly packageRepository: PackageRepository) {}

  async create(payload): Promise<IResponse> {
    return new ResponseHttp<IResponse>({
      statusCode: 200,
      entity: await this.packageRepository.createPackage(payload),
    })
  }
}
