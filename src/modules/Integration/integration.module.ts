import {DatabaseModule} from '../database/database.module'
import {TypeOrmModule} from '@nestjs/typeorm'
import {CacheModule, Module} from '@nestjs/common'
import {IntegrationController} from './integration.controller'
import {IntegrationService} from './integration.service'
import {PackageRepository} from '../packages/package.repository'
import {PackageModule} from '../packages/package.module'
import {Package} from '../database/entity/package.entity'
import {ExperiencesRepository} from '../experiences/experiences.repository'
import {Experience} from '../database/entity/experience.entity'
import {IntegrationPackageParser} from './integration.package.parser'

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([Package, Experience]),
    CacheModule.register(),
  ],
  controllers: [IntegrationController],
  providers: [
    IntegrationService,
    PackageRepository,
    IntegrationService,
    ExperiencesRepository,
    IntegrationPackageParser,
  ],
})
export class IntegrationModule {}
