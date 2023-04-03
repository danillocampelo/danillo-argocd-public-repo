import {HttpModule} from '@nestjs/axios'
import {CacheModule, Module} from '@nestjs/common'
import {DatabaseModule} from '../database/database.module'
import {InfotravelModule} from '../infotravel/infotravel.module'
import {CheckoutController} from './checkout.controller'
import {CheckoutService} from './checkout.service'
import {PackageAvailAdapter} from './adapters/packageAvailable.adapter'
import {CheckoutInfotravelMapper} from './mappers/checkout.infotravel.mapper'

@Module({
  imports: [
    HttpModule,
    DatabaseModule,
    CacheModule.register(),
    InfotravelModule,
  ],
  controllers: [CheckoutController],
  providers: [CheckoutService, PackageAvailAdapter, CheckoutInfotravelMapper],
})
export class CheckoutModule {}
