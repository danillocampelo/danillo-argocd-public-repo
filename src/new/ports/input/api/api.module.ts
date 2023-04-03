import {HttpModule} from '@nestjs/axios'
import {CacheModule, Module} from '@nestjs/common'
import {TypeOrmModule} from '@nestjs/typeorm'
import {DatabaseModule} from '~/modules/database/database.module'
import {userCategory} from '~/modules/database/entity/userCategory.entity'
import {ApiAdapterModule} from '../../../adapters/input/api/api.adapter.module'
import {CoreModule} from '../../../core/core.module'
import {PaymentController} from './payment/payment.controller'
import {UserController} from './user/user.controller'
import {UserCategoryRepository} from './user/user.repository'
import {AdyenModule} from '../../output/externalSources/adyen/adyen.module'
import {AuthModule} from '~/common/auth/auth.module'
import {LocalityController} from './locality/locality.controller'

@Module({
  imports: [
    HttpModule.register({
      timeout: 10000,
      maxRedirects: 3,
    }),
    AuthModule,
    CacheModule.register(),
    CoreModule,
    ApiAdapterModule,
    DatabaseModule,
    TypeOrmModule.forFeature([userCategory]),
    AdyenModule,
  ],
  controllers: [PaymentController, UserController, LocalityController],
  providers: [UserCategoryRepository],
})
export class ApiModule {}
