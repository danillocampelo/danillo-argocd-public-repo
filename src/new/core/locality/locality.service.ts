import {Inject, Injectable} from '@nestjs/common'
import {LocalityDatasource} from './datasource/locality.datasource'
import {Locality} from './models/locality'

@Injectable()
export class LocalityService {
  @Inject(LocalityDatasource)
  private readonly localityDatasource: LocalityDatasource

  public async search(query: string): Promise<Locality[]> {
    const MIN_QUERY_LENGTH = 3
    if (query.length < MIN_QUERY_LENGTH) {
      return []
    }

    return this.localityDatasource.search(query.toLowerCase())
  }
}
