import {HttpModule} from '@nestjs/axios'
import {CacheModule, Module} from '@nestjs/common'
import {LocalityEntityAdapter} from './database/locality/locality.entity.adapter'
import {AdyenAdapter} from './payment/adyen.adapter'

const providers = [AdyenAdapter, LocalityEntityAdapter]

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
export class ExternalSourcesAdapterModule {}
