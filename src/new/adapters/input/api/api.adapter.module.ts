import {HttpModule} from '@nestjs/axios'
import {CacheModule, Module} from '@nestjs/common'
import {LocalityApiAdapter} from './locality/locality.api.adapter'
import {PaymentApiAdatper} from './payment/payment.api.adapter'

const providers = [PaymentApiAdatper, LocalityApiAdapter]

@Module({
  imports: [
    HttpModule.register({
      timeout: 10000,
      maxRedirects: 3,
    }),
    CacheModule.register(),
  ],
  providers,
  exports: providers,
})
export class ApiAdapterModule {}
