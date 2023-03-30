import { FunctionComponent } from 'react'
import { useTranslation } from 'next-i18next'
import { InformationItemProps } from 'src/components/atoms/InformationItem'
import { Information } from 'src/models/Information'
import InformationGrid from 'src/components/molecules/InformationGrid/InformationGrid'

export const ServicesSection: FunctionComponent = () => {
  const { t } = useTranslation('about-page')

  const SERVICES_LIST: Information[] = [
    {
      title: t('check-in-priority-title'),
      icon: 'airplane-ticket',
      description: t('check-in-priority-description'),
    },
    {
      title: t('personal-concierge-title'),
      icon: 'room-service',
      description: t('personal-concierge-description'),
    },
    {
      title: t('consultative-sales-title'),
      icon: 'handshake',
      description: t('consultative-sales-description'),
    },
    {
      title: t('free-baggage-title'),
      icon: 'redeem',
      description: t('free-baggage-description'),
    },
    {
      title: t('vip-access-title'),
      icon: 'chair',
      description: t('vip-access-description'),
    },
    {
      title: t('gather-miles-title'),
      icon: 'chair',
      description: t('gather-miles-description'),
    },
  ]

  const informationItems: InformationItemProps[] = SERVICES_LIST.map(
    (info) => ({
      title: {
        content: info.title,
        classes: 'text-white',
      },
      description: {
        content: info.description,
        classes: 'text-gray',
      },
      icon: {
        name: info.icon,
        classes: 'text-white',
      },
    }),
  )

  const titleProps = {
    content: t('new-way-to-travel'),
    classes: 'text-white md:text-h1-mobile text-h3-mobile font-light',
  }

  return (
    <InformationGrid
      title={titleProps}
      gridProps={{ classes: 'md:grid-cols-4 grid-cols-1' }}
      informationItems={informationItems}
    />
  )
}
