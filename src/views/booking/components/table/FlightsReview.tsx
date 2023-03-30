import React, { FC, useContext } from 'react'
import { Flight, FlightType } from '@models/Flight'
import { LandingIcon, PlaneUpIcon, TakeoffIcon } from '@assets/icons'
import { convertToCurrency } from '@utils/currency'
import { calculateTotalFares } from '@utils/calculateTotalPrice'
import { useTranslation } from 'next-i18next'
import { LocaleContext } from '@contexts/LocaleContext'
import dayjs from 'dayjs'

type Props = {
  flights: Flight[]
}

export const FlightsReview: FC<Props> = ({ flights }) => {
  const { t } = useTranslation(['checkout', 'common'])
  const { locale } = useContext(LocaleContext)

  return (
    <section className="flex flex-col gap-8 xl:flex-row 2xl:gap-13">
      {flights.map((flight, index) => {
        const isFlightDepart = FlightType.DEPART === flight.type

        return (
          <div key={index} className="flex flex-col">
            <strong className="mb-3 flex text-paragraph-medium font-bold xl:text-h5-mobile">
              {isFlightDepart ? (
                <TakeoffIcon className="mr-2" />
              ) : (
                <LandingIcon className="mr-2" />
              )}
              {`${t(
                `${
                  isFlightDepart
                    ? 'flightSelection.departure-ticket'
                    : 'flightSelection.return-ticket'
                }`,
              )}`}
            </strong>
            <div className="flex max-xl:flex-col xl:items-center">
              <div className="flex">
                <span className="text-paragraph-medium xl:text-h5-mobile xl:font-light">
                  {flight.route.from.iata?.name}
                </span>
                <PlaneUpIcon className="mx-3 h-6 w-6 text-primary-pressed xl:mx-2 xl:mt-1 xl:h-6 xl:w-6" />
                <span className="text-paragraph-medium xl:text-h5-mobile xl:font-light">
                  {flight.route.to.iata?.name}
                </span>
              </div>
              <time className="mt-1 text-paragraph-small capitalize md:mt-0 xl:ml-3 xl:text-paragraph-medium xl:font-normal 2xl:text-h5-mobile">
                {dayjs(flight.departureDate)
                  .locale(locale)
                  .format('dddd, DD MMM, YYYY')}
              </time>
            </div>
          </div>
        )
      })}
      <div>
        <span className="mb-2 text-paragraph-medium font-bold xl:text-h5-mobile">
          {t('table.operator')}
        </span>
        <p className="text-paragraph-small text-gray-80 md:mt-3 xl:text-paragraph-medium">
          {flights[0].airline.name}
        </p>
      </div>
      <div>
        <span className="mb-2 text-paragraph-medium font-bold xl:text-h5-mobile">
          {t('table.total-ticket-value')}
        </span>
        <p className="text-paragraph-small text-gray-80 md:mt-3 xl:text-paragraph-medium">
          {convertToCurrency({
            rawNumber: calculateTotalFares(flights),
            currency: flights[0].price.currency,
            locale,
          })}
        </p>
      </div>
    </section>
  )
}
