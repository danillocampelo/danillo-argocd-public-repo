import { useState } from 'react'
import { useTranslation } from 'next-i18next'

import { Package } from '@models/Package'
import { Step } from '../../components/BookingController'
import { CheckoutRequiredData } from '../Checkout'
import {
  CheckoutFlights,
  CheckoutReview,
  CheckoutRoadmap,
  CheckoutRooms,
  OriginAccommodation,
} from '../steps'
import { People } from '@views/booking/components/steps/people/People'
import Payment from '@views/booking/components/steps/payment'
import { Booked } from '@views/booking/components/steps/booked'

export const useCheckoutSteps = ({
  packageData,
}: {
  packageData?: Package
}) => {
  const { t } = useTranslation('checkout')

  const [steps, setSteps] = useState<Step<CheckoutRequiredData>[]>(
    [
      {
        title: t('steps.origin-accommodation'),
        content: OriginAccommodation,
        interactable: true,
      },
      {
        title: t('steps.rooms'),
        content: CheckoutRooms,
      },
      {
        title: t('steps.departure-flight'),
        content: CheckoutFlights,
        props: { isDeparture: true },
      },
      {
        title: t('steps.return-flight'),
        content: CheckoutFlights,
      },
      {
        title: t('steps.itinerary'),
        content: CheckoutRoadmap,
        disabled: !packageData?.roadMap?.days.length,
      },
      {
        title: t('steps.people'),
        content: People,
      },
      {
        title: t('steps.review'),
        content: CheckoutReview,
        hideSideMenu: true,
      },
      {
        title: t('steps.payment'),
        content: Payment,
        hideBottomNav: true,
      },
      {
        title: t('steps.booked'),
        content: Booked,
        hideBottomNav: true,
        hideSideMenu: true,
      },
    ].filter((step) => !step.disabled),
  )

  return { steps, setSteps }
}
