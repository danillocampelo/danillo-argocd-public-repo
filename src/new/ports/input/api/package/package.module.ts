import {HttpModule} from '@nestjs/axios'
import {CacheModule, Module} from '@nestjs/common'
import {TypeOrmModule} from '@nestjs/typeorm'
import {DatabaseModule} from '~/modules/database/database.module'
import {Package} from '~/modules/database/entity/package.entity'
import {InfotravelModule} from '~/modules/infotravel/infotravel.module'
import {PackageRepository} from '~/new/adapters/output/package/package.repository'
import {PackageServiceCreateUseCase} from '~/new/core/package/package.create.useCase'
import {PackageServiceDeleteUseCase} from '~/new/core/package/package.delete.useCase'
import {PackageServiceListUseCase} from '~/new/core/package/package.list.useCase'
import {PackageServiceUpdateUseCase} from '~/new/core/package/package.update.useCase'
import {PackageServiceGetByIdUseCase} from '~/new/core/package/package.getById.useCase'
import {PackageServiceCustomListUseCase} from '~/new/core/package/package.customPackage.list.useCase'
import {InfotravelService} from '~/new/ports/output/externalSources/infotravel/infotravel.service'
import {PackageController} from './package.cotroller'

@Module({
  imports: [
    HttpModule,
    DatabaseModule,
    TypeOrmModule.forFeature([Package]),
    CacheModule.register(),
    InfotravelModule,
  ],
  controllers: [PackageController],
  providers: [
    PackageRepository,
    PackageServiceCreateUseCase,
    PackageServiceDeleteUseCase,
    PackageServiceGetByIdUseCase,
    PackageServiceUpdateUseCase,
    PackageServiceListUseCase,
    PackageServiceCustomListUseCase,
    InfotravelService,
  ],
})
export class PackageModule {}
