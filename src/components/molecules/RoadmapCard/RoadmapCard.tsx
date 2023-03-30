import React from 'react'
import { useTranslation } from 'next-i18next'

import { ClockIcon } from '@assets/icons'
import { Day } from '@models/Roadmap'

type Props = {
  day: Day
}

const RoadmapCard = ({ day }: Props) => {
  const { t } = useTranslation(['checkout', 'common'])

  return (
    <article className={`mb-6 flex flex-col justify-start 2xl:mb-8`}>
      <div className="ml-0 mr-7 flex flex-row">
        <section className="mt-0 align-text-top md:mt-6">
          <h5 className={'font-bold capitalize text-black'}>{day.title}</h5>
          <p className="mt-4 text-paragraph-small font-normal text-black-transparent-70 md:mt-2">
            {day.description}
          </p>
          {day.duration && (
            <div className="mt-1 flex flex-row items-center text-gray-60">
              <ClockIcon />
              <p className="ml-1mb- text-left text-tag">
                {day.duration} {t('roadmap.duration')}
              </p>
            </div>
          )}
        </section>
      </div>
    </article>
  )
}

export default RoadmapCard
