import { FunctionComponent } from 'react'
import { Flight } from '@models/Flight'
import { BackArrowIcon, PlaneRightIcon } from '@assets/icons'
import styles from './styles/FlightDetails.module.css'

type Props = {
  flight: Flight
  language: string
}

export const FlightDetails: FunctionComponent<Props> = ({
  flight,
  language,
}) => {
  const formatedDate = new Intl.DateTimeFormat(language, {
    weekday: 'long',
    day: 'numeric',
    month: 'numeric',
  }).format(flight.departureDate)

  return (
    <details className={`${styles.details} w-full cursor-pointer`}>
      <summary className="flex items-center justify-between border-b border-gray-10 py-7 lg:pb-7">
        <div className="flex items-center">
          <p className="font-bold lg:text-h5-desktop">
            {flight.route.from.iata?.name}
          </p>
          <PlaneRightIcon className="mx-4 h-7 w-7" />
          <p className="mr-9 font-bold lg:text-h5-desktop">
            {flight.route.to.iata?.name}
          </p>
          <p className="font-bold capitalize lg:text-h6-desktop">
            {formatedDate}
          </p>
        </div>
        <BackArrowIcon
          className={`rotate-icon w-6 text-gray-90 transition-all duration-300`}
        />
      </summary>

      <p className="py-3">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquam
        sapien eu commodo dictum. Cras quis rutrum diam. Mauris bibendum enim
        vitae nisl cursus feugiat.
      </p>
    </details>
  )
}
