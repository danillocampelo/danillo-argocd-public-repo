import {HttpModule} from '@nestjs/axios'
import {CacheModule, Module} from '@nestjs/common'
import {TypeOrmModule} from '@nestjs/typeorm'
import {DatabaseModule} from '../database/database.module'
import {Package} from '../database/entity/package.entity'
import {InfotravelModule} from '../infotravel/infotravel.module'
import {PackageController} from './package.controller'
import {PackageRepository} from './package.repository'
import {PackageService} from './package.service'

@Module({
  imports: [
    HttpModule,
    DatabaseModule,
    TypeOrmModule.forFeature([Package]),
    CacheModule.register(),
    InfotravelModule,
  ],
  controllers: [PackageController],
  providers: [PackageService, PackageRepository],
})
export class PackageModule {}
