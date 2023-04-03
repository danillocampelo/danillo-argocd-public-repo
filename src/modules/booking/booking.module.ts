import {HttpModule} from '@nestjs/axios'
import {CacheModule, Module} from '@nestjs/common'
import {CheckoutInfotravelMapper} from '../checkout/mappers/checkout.infotravel.mapper'
import {InfotravelModule} from '../infotravel/infotravel.module'
import {BookingController} from './booking.controller'
import {BookingDatasource} from './booking.datasource'
import {BookingService} from './booking.service'
import {BookingInfotravelMapper} from './mappers/booking.infotravel.mapper'
import {InfotravelService} from '../infotravel/infotravel.service'

@Module({
  imports: [
    HttpModule.register({
      timeout: 10000,
      maxRedirects: 3,
    }),
    CacheModule.register(),
    InfotravelModule,
  ],
  controllers: [BookingController],
  providers: [
    BookingService,
    BookingDatasource,
    CheckoutInfotravelMapper,
    BookingInfotravelMapper,
  ],
  exports: [BookingDatasource, BookingInfotravelMapper],
})
export class BookingModule {}
