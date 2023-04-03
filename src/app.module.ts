import {Module} from '@nestjs/common'
import {APP_GUARD, APP_INTERCEPTOR} from '@nestjs/core'
import {JwtModule} from '@nestjs/jwt'
import {AppController} from './app.controller'
import {AppService} from './app.service'
import {AuthGuard} from './common/auth/AuthGuard'
import {ResponseHttpInterceptor} from './common/interceptors/responsehttp.interceptor'
import {BookingModule} from './modules/booking/booking.module'
import {CheckoutModule} from './modules/checkout/checkout.module'
import {DatabaseModule} from './modules/database/database.module'
import {SeedModule} from './modules/database/seed/seed.module'
import {ExperiencesModule} from './modules/experiences/experiences.module'
import {InfotravelModule} from './modules/infotravel/infotravel.module'
import {IntegrationModule} from './modules/Integration/integration.module'
import {PackageModule} from './modules/packages/package.module'
import {UserModule} from './modules/user/user.module'
import {ApiModule} from './new/ports/input/api/api.module'

function validate(config: Record<string, string>): any {
  const envs = [
    'PORT',
    'NODE_ENV',
    'DATABASE_URL',
    'INFOTRAVEL_URL',
    'INFOTRAVEL_USERNAME',
    'INFOTRAVEL_PASSWORD',
    'INFOTRAVEL_CLIENT',
    'INFOTRAVEL_AGENCY',
  ]
  envs.forEach((env) => {
    if (['', undefined].includes(config[env])) {
      throw new Error(`The env var ${env} is Missing.`)
    }
  })
}

@Module({
  imports: [
    JwtModule.register({secret: ''}),
    DatabaseModule.orm(),
    InfotravelModule,
    PackageModule,
    SeedModule,
    ExperiencesModule,
    UserModule,
    CheckoutModule,
    IntegrationModule,
    BookingModule,
    ApiModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {provide: APP_INTERCEPTOR, useClass: ResponseHttpInterceptor},
    {provide: APP_GUARD, useClass: AuthGuard},
  ],
})
export class AppModule {}
