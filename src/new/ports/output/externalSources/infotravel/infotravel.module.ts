import {HttpModule} from '@nestjs/axios'
import {CacheModule, Module} from '@nestjs/common'
import {ConfigService} from '@nestjs/config'
import {UserService} from '~/new/core/user/user.service'
import {InfotravelService} from './infotravel.service'

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
  providers: [InfotravelService],
  exports: [InfotravelService],
})
export class InfotravelModule {}
