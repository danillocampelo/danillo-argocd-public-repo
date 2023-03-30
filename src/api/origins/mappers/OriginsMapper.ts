import { Origin } from '@models/Origin'
import { getOriginsDTO } from '../dtos/getOriginsDTO'

export const OriginsMapper = (originsDTO: getOriginsDTO): Origin[] => {
  return originsDTO.entity.origins.map((origin) => ({
    id: origin.id,
    name: origin.name,
    type: origin.type,
    iata: origin.iata,
  }))
}
