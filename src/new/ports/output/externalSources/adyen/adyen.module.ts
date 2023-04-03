import {HttpModule} from '@nestjs/axios'
import {CacheModule, Module} from '@nestjs/common'
import {ExternalSourcesAdapterModule} from '../../../../adapters/output/externalSources/externalSouces.adapter.module'
import {AdyenCheckoutService} from './adyen.checkout.service'

@Module({
  imports: [
    HttpModule.register({
      timeout: 10000,
      maxRedirects: 3,
    }),
    CacheModule.register(),
    ExternalSourcesAdapterModule,
  ],
  providers: [AdyenCheckoutService],
  exports: [AdyenCheckoutService],
})
export class AdyenModule {}
