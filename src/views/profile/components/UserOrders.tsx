import useOrders from '@hooks/useOrders'
import { useTranslation } from 'next-i18next'
import { User } from '@models/User'
import { Skeleton } from '@components/atoms/Skeleton'
import { GreetingCard } from './GreetingCard'
import Divider from '@components/atoms/Divider'
import { ExperienceCard } from './ExperienceCard'
import { TabContentProps } from '@components/molecules/TabCarousel/TabCarousel'
import { useEffect } from 'react'

const UserOrders = ({
  userData,
  triggerResize,
}: { userData: User } & TabContentProps) => {
  const { t } = useTranslation('profile-page')
  const { data: ordersData, isLoading } = useOrders({})
  useEffect(() => {
    if (!isLoading) {
      triggerResize()
    }
  })

  return (
    <section className="min-h-full py-7 px-4 md:px-11 md:py-12">
      <div className="mb-7 flex flex-col gap-3 md:mb-11 md:gap-5 2xl:mb-15">
        <GreetingCard userData={userData} />
      </div>
      <div>
        <h5 className="pb-7 font-bold text-black md:pb-8 2xl:pb-9 2xl:text-h4-desktop">
          {t('user-orders.next-experiences')}
        </h5>
        <div className="grid grid-cols-1 gap-9 lg:grid-cols-2 lg:gap-11">
          {!isLoading && ordersData ? (
            ordersData.next.map((order) => (
              <ExperienceCard key={order.id} userOrder={order} />
            ))
          ) : (
            <Skeleton className="h-[264px] w-[648px]" />
          )}
        </div>
      </div>
      {!isLoading && ordersData?.previous.length == 0 ? (
        <></>
      ) : (
        <div>
          <Divider className="gray-90 my-9 flex border-t-2 md:mt-14 md:mb-9 md:max-w-[69vw]" />
          <div>
            <h5 className="pb-7 font-bold text-black md:pb-8 2xl:pb-9 2xl:text-h4-desktop">
              {t('user-orders.previous-experiences')}
            </h5>
            <div className="grid grid-cols-1 gap-9 lg:grid-cols-2 lg:gap-11">
              {!isLoading && ordersData ? (
                ordersData.previous.map((order) => (
                  <ExperienceCard key={order.id} userOrder={order} />
                ))
              ) : (
                <Skeleton className="h-[264px] w-[648px]" />
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default UserOrders
