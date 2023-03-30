import { UseQueryOptions } from 'react-query'
import { QueryKeys } from 'src/utils/constants/queryKeys'
import useBaseQuery from './_common/useBaseQuery'
import { UserOrders, getOrders } from '@api/orders/OrderServiceApi'

type UseOrdersInput = {
  queryOptions?: UseQueryOptions<UserOrders>
}

const useOrders = ({ queryOptions }: UseOrdersInput) =>
  useBaseQuery<UserOrders>([QueryKeys.orders], () => getOrders(), queryOptions)

export default useOrders
