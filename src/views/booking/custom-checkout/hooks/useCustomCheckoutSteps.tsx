import { useState } from 'react'
import { useTranslation } from 'next-i18next'
import { Step } from '@views/booking/components/BookingController'
import { Hotels, OriginTravellers, Tours } from '../steps'
import { CheckoutRooms } from '@views/booking/checkout/steps'

export const useCustomCheckoutSteps = () => {
  const { t } = useTranslation(['custom-checkout', 'checkout'])

  const [steps, setSteps] = useState<Step<any>[]>([
    {
      title: t('steps.origin-and-travellers'),
      content: OriginTravellers,
      validateOnMount: true,
    },
    {
      title: t('steps.hotel'),
      content: Hotels,
    },
    {
      title: t('checkout:steps.rooms'),
      content: CheckoutRooms,
    },
    {
      title: t('checkout:steps.departure-flight'),
      content: () => <></>,
    },
    {
      title: t('checkout:steps.return-flight'),
      content: () => <></>,
    },
    {
      title: t('steps.tours'),
      content: Tours,
    },
    {
      title: t('checkout:steps.people'),
      content: () => <></>,
    },
    {
      title: t('checkout:steps.review'),
      content: () => <></>,
    },
    {
      title: t('checkout:steps.payment'),
      content: () => <></>,
    },
    {
      title: t('checkout:steps.booked'),
      content: () => <></>,
    },
  ])

  return { steps, setSteps }
}
