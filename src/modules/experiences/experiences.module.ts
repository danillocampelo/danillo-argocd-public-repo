import {Module} from '@nestjs/common'
import {ExperiencesService} from './experiences.service'
import {ExperiencesController} from './experiences.controller'
import {ExperiencesRepository} from './experiences.repository'
import {TypeOrmModule} from '@nestjs/typeorm'
import {Experience} from '../database/entity/experience.entity'
import {InfotravelModule} from '../infotravel/infotravel.module'

@Module({
  imports: [TypeOrmModule.forFeature([Experience]), InfotravelModule],
  providers: [ExperiencesService, ExperiencesRepository],
  controllers: [ExperiencesController],
})
export class ExperiencesModule {}
