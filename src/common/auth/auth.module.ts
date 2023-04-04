import {HttpModule} from '@nestjs/axios'
import {Module} from '@nestjs/common'
import {ConfigModule} from '@nestjs/config'
import {PassportModule} from '@nestjs/passport'
import {InfotravelModule} from '~/modules/infotravel/infotravel.module'
import {BasicStrategy} from './BasicStratety'

@Module({
  imports: [PassportModule, ConfigModule, HttpModule, InfotravelModule],
  providers: [BasicStrategy],
})
export class AuthModule {}
