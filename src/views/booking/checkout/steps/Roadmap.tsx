import React, { FC } from 'react'
import { useTranslation } from 'next-i18next'

import RoadmapCard from 'src/components/molecules/RoadmapCard'
import { Divider } from '@components/index'
import { Day } from '@models/RoadMap'
import { CheckoutRequiredData } from '../Checkout'
import { ContentProps } from '@views/booking/components/BookingController'

type Props = ContentProps<CheckoutRequiredData>

export const CheckoutRoadmap: FC<Props> = ({ requiredData }) => {
  const { t } = useTranslation(['checkout', 'common'])

  if (!requiredData.packageData) return null

  return (
    <div className="container flex flex-col p-4 md:p-7 2xl:p-11">
      <h5 className="mb-4 font-bold md:mb-4">{t('roadmap.title')}</h5>
      <p className="text-gray-90">{t('roadmap.subtitle')}</p>
      {requiredData.packageData.roadMap?.days?.map((data: Day) => (
        <>
          <p className="mt-4 font-bold md:mt-8">
            {t('roadmap.day')} {data.day}
          </p>
          <RoadmapCard key={data.day} day={data} />
          <Divider />
        </>
      ))}
    </div>
  )
}
