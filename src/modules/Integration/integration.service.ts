import {Injectable, UnprocessableEntityException} from '@nestjs/common'
import {
  PackageRepository,
  TransactionCommand,
} from '../packages/package.repository'
import {IntegrationPackageParser} from './integration.package.parser'

@Injectable()
export class IntegrationService {
  constructor(
    private readonly packageRepository: PackageRepository,
    private readonly packageParser: IntegrationPackageParser,
  ) {}

  async packageCSVIntegration(file: Express.Multer.File) {
    const packages = await this.packageParser.parseCSVToPackage(file)
    const records = []
    for (const parsedPackage of packages) {
      const packageEntity = await this.packageRepository.packageByExternalId(
        parsedPackage.externalId,
      )
      if (packageEntity) {
        records.push({
          package: {id: packageEntity.id, ...parsedPackage},
          command: TransactionCommand.UPDATE,
        })
      } else {
        records.push({package: parsedPackage, command: TransactionCommand.SAVE})
      }
    }
    try {
      await this.packageRepository.bulkSaveOrUpdate(records)
    } catch (error) {
      throw new UnprocessableEntityException(
        'Error trying to save imported packages',
      )
    }
  }
}
