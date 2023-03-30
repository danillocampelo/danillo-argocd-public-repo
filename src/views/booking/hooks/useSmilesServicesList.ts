import { Metainfo } from '@models/Metainfo'
import { useTranslation } from 'next-i18next'

export const useSmilesServicesList = (): Metainfo[] => {
  const { t } = useTranslation('checkout')

  const servicesList = t('booked.services', { returnObjects: true }) as {
    title: string
    description: string
    icon: string
  }[]

  return servicesList.map((service) => ({
    ...service,
    icon: {
      id: service.icon,
    },
  }))
}
