import { getOrder } from '@api/orders/OrderServiceApi'
import useBaseQuery from '@hooks/_common/useBaseQuery'
import { Order } from '@models/Order'
import { QueryKeys } from '@utils/constants/queryKeys'
import { UseQueryOptions } from 'react-query'

type UseOrderInput = {
  orderId: string
  queryOptions?: UseQueryOptions<Order>
}

const useOrder = ({ orderId, queryOptions = {} }: UseOrderInput) =>
  useBaseQuery<Order>(
    [`${QueryKeys.order}/${orderId}`],
    () => getOrder(orderId),
    queryOptions,
  )

export default useOrder
