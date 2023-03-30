import React, { FC } from 'react'

import { CheckoutRequiredData } from '../Checkout'
import { ContentProps } from '@views/booking/components/BookingController'
import Flights from '@views/booking/components/steps/flights'

type Props = {
  isDeparture?: boolean
} & ContentProps<CheckoutRequiredData>

export const CheckoutFlights: FC<Props> = ({
  isDeparture = false,
  requiredData,
}) => {
  if (!requiredData.packageAvailability) return null

  return (
    <Flights
      isDeparture={isDeparture}
      returnFlights={requiredData?.packageAvailability.returnFlights}
      departureFlights={requiredData?.packageAvailability.departureFlights}
    />
  )
}
