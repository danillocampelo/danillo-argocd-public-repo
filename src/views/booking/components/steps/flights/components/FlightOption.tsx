import React, { FC, useContext, useState } from 'react'
import { TFunction, useTranslation } from 'next-i18next'
import dayjs from 'dayjs'

import RadioOption from '@components/atoms/RadioOption'
import { LocaleContext } from '@contexts/LocaleContext'
import { convertToCurrency } from '@utils/currency'
import Tag from '@components/atoms/Tag'
import { Flight } from '@models/Flight'
import {
  ClockIcon,
  LandingIcon,
  SnackIcon,
  TakeoffIcon,
  VideoIcon,
  WifiIcon,
} from '@assets/icons'
import Tooltip from '@components/atoms/Tooltip'
import { convertMinToHourMin, getTimeHourMin } from '@utils/time'
import { Price } from '@models/Price'
import FlightConnectionsModal from '@components/organisms/FlightConnectionsModal'

type Props = {
  data: Flight & {
    id: string
    recommendedFlightPrice: Price | undefined
  }
  value: string
  currentValue: string
}

const FlightStops = ({
  flight,
  t,
  onClick,
}: {
  flight: Flight
  t: TFunction
  onClick: () => void
}) => {
  if (!flight.scales?.length)
    return (
      <span className="text-paragraph-small text-gray-60 lg:text-paragraph-medium">{`${t(
        'flightSelection.direct',
      )}`}</span>
    )
  else
    return (
      <button
        onClick={onClick}
        type="button"
        className="text-paragraph-small text-primary lg:text-paragraph-medium"
      >{`${flight.scales.length} ${t('flightSelection.stops')}`}</button>
    )
}

const AirlineSection = ({ flight, t }: { flight: Flight; t: TFunction }) => (
  <div className="flex-shrink-0 border-gray-20 max-xl:border-b max-xl:pb-4 xl:mr-6 2xl:mr-7 3xl:mr-10">
    <div className="flex gap-2 2xl:gap-4">
      <img
        width={72}
        height={72}
        src={'/assets/images/gol.png'}
        alt={''}
        className="my-6 h-8 w-8 rounded-full object-cover max-xl:mt-1 xl:my-7 xl:ml-3 xl:h-10 xl:w-10 3xl:ml-4 3xl:h-12 3xl:w-12"
      />
      <div className="flex flex-col gap-1 xl:gap-0">
        <span className="text-tag text-gray-60 xl:pb-2">{`${t(
          'flightSelection.flight',
        )}`}</span>
        <strong className="text-paragraph-medium font-bold xl:text-h5-mobile">
          {flight.number}
        </strong>
        <p className="hidden text-paragraph-small text-gray-60 xl:block xl:pb-3">{`${t(
          'flightSelection.operated-by',
        )} ${flight.airline.name.toUpperCase()}`}</p>
        {flight.recommended && (
          <Tag theme="light" className="hidden xl:flex">
            {`${t('recommended')}`}
          </Tag>
        )}
      </div>
    </div>
    <p className="pt-2 text-paragraph-small text-gray-60 xl:hidden">{`${t(
      'flightSelection.operated-by',
    )} ${flight.airline.name}`}</p>
  </div>
)

const FlightSection = ({
  flight,
  t,
  isDeparture,
  onClickFlightStops,
}: {
  flight: Flight
  t: TFunction
  isDeparture: boolean
  onClickFlightStops: () => void
}) => {
  const { hours, minutes } = convertMinToHourMin(flight.duration)

  return (
    <div className="flex flex-col border-gray-20 max-xl:border-b max-xl:py-6 xl:mr-6 2xl:mr-7 3xl:mr-10">
      <span className="pb-2 text-tag font-normal text-gray-60 xl:pb-4">{`${t(
        `${
          isDeparture
            ? 'flightSelection.departure-ticket'
            : 'flightSelection.return-ticket'
        }`,
      )}`}</span>
      <div className="flex whitespace-nowrap">
        <div className="flex flex-col gap-1">
          <span className="max-w-[7.5rem] overflow-hidden text-paragraph-medium xl:text-h5-mobile">
            {`${flight.route.from.iata?.name} `}
            <strong className="font-bold">
              {getTimeHourMin(dayjs(flight.departureDate))}
            </strong>
          </span>
          <p className=" text-paragraph-small text-gray-60 xl:text-paragraph-medium">
            {flight.route.from.city?.name}
          </p>
        </div>
        {isDeparture ? (
          <TakeoffIcon className="mx-5 xl:mx-4" />
        ) : (
          <LandingIcon className="mx-5 xl:mx-4" />
        )}
        <div className="flex flex-col gap-1">
          <span className="text-paragraph-medium xl:text-h5-mobile">
            {`${flight.route.to.iata?.name} `}
            <strong className="font-bold">
              {getTimeHourMin(dayjs(flight.arrivalDate))}
            </strong>
          </span>
          <p className="max-w-[7.5rem] overflow-hidden text-paragraph-small text-gray-60 xl:text-paragraph-medium">
            {flight.route.to.city?.name}
          </p>
        </div>
      </div>
      <div className="hidden justify-between pt-2 xl:flex 2xl:hidden">
        <span className="text-paragraph-medium">
          {`${t('flightSelection.duration')}: `}
          <strong className="font-bold">{` ${hours}h ${minutes}m`}</strong>
        </span>
        <FlightStops flight={flight} t={t} onClick={onClickFlightStops} />
      </div>
    </div>
  )
}

