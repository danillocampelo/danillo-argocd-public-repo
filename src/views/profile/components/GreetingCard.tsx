import { User } from '@models/User'
import { useTranslation } from 'next-i18next'

export const GreetingCard = ({ userData }: { userData: User }) => {
  const { t } = useTranslation('profile-page')

  return (
    <header>
      <h4 className={'font-bold text-black 2xl:text-h2-desktop'}>
        {`${t('user-orders.greeting')}, ${userData.name}`}
      </h4>
      <p className="mt-5 text-paragraph-small font-normal text-gray-90 md:text-h6-desktop md:font-bold 2xl:text-h4-mobile">
        {t('subtitle')}
      </p>
    </header>
  )
}
