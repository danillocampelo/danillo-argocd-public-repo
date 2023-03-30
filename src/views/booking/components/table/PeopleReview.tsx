import React, { FC } from 'react'
import { useTranslation } from 'next-i18next'
import { KeyToIconMapper } from '@assets/icons'
import { PeopleFormData } from '@contexts/CheckoutContext/CheckoutContext'
import dayjs from 'dayjs'

type Props = {
  people: PeopleFormData
}

export const PeopleReview: FC<Props> = ({ people }) => {
  const { t } = useTranslation(['checkout'])

  return (
    <section className="flex flex-wrap gap-7 xl:gap-x-13 xl:gap-y-8">
      {Object.entries(people).map(([peopleType, peopleArray]) =>
        peopleArray.map((person, index) => {
          const Icon = KeyToIconMapper[peopleType]
          return (
            <div key={index} className="md:mb-4">
              <strong className="flex text-paragraph-medium font-bold xl:text-h5-mobile">
                <Icon className="mr-1 w-6" />
                {t(`people.${peopleType}`, { count: index + 1 })}
              </strong>
              <span className="text-h5-mobile font-light xl:mt-2">
                {person.name} {person['last-name']}
              </span>
              <div className="flex flex-col xl:mt-1 xl:flex-row xl:items-center xl:gap-4">
                <p className="text-paragraph-small uppercase">
                  {person.document.type} {person.document.value}
                </p>
                <span className="hidden h-[6px] w-[6px] rounded-full bg-black xl:block" />
                <p className="text-paragraph-small">
                  {t('table.birth-in')}{' '}
                  {dayjs(person['birth-date']).format('DD/MM/YYYY')}
                </p>
              </div>
            </div>
          )
        }),
      )}
    </section>
  )
}
