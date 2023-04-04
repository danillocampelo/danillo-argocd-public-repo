import {Inject, Injectable} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {Like, Repository} from 'typeorm'
import {LocalityEntityAdapter} from '../../../../../adapters/output/externalSources/database/locality/locality.entity.adapter'
import {LocalityDatasource} from '../../../../../core/locality/datasource/locality.datasource'
import {Locality} from '../../../../../core/locality/models/locality'
import {LocalityEntity} from '../../../../../../modules/database/entity/locality.entity'

@Injectable()
export class LocalityRepository implements LocalityDatasource {
  @InjectRepository(LocalityEntity)
  private readonly repository: Repository<LocalityEntity>

  @Inject()
  private adapter: LocalityEntityAdapter

  public async search(query: string): Promise<Locality[]> {
    const result = await this.repository.find({
      where: {
        normalizedName: Like(`%${query}%`),
      },
    })

    return result.map((entity) =>
      this.adapter.toLocalityFromLocalityEntity(entity),
    )
  }

  public async findOne(id: string): Promise<Locality | undefined> {
    const result = await this.repository.findOne({where: {externalId: id}})

    return result && this.adapter.toLocalityFromLocalityEntity(result)
  }
}
