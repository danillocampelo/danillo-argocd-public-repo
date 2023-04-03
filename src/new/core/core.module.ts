import {HttpModule} from '@nestjs/axios'
import {CacheModule, Module} from '@nestjs/common'
import {TypeOrmModule} from '@nestjs/typeorm'
import {BookingModule} from '~/modules/booking/booking.module'
import {userCategory} from '~/modules/database/entity/userCategory.entity'
import {InfotravelModule} from '~/modules/infotravel/infotravel.module'
import {ExternalSourcesAdapterModule} from '../adapters/output/externalSources/externalSouces.adapter.module'
import {DatabaseModuleNew} from '../ports/driven/externalSources/database/database.module'
import {LocalityRepository} from '../ports/driven/externalSources/database/locality/locality.repository'
import {ReserveRepository} from '../ports/driven/externalSources/database/reserve/reserve.repository'
import {PackageModule} from '../ports/input/api/package/package.module'
import {UserCategoryRepository} from '../ports/input/api/user/user.repository'
import {AdyenCheckoutService} from '../ports/output/externalSources/adyen/adyen.checkout.service'
import {AdyenModule} from '../ports/output/externalSources/adyen/adyen.module'
import {AWSService} from '../ports/output/externalSources/aws/aws.sqs.service'
import {SmilesModule} from '../ports/output/externalSources/smiles/smiles.module'
import {SmilesService} from '../ports/output/externalSources/smiles/smiles.user.service'
import {BookingReserveService} from './booking/bookingReserve.service'
import {LocalityDatasource} from './locality/datasource/locality.datasource'
import {LocalityService} from './locality/locality.service'
import {PaymentDatasource} from './payment/datasource/payment.datasource'
import {PaymentService} from './payment/payment.service'
import {PaymentQueue} from './payment/queue/payment.queue'
import {ReserveService} from './reserve/reserve.service'
import {UserService} from './user/user.service'

const internalProviders = [
  PaymentService,
  UserService,
  SmilesService,
  ReserveService,
  BookingReserveService,
  LocalityService,
]

@Module({
  imports: [
    HttpModule.register({
      timeout: 10000,
      maxRedirects: 3,
    }),
    CacheModule.register(),
    DatabaseModuleNew,
    AdyenModule,
    SmilesModule,
    InfotravelModule,
    PackageModule,
    ExternalSourcesAdapterModule,
    BookingModule,
    TypeOrmModule.forFeature([userCategory]),
  ],
  controllers: [],
  providers: [
    UserCategoryRepository,
    ...internalProviders,
    {
      provide: PaymentDatasource,
      useClass: AdyenCheckoutService,
    },
    {provide: PaymentQueue, useClass: AWSService},
    {
      provide: 'ReserveRepositoryDataSource',
      useExisting: ReserveRepository,
    },
    {
      provide: LocalityDatasource,
      useExisting: LocalityRepository,
    },
  ],
  exports: internalProviders,
})
export class CoreModule {}
