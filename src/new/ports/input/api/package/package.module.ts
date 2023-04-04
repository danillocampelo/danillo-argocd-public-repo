import {HttpModule} from '@nestjs/axios'
import {CacheModule, Module} from '@nestjs/common'
import {JwtModule} from '@nestjs/jwt'
import {TypeOrmModule} from '@nestjs/typeorm'
import {PackageAvailAdapter} from '~/modules/checkout/adapters/packageAvailable.adapter'
import {DatabaseModule} from '~/modules/database/database.module'
import {Package} from '~/modules/database/entity/package.entity'
import {InfotravelModule} from '~/modules/infotravel/infotravel.module'
import {PackageRepository} from '~/new/adapters/output/package/package.repository'
import {PackageServiceCreateUseCase} from '~/new/core/package/package.create.useCase'
import {PackageServiceDeleteUseCase} from '~/new/core/package/package.delete.useCase'
import {PackageServiceGetByIdUseCase} from '~/new/core/package/package.getById.useCase'
import {PackageServiceListUseCase} from '~/new/core/package/package.list.useCase'
import {PackageServiceUpdateUseCase} from '~/new/core/package/package.update.useCase'
import {PackageServiceCustomListUseCase} from '~/new/core/package/package.customPackage.list.useCase'
import {InfotravelService} from '~/new/ports/output/externalSources/infotravel/infotravel.service'
import {PackageController} from './package.cotroller'
import { PackageService } from '../../../../core/package/package.service'

@Module({
  imports: [
    JwtModule,
    HttpModule,
    DatabaseModule,
    TypeOrmModule.forFeature([Package]),
    CacheModule.register(),
    InfotravelModule,
  ],
  controllers: [PackageController],
  providers: [
    PackageAvailAdapter,
    PackageRepository,
    PackageServiceCreateUseCase,
    PackageServiceDeleteUseCase,
    PackageServiceGetByIdUseCase,
    PackageServiceUpdateUseCase,
    PackageServiceListUseCase,
    PackageServiceCustomListUseCase,
    InfotravelService,
    PackageService
  ],
})
export class PackageModule {}