const BenefitsTooltips = () => (
  <div className="flex items-center text-primary">
    <Tooltip text="Snacks e bebidas variam de acordo com o destino e duração da viagem">
      <SnackIcon className="w-6 xl:w-7" />
    </Tooltip>
    <Tooltip text="Wifi Tooltip">
      <WifiIcon className="w-6 xl:w-7" />
    </Tooltip>
    <Tooltip text="Video Tooltip">
      <VideoIcon className="w-6 xl:w-7" />
    </Tooltip>
  </div>
)

const DetailsSection = ({
  flight,
  t,
  onClickFlightStops,
}: {
  flight: Flight
  t: TFunction
  onClickFlightStops: () => void
}) => {
  const { hours, minutes } = convertMinToHourMin(flight.duration)

  return (
    <div className="hidden justify-between xl:flex">
      <div className="mr-7 hidden flex-col 2xl:flex 3xl:mr-10">
        <span className="pb-4 text-tag font-normal text-gray-60">{`${t(
          'flightSelection.duration',
        )}`}</span>
        <strong className="flex pb-1 text-h5-mobile font-bold">
          {`${hours}h${minutes}min`}
        </strong>
        <FlightStops flight={flight} t={t} onClick={onClickFlightStops} />
      </div>
      <div className="mr-6 flex flex-col gap-0 2xl:mr-7 3xl:mr-10">
        <span className="pb-4 text-tag font-normal text-gray-60">{`${t(
          'flightSelection.benefits',
        )}`}</span>
        <BenefitsTooltips />
        <span className="whitespace-nowrap pt-1 text-paragraph-medium font-normal text-gray-60">{`${t(
          'flightSelection.while-flight',
        )}`}</span>
      </div>
    </div>
  )
}

const MobileDetailsSection = ({
  flight,
  t,
  onClickFlightStops,
}: {
  flight: Flight
  t: TFunction
  onClickFlightStops: () => void
}) => {
  const { hours, minutes } = convertMinToHourMin(flight.duration)

  return (
    <div className="flex justify-between border-b border-gray-20 py-4 xl:hidden">
      <div className="flex">
        <span className="flex text-paragraph-small">
          <ClockIcon className="mr-1" />
          {`${hours}h${minutes}min`}
        </span>
      </div>
      <FlightStops flight={flight} t={t} onClick={onClickFlightStops} />
      <div className="flex gap-1">
        <BenefitsTooltips />
      </div>
    </div>
  )
}

const PriceSection = ({
  flightPrice,
  recommendedFlightPrice,
  t,
}: {
  flightPrice: Price
  recommendedFlightPrice: Price | undefined
  t: TFunction
}) => {
  const subtractedPrice =
    flightPrice.amount - (recommendedFlightPrice?.amount || flightPrice.amount)
  const isEqual = subtractedPrice === 0
  const isDiscount = subtractedPrice > 0
  const priceMessage = isDiscount
    ? t('flightSelection.of-discount')
    : t('flightSelection.of-increase')

  return (
    <div className="flex flex-col gap-1 pt-6 xl:pt-0">
      <span className="text-tag font-normal text-gray-60">{`${t(
        'total-value',
      )}`}</span>
      <div className="flex flex-col gap-[0.125rem]">
        <h6
          className={`text-h5-mobile font-bold md:text-h6-desktop ${
            isDiscount ? 'text-feedback-positive' : 'text-black'
          }`}
        >
          {convertToCurrency({
            rawNumber: flightPrice.amount,
            currency: flightPrice.currency,
          })}
        </h6>
        {!isEqual && (
          <p className="text-paragraph-small text-gray-60 2xl:text-paragraph-medium">{`${convertToCurrency(
            {
              rawNumber: Math.abs(subtractedPrice),
              currency: flightPrice.currency,
            },
          )} ${priceMessage}`}</p>
        )}
      </div>
    </div>
  )
}

export const FlightOption: FC<Props> = ({ data, value, currentValue }) => {
  const { t } = useTranslation(['checkout', 'common'])
  const isDeparture = data.type === 'DEPART'
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)

  return (
    <>
      <FlightConnectionsModal
        flight={data}
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
      />
      <RadioOption
        currentValue={currentValue}
        value={value}
        buttonClassName="absolute top-6 left-6 xl:top-1/2 xl:-translate-y-1/2 xl:left-5 z-10"
        className={`flex flex-shrink-0 flex-col rounded bg-white p-6 max-lg:w-full xl:max-w-[55.75rem] xl:flex-row xl:p-7 xl:pl-11 2xl:max-w-[64.25rem] 3xl:max-w-[73.5rem] ${
          !data.recommended ? 'max-xl:pt-12' : ''
        }`}
      >
        {data.recommended && (
          <Tag theme="light" className="mb-6 self-end xl:hidden">
            {t('recommended')}
          </Tag>
        )}
        <AirlineSection flight={data} t={t} />
        <FlightSection
          flight={data}
          isDeparture={isDeparture}
          t={t}
          onClickFlightStops={openModal}
        />
        <DetailsSection flight={data} t={t} onClickFlightStops={openModal} />
        <MobileDetailsSection
          flight={data}
          t={t}
          onClickFlightStops={openModal}
        />

        <PriceSection
          flightPrice={data.price}
          recommendedFlightPrice={data.recommendedFlightPrice}
          t={t}
        />
      </RadioOption>
    </>
  )
}
