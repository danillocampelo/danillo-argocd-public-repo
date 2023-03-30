import React from 'react'

import { ContentProps } from '@views/booking/components/BookingController'
import { CheckoutRequiredData } from '../Checkout'
import Rooms from '@views/booking/components/steps/rooms'

export const CheckoutRooms = ({
  requiredData,
}: ContentProps<CheckoutRequiredData>) => {
  if (!requiredData.packageAvailability) return null

  return <Rooms hotels={requiredData.packageAvailability.hotels} />
}
