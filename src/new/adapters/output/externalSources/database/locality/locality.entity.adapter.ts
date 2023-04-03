import {Injectable} from '@nestjs/common'
import {Locality} from '../../../../../core/locality/models/locality'
import {LocalityEntity} from '../../../../../../modules/database/entity/locality.entity'

@Injectable()
export class LocalityEntityAdapter {
  public toLocalityFromLocalityEntity(
    entity: Partial<LocalityEntity>,
  ): Locality {
    const locality = new Locality()
    locality.id = entity.id
    locality.externalId = entity.externalId
    locality.name = entity.name
    locality.normalizedName = entity.normalizedName
    return locality
  }
}
