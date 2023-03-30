import { Metainfo } from '@models/Metainfo'
import { useTranslation } from 'next-i18next'

const { t } = useTranslation('about-page')

export const SERVICES_LIST: Metainfo[] = [
  {
    title: t('check-in-priority-title'),
    icon: { id: '1', src: 'airplane-ticket' },
    description: t('check-in-priority-description'),
  },
  {
    title: t('personal-concierge-title'),
    icon: { id: '1', src: 'room-service' },
    description: t('personal-concierge-description'),
  },
  {
    title: t('consultative-sales-title'),
    icon: { id: '1', src: 'handshake' },
    description: t('consultative-sales-description'),
  },
  {
    title: t('free-baggage-title'),
    icon: { id: '1', src: 'redeem' },
    description: t('free-baggage-description'),
  },
  {
    title: t('vip-access-title'),
    icon: { id: '1', src: 'chair' },
    description: t('vip-access-description'),
  },
  {
    title: t('gather-miles-title'),
    icon: { id: '1', src: 'chair' },
    description: t('gather-miles-description'),
  },
]
