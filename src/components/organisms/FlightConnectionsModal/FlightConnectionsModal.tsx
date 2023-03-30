import Circle from '@components/atoms/Circle'
import Divider from '@components/atoms/Divider'
import { Flight, FlightType } from '@models/Flight'
import { convertMinToHourMin, getTimeHourMinDiff } from '@utils/time'
import { Modal } from 'antd'
import dayjs, { Dayjs } from 'dayjs'
import { TFunction, useTranslation } from 'next-i18next'
import { FC } from 'react'
import FlightConnectionCard from '../../molecules/FlightConnectionCard'

type Props = {
  flight: Flight
  isOpen: boolean
  setIsOpen: (value: boolean) => void
}

type MapperProps = {
  currentFlight: Flight
  index: number
  timeDiff: string
  arrayLength: number
  t: TFunction
}

const formatMinutes = (time: number) => {
  const { hours, minutes } = convertMinToHourMin(time)
  return `${hours}h${minutes}`
}

const getFormattedTimeDiff = (
  arrivalDate: Date,
  nextFlightDepartureDate: Dayjs,
) => {
  const { hours, minutes } = getTimeHourMinDiff(
    dayjs(arrivalDate),
    nextFlightDepartureDate,
  )

  return `${hours}h${minutes.toString().padStart(2, '0')}`
}

const ScreenMapper: FC<MapperProps> = ({
  currentFlight,
  index,
  timeDiff,
  arrayLength,
  t,
}) => (
  <section key={index}>
    <div className="flex flex-row justify-center">
      <span className="flex flex-col justify-center">
        <Divider
          isHorizontal={false}
          className={`ml-2 ${
            index == 0 ? 'border-white' : 'border-gray-40'
          } h-full `}
        />
        <Circle />
        <Divider
          isHorizontal={false}
          className={`ml-2 ${
            index == arrayLength - 1 ? 'border-white' : 'border-gray-40'
          } h-full`}
        />
      </span>
      <FlightConnectionCard style={''} flight={currentFlight} />
    </div>
    <div
      className={`${
        index == arrayLength - 1 ? `hidden` : `flex`
      } flex flex-row items-center`}
    >
      <Circle />
      <p className={'text-paragraph-medium'}>{`${t(
        'connection',
      )} ${timeDiff}`}</p>
    </div>
  </section>
)

const FlightConnectionsModal: FC<Props> = ({ flight, isOpen, setIsOpen }) => {
  const { t } = useTranslation('common')

  if (!flight.scales) {
    return null
  }

  const flights = [flight, ...flight.scales]
  const totalDuration = formatMinutes(
    flights.reduce(function (accumulator: number, currentValue) {
      return accumulator + currentValue.duration
    }, 0),
  )

  return (
    <Modal
      width={933}
      className="px-6 pt-4 pb-7"
      open={isOpen}
      onCancel={() => setIsOpen(false)}
      centered
      closable
      footer={null}
    >
      <article className="mb-6 flex flex-col">
        <h5 className="pb-2 font-bold text-black">
          {flight.type == FlightType.DEPART
            ? t('flight-connections.departure-details')
            : t('flight-connections.return-details')}
        </h5>
        <p className="font-normal text-black">
          {t('flight-connections.total-duration')} {totalDuration}
        </p>
        {flights.map((scale, index) => {
          const nextFlightDeparture =
            index != flights.length
              ? dayjs(flights[index + 1]?.departureDate)
              : dayjs()

          const timeDiff = getFormattedTimeDiff(
            scale.arrivalDate,
            nextFlightDeparture,
          )
          return (
            <ScreenMapper
              currentFlight={scale}
              index={index}
              timeDiff={timeDiff}
              arrayLength={flights.length}
              key={index}
              t={t}
            />
          )
        })}
      </article>
    </Modal>
  )
}

export default FlightConnectionsModal
