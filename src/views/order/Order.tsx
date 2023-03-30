import { FunctionComponent } from 'react'
import useOrder from '@api/orders/hooks/useOrder'
import { Themes } from '@utils/constants/theme'
import NavProfile from '@views/profile/components/NavProfile'
import { OrderData } from './components/OrderData'
import { AccommodationInfo } from './components/AccommodationInfo'
import { useTranslation } from 'next-i18next'

type Props = {
  orderId: string
}

const CACHE_TIME_IN_MS = 10 * 60 * 1000 // 10 minutes

const OrderPage: FunctionComponent<Props> = ({ orderId }) => {
  const { t } = useTranslation(['order-page', 'common'])

  const { data, error, isLoading } = useOrder({
    orderId,
    queryOptions: {
      staleTime: CACHE_TIME_IN_MS,
      cacheTime: CACHE_TIME_IN_MS,
    },
  })

  /**
   * @todo: Adicionar layout de loading/pedido não encontrado
   */
  if (isLoading)
    return (
      <h3 className="text-center font-bold text-white">
        {t('common:loading')}...
      </h3>
    )

  if (!data || error)
    return (
      <h3 className="text-center font-bold text-white">
        {t('order-not-found')}
      </h3>
    )

  return (
    <div className="bg-white">
      <NavProfile theme={Themes.light} />
      <main className="mx-3 mt-8 pb-6 md:mx-8 md:mt-12 md:pb-8 2xl:mx-9">
        <OrderData order={data} />
        <AccommodationInfo order={data} />
      </main>
    </div>
  )
}

export default OrderPage
