import {Injectable, UnprocessableEntityException} from '@nestjs/common'
import {removeArrayEmptyAvalues} from '~/helpers/remove-empty-values'
import {PackageRepository} from '../packages/package.repository'
import {IntegrationPackageParser} from './integration.package.parser'

@Injectable()
export class IntegrationService {
  constructor(
    private readonly packageRepository: PackageRepository,
    private readonly packageParser: IntegrationPackageParser,
  ) {}

  async packageCSVIntegration(file: Express.Multer.File) {
    const packages = removeArrayEmptyAvalues(
      await this.packageParser.parseCSVToPackage(file),
    )
    console.log()
    const records = []
    for (const parsedPackage of packages) {
      const packageEntity = await this.packageRepository.packageByExternalId(
        parsedPackage.externalId,
      )
      if (packageEntity) {
        records.push({id: packageEntity.id, ...parsedPackage})
      } else if (parsedPackage?.externalId) {
        records.push(parsedPackage)
      }
    }
    try {
      await this.packageRepository.bulkSave(records)
    } catch (error) {
      console.log('Error', error)
      throw new UnprocessableEntityException(
        'Error trying to save imported packages',
      )
    }
  }
}
