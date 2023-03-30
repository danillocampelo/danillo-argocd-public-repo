import React, { FC } from 'react'
import { useTranslation } from 'next-i18next'
import { PeopleIcon } from '@assets/icons'
import { Themes } from '@utils/constants/theme'
import { ROUTES } from '@utils/constants/routes'
import Navbar from '../../molecules/Navbar'
import { NAVBAR_ITEMS } from '../../molecules/Navbar/data/navbarData'
import { useUser } from '@auth0/nextjs-auth0/client'

type Props = {
  children: React.ReactNode
  background?: string
}

export const MainLayout: FC<Props> = ({
  children,
  background = 'bg-black',
}) => {
  const { t } = useTranslation('common')
  const { user } = useUser()
  const link = user ? ROUTES.profile() : ROUTES.signInPage()
  const title = user ? t('my-profile') : t('login')

  const items = [
    {
      icon: PeopleIcon,
      title: title,
      href: link,
    },
  ]
  return (
    <main className={background}>
      <Navbar theme={Themes.dark} buttons={items} items={NAVBAR_ITEMS} />
      {children}
    </main>
  )
}
