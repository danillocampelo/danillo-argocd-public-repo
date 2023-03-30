import { ClockIcon, FireIcon, SparklesIcon } from '@assets/icons'
import RadioOption from '@components/atoms/RadioOption'
import Tag from '@components/atoms/Tag'
import MilesAccrual from '@components/organisms/MilesAccrual/MilesAccrual'
import { Price } from '@models/Price'
import { useTranslation } from 'next-i18next'
import { Dispatch, SetStateAction } from 'react'
import { Pricing } from './Pricing'

export type Tour = {
  id: string
  name: string
  description: string
  duration: number
  price: Price
  miles: number
  unmissable: boolean
  trending: boolean
}

type Props = {
  value: string
  tour: Tour
  currentValue: string
  setCurrentValue: Dispatch<SetStateAction<string>>
}

export const TourOption = ({
  value,
  tour,
  currentValue,
  setCurrentValue,
}: Props) => {
  const { t } = useTranslation(['custom-checkout', 'checkout', 'common'])

  return (
    <RadioOption
      value={value}
      currentValue={currentValue}
      setCurrentValue={setCurrentValue}
      className="mx-3 my-4 w-[15.875rem] flex-shrink-0 rounded lg:w-[22rem]"
      buttonClassName="top-6 left-6"
      optional
    >
      <div
        className={`flex flex-col p-6 ${
          !tour.unmissable && !tour.trending ? 'pt-12' : ''
        }`}
      >
        {tour.unmissable && (
          <Tag className="mb-6 self-end" Icon={SparklesIcon}>
            {t('tour.unmissable')}
          </Tag>
        )}
        {tour.trending && (
          <Tag className="mb-6 self-end" Icon={FireIcon}>
            {t('tour.trending')}
          </Tag>
        )}
        <div className="mb-4 flex flex-col border-b border-gray-10 pb-5">
          <h6 className="pb-1 text-hyperlink-medium">{tour.name}</h6>
          <p className="pb-2 text-paragraph-small">{tour.description}</p>
          <span className="flex items-center gap-2 text-tag text-gray-80">
            <ClockIcon />
            {tour.duration} {t('checkout:roadmap.duration')}
          </span>
        </div>
        <Pricing
          price={tour.price}
          priceClassName="text-paragraph-medium font-bold"
        />
        <div className="mt-4 rounded bg-black px-2 py-1">
          <MilesAccrual
            miles={tour.miles}
            textBeforeIcon={t('common:acumulate-until')}
            breakLineOnMobile
          />
        </div>
      </div>
    </RadioOption>
  )
}
