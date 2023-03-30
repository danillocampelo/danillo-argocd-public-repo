import React, { FC } from 'react'
import { useTranslation } from 'next-i18next'
import { ClockIcon } from '@assets/icons'
import Divider from '@components/atoms/Divider'
import { Day, Roadmap } from '@models/RoadMap'

type Props = {
  roadmap?: Roadmap
}

export const RoadmapReview: FC<Props> = ({ roadmap }) => {
  const { t } = useTranslation('checkout')

  return (
    <section className="container mr-1 flex flex-col md:mr-2 2xl:mr-2">
      {roadmap?.days.map((data: Day) => (
        <>
          <p className="mt-2 text-h5-mobile font-bold lowercase md:mt-1">
            {data.day}º {t('roadmap.day')}
          </p>
          <div className="mt-0 align-text-top md:mt-6">
            <h5
              className={
                'mt-4 text-paragraph-medium font-bold capitalize text-black md:text-h5-mobile'
              }
            >
              {data.title}
            </h5>
            <p className="mt-4 text-paragraph-small font-normal text-black-transparent-70 md:mt-2 md:text-paragraph-medium">
              {data.description}
            </p>
            {data.duration && (
              <div className="mt-3 flex flex-row items-center text-gray-60">
                <ClockIcon />
                <p className="ml-1mb- text-left text-tag">
                  {data.duration} {t('roadmap.duration')}
                </p>
              </div>
            )}
          </div>
          <Divider className="mt-4 mb-4 md:mt-8 md:mb-8" />
        </>
      ))}
    </section>
  )
}
