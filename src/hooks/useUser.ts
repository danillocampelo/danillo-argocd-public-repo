import { getUser, GetUserInput } from '@api/user/UserServiceApi'
import { User } from '@models/User'
import { QueryKeys } from '@utils/constants/queryKeys'
import { UseQueryOptions } from 'react-query'
import useBaseQuery from './_common/useBaseQuery'

type UseUserInput = {
  queryOptions?: UseQueryOptions<User>
} & GetUserInput

const useUser = ({ userId, queryOptions = {} }: UseUserInput) =>
  useBaseQuery<User>([QueryKeys.user], () => getUser({ userId }), queryOptions)

export default useUser
