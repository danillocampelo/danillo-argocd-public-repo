import { UseQueryOptions } from 'react-query'
import {
  getPackages,
  GetPackagesInput,
} from 'src/api/packages/PackagesServiceApi'
import { Package } from 'src/models/Package'
import { QueryKeys } from 'src/utils/constants/queryKeys'
import useBaseQuery from '../../../hooks/_common/useBaseQuery'

type UsePackagesInput = {
  queryOptions?: UseQueryOptions<Package[]>
  params: GetPackagesInput
}

const usePackages = ({ queryOptions, params }: UsePackagesInput) =>
  useBaseQuery<Package[]>(
    [QueryKeys.packages],
    () => getPackages(params),
    queryOptions,
  )

export default usePackages
