import React, { FC } from 'react'

import { ContentProps } from '@views/booking/components/BookingController'
import { CheckoutRequiredData } from '../Checkout'
import Review from '@views/booking/components/steps/review'

type Props = ContentProps<CheckoutRequiredData>

export const CheckoutReview: FC<Props> = ({ requiredData, ...rest }) => {
  if (!requiredData.packageAvailability || !requiredData.packageData)
    return null

  const packageAvailability = requiredData.packageAvailability

  return (
    <Review
      packageAvailability={{
        ...packageAvailability,
        roadMap:
          requiredData.packageData.roadMap || packageAvailability.roadMap,
      }}
      {...rest}
    />
  )
}
