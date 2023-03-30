import { getOrigins, GetOriginsInput } from '@api/origins/OriginsServiceApi'
import { Origin } from '@models/Origin'
import { QueryKeys } from '@utils/constants/queryKeys'
import { UseQueryOptions } from 'react-query'
import useBaseQuery from '../../../hooks/_common/useBaseQuery'

type UsePackageInput = {
  queryOptions?: UseQueryOptions<Origin[]>
} & GetOriginsInput

const useOrigins = ({ query, queryOptions = {} }: UsePackageInput) =>
  useBaseQuery<Origin[]>(
    [QueryKeys.origins, query],
    () => getOrigins({ query }),
    queryOptions,
  )

export default useOrigins
