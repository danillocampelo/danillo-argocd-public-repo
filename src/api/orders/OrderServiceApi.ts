import { get } from '@api/_common/api'
import { Order } from '@models/Order'
import { ordersMock } from './data/mocks/ordersMock'
import { OrderDto } from './dtos/OrderDto'
import { OrderMapper } from './mappers/OrderMapper'

const basePath = '/booking'

export type UserOrders = {
  previous: Order[]
  next: Order[]
}

const getOrders = async (): Promise<UserOrders> => {
  try {
    const { data: orders } = await get<{
      previous: OrderDto[]
      next: OrderDto[]
    }>({ url: `${basePath}` })

    return {
      previous: orders.previous.map((order) => OrderMapper(order)),
      next: orders.next.map((order) => OrderMapper(order)),
    }
    // previous: ordersMock.previous.map((order) => OrderMapper(order)),
    // next: ordersMock.next.map((order) => OrderMapper(order)),
  } catch (err) {
    throw err
  }
}

const getOrder = async (orderId: string): Promise<Order> => {
  const { data } = await get<OrderDto>({
    url: `${basePath}/${orderId}`,
  })
  return OrderMapper(data)
}

export { getOrders, getOrder }
