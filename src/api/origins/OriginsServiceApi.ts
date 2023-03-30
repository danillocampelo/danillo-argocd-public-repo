import { get } from '@api/_common/api'
import { Origin } from '@models/Origin'
import { getOriginsDTO } from './dtos/getOriginsDTO'
import { OriginsMapper } from './mappers/OriginsMapper'

const basePath = 'checkout'

export type GetOriginsInput = {
  query?: string
}

export type Status = {
  status: string
}

const getOrigins = async ({ query }: GetOriginsInput): Promise<Origin[]> => {
  try {
    if (query === undefined || query === null)
      throw new Error('query is required')
    if (query.length < 3) return []
    const { data } = await get<getOriginsDTO>({
      url: `${basePath}/origins?query=${query}`,
    })

    return await OriginsMapper(data)
  } catch (err) {
    throw err
  }
}

export { getOrigins }
