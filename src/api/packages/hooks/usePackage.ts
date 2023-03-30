import useBaseQuery from '@hooks/_common/useBaseQuery'
import { UseQueryOptions } from 'react-query'
import {
  getPackage,
  GetPackageInput,
} from 'src/api/packages/PackagesServiceApi'
import { Package } from 'src/models/Package'
import { QueryKeys } from 'src/utils/constants/queryKeys'

type UsePackageInput = {
  queryOptions?: UseQueryOptions<Package>
} & GetPackageInput

const usePackage = ({ packageID, queryOptions = {} }: UsePackageInput) =>
  useBaseQuery<Package>(
    [QueryKeys.package],
    () => getPackage({ packageID }),
    queryOptions,
  )

export default usePackage
