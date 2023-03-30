import React, { FC, useMemo } from 'react'

import { CHECKOUT_FORM_INPUT_NAMES } from '@utils/constants/formInputName'
import { useTranslation } from 'next-i18next'
import { FlightOption } from './components/FlightOption'
import { Flight } from '@models/Flight'
import { useCheckoutContext } from '@contexts/CheckoutContext'
import { GenericSectionSelection } from '../../GenericSelectionSection'

type Props = {
  isDeparture?: boolean
  departureFlights: Flight[]
  returnFlights: Omit<Flight, 'keyPairs'>[]
}

export const Flights: FC<Props> = ({
  isDeparture = false,
  departureFlights,
  returnFlights,
}) => {
  const { t } = useTranslation(['checkout', 'common'])
  const { formData } = useCheckoutContext()

  const selectedDepartureFlightID = formData.getDepartureFlightId()

  const getRecommendedFlightPrice = () => {
    if (!departureFlights || !returnFlights) return undefined

    let recommendedFlight

    if (isDeparture)
      recommendedFlight = departureFlights.find((flight) => flight.recommended)
    else recommendedFlight = returnFlights.find((flight) => flight.recommended)

    return recommendedFlight?.price
  }

  const getFlights = () => {
    const mapMissingValues = (flights: Flight[]) =>
      flights.map((flight) => ({
        ...flight,
        recommendedFlightPrice,
      }))

    if (!departureFlights || !returnFlights) return []

    if (isDeparture) {
      return mapMissingValues(departureFlights)
    } else {
      const selectedDepartureFlight = departureFlights.find(
        (flight) => flight.id === selectedDepartureFlightID,
      )
      console.log(selectedDepartureFlight)
      const filteredReturnFlights = returnFlights.filter(
        (returnFlight) =>
          selectedDepartureFlight?.keyPairs![returnFlight.number],
      )

      return mapMissingValues(filteredReturnFlights)
    }
  }

  const recommendedFlightPrice = useMemo(getRecommendedFlightPrice, [
    departureFlights,
    returnFlights,
    isDeparture,
  ])

  const flights = useMemo(getFlights, [
    departureFlights,
    returnFlights,
    isDeparture,
  ])

  return (
    <GenericSectionSelection
      name={
        isDeparture
          ? CHECKOUT_FORM_INPUT_NAMES.departureFlightId
          : CHECKOUT_FORM_INPUT_NAMES.returnFlightId
      }
      title={t('flightSelection.title')}
      ItemOption={FlightOption}
      selectionData={flights || []}
      SubtitleElement={() => (
        <p className="pb-7 pt-4 text-paragraph-medium">
          {t('flightSelection.subtitle')}
        </p>
      )}
    />
  )
}
