import {HttpModule} from '@nestjs/axios'
import {CacheModule, Module} from '@nestjs/common'
import {ConfigService} from '@nestjs/config'
import {InfotravelController} from './infotravel.controller'
import {InfotravelService} from './infotravel.service'
import {InfrotavelAvailbilityService} from './services/availbility/infrotravelAvailbility.service'
import {InfotravelBackofficeEngineService} from './services/engines/infotravel.backoffice.engine.service'
import {InfotravelBookingEngineService} from './services/engines/infotravel.booking.engine.service'
import {InfotravelSearchServiceEngine} from './services/engines/infotravelSearch.service'
import {InfrotavelPackageService} from './services/package/infotravelPackage.service'

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        baseURL: configService.get('INFOTRAVEL_URL'),
        timeout: 10000,
        maxRedirects: 3,
      }),
      inject: [ConfigService],
    }),
    CacheModule.register(),
  ],
  controllers: [InfotravelController],
  providers: [
    InfotravelService,
    InfotravelSearchServiceEngine,
    InfrotavelAvailbilityService,
    InfrotavelPackageService,
    InfotravelBookingEngineService,
    InfotravelBackofficeEngineService,
  ],
  exports: [
    InfotravelService,
    InfotravelSearchServiceEngine,
    InfrotavelAvailbilityService,
    InfrotavelPackageService,
    InfotravelBookingEngineService,
    InfotravelBackofficeEngineService,
  ],
})
export class InfotravelModule {}
