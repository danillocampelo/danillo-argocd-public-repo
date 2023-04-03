import {Module} from '@nestjs/common'
import {TypeOrmModule} from '@nestjs/typeorm'
import {ReserveRepository} from './reserve/reserve.repository'
import {Reserve} from '~/modules/database/entity/reserve.entity'
import {LocalityEntity} from '../../../../../modules/database/entity/locality.entity'
import {LocalityRepository} from './locality/locality.repository'
import {ExternalSourcesAdapterModule} from '../../../../adapters/output/externalSources/externalSouces.adapter.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Reserve, LocalityEntity]),
    ExternalSourcesAdapterModule,
  ],
  providers: [ReserveRepository, LocalityRepository],
  exports: [ReserveRepository, LocalityRepository],
})
export class DatabaseModuleNew {}
