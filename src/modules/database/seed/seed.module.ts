import {Module} from '@nestjs/common'
import {ConfigModule} from '@nestjs/config'

import {TypeOrmModule} from '@nestjs/typeorm'
import {Package} from '~/modules/database/entity/package.entity'
import {Experience} from '../entity/experience.entity'
import {Trivia} from '../entity/trivia.entity'
import {SeedController} from './seed.controller'
import {SeedRepository} from './seed.repository'
import {SeedService} from './seed.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forFeature([Package, Experience, Trivia]),
  ],
  controllers: [SeedController],
  providers: [SeedService, SeedRepository],
})
export class SeedModule {}
