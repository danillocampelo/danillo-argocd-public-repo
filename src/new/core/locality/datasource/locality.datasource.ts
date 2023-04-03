import {Locality} from '../models/locality'

export const LocalityDatasource = Symbol('LocalityDatasource')
export interface LocalityDatasource {
  search(query: string): Promise<Locality[]>
}
