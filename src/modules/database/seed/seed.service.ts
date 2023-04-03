import {Injectable} from '@nestjs/common'
import {experiences, packages} from './data'
import {SeedRepository} from './seed.repository'

@Injectable()
export class SeedService {
  constructor(private readonly seedRepository: SeedRepository) {}

  async seed(): Promise<void> {
    await this.seedRepository.createExperiences(experiences)
    await this.seedRepository.createPackages(packages)
  }

  async seedRandom(): Promise<any> {
    return await this.seedRepository.createPackageFake()
  }
  async getPack(): Promise<any> {
    return this.seedRepository.getPackages()
  }
}
