import { AirplaneIcon, LandingIcon } from '@assets/icons'
import { Flight } from '@models/Flight'
import { getFormattedDate } from '@utils/formatDate'
import { convertMinToHourMin, getTimeHourMin } from '@utils/time'
import dayjs, { locale } from 'dayjs'
import { useTranslation } from 'next-i18next'
import { useContext } from 'react'
import { LocaleContext } from '@contexts/LocaleContext'

const formatMinutes = (time: number) => {
  const { hours, minutes } = convertMinToHourMin(time)
  return `${hours}h${minutes}`
}

const FlightConnectionCard = ({
  flight,
  style,
}: {
  flight: Flight
  style: string
}) => {
  const duration = formatMinutes(flight.duration)
  const { t } = useTranslation('common')
  const { locale } = useContext(LocaleContext)

  return (
    <section
      className={`my-4 flex w-full flex-col justify-center gap-3 border border-gray-20 px-6 py-3 md:flex-row md:gap-7 md:py-6 md:px-7 ${style}`}
    >
      <div className="flex flex-row justify-center gap-7">
        <div className="flex flex-col items-center justify-start gap-2">
          <p className="text-paragraph-medium font-bold">
            {flight.route.from.iata?.name}
          </p>
          <p className=" text-paragraph-small text-gray-60">
            {`${flight.route.from.city.name}, ${flight.route.from.state.uf}`}
          </p>
          <span className="flex flex-row gap-2">
            <LandingIcon className={'h-5 w-5'} />
            {getTimeHourMin(dayjs(flight.departureDate))}
          </span>
        </div>
        <AirplaneIcon
          className={'h-5 w-5 rotate-90 self-center text-primary'}
        />
        <div className="flex flex-col items-center justify-start gap-2">
          <p className="text-paragraph-medium font-bold">
            {flight.route.to.iata?.name}
          </p>
          <p className=" text-paragraph-small text-gray-60">
            {`${flight.route.to.city.name}, ${flight.route.to.state.uf}`}
          </p>
          <span className="flex flex-row gap-2">
            <LandingIcon className={'h-5 w-5'} />
            {getTimeHourMin(dayjs(flight.arrivalDate))}
          </span>
        </div>
      </div>
      <div className="flex flex-row items-center justify-center gap-6 border-dotted border-black max-md:border-t max-md:pt-3 md:flex-col md:items-start md:justify-start">
        <small className="font-secondary text-tag font-normal uppercase text-gray-60">
          {t('flight-connections.flight')}
        </small>
        <b className="text-paragraph-medium font-bold text-black">
          {flight.number}
        </b>
        <span className="flex flex-row gap-1 text-caption text-[0.75rem] text-black">
          <small>{t('flight-connections.operator')} </small>
          <b className="font-bold uppercase">{flight.airline.name}</b>
        </span>
      </div>
      <div className="hidden flex-col items-start justify-start gap-2 md:flex">
        <p className="font-secondary text-tag font-normal uppercase text-gray-60">
          {t('flight-connections.duration')}
        </p>
        <b className="text-paragraph-medium font-bold text-black">{duration}</b>
      </div>
      <div className="hidden flex-col items-start justify-start gap-2 md:flex">
        <small className="font-secondary text-tag font-normal uppercase text-gray-60">
          {t('flight-connections.boarding-date')}
        </small>
        <b className="text-paragraph-medium font-bold text-black">
          {getFormattedDate(flight.departureDate, locale)}
        </b>
      </div>
    </section>
  )
}

export default FlightConnectionCard
