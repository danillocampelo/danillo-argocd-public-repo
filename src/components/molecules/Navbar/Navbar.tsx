import React, { FC, useState } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { Themes } from '@utils/constants/theme'
import useMediaQuery from '@hooks/useMediaQuery'
import { LogoIcon, MenuIcon, UserIcon } from '@assets/icons'
import MenuItem from './components/MenuItem'
import LinkWithLocale from '@components/atoms/LinkWithLocale'
import Button from '@components/atoms/Button'
import { Icon } from '@components/atoms/Button/Button'
import SideMenu from './components/SideMenu'
import { ROUTES } from '@utils/constants/routes'
import { useUser } from '@auth0/nextjs-auth0/client'

export type MenuItemData = {
  key: string
  isActive: boolean
  path: string
  title: string
  theme: Themes
}

export type NavbarButton = {
  icon: Icon
  title?: string
  href: string
  target?: string
  rel?: string
}

export type Props = {
  theme?: Themes
  solid?: boolean
  items?: { title: string; path: string }[]
  buttons: NavbarButton[]
  useDefaultMobileButtons?: boolean
}

const Navbar: FC<Props> = ({
  theme = Themes.light,
  solid = true,
  items = [],
  buttons,
  useDefaultMobileButtons = true,
}) => {
  const { t } = useTranslation('common')
  const router = useRouter()
  const activePath = router.pathname
  const isLightTheme = theme === Themes.light
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user } = useUser()
  const link = user ? ROUTES.profile() : ROUTES.login()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const MenuItemsData: MenuItemData[] = items.map((item) => ({
    key: `${item.title}-${item.path}`,
    isActive: activePath === item.path,
    path: item.path,
    title: t(item.title),
    theme,
  }))

  return (
    <nav
      className={`
         ${
           isLightTheme
             ? 'border-b border-b-black text-black'
             : 'border-b border-b-gray-80 text-white'
         }
        ${
          solid
            ? 'bg-primary-contrast'
            : 'bg-gradient-to-b from-primary-contrast to-transparent'
        }
        sticky top-0 z-50 flex w-full items-center justify-between px-6 py-2 md:h-[88px] xl:px-11`}
    >
      <SideMenu
        isOpen={isMenuOpen}
        onClose={toggleMenu}
        theme={theme}
        items={MenuItemsData}
      />
      {useDefaultMobileButtons && (
        <Button
          onClick={toggleMenu}
          Icon={MenuIcon}
          theme={theme}
          buttonType={'tertiary'}
          className="button-small lg:hidden"
        />
      )}
      <LinkWithLocale href={ROUTES.home()}>
        <LogoIcon className="w-auto md:ml-4 md:mr-[44px] md:w-[125px]" />
      </LinkWithLocale>
      {useDefaultMobileButtons && (
        <LinkWithLocale href={link}>
          <Button
            Icon={UserIcon}
            theme={theme}
            buttonType={'tertiary'}
            className="button-small lg:hidden"
          />
        </LinkWithLocale>
      )}
      <section
        className={`${
          useDefaultMobileButtons ? 'hidden lg:flex' : 'flex'
        } grow justify-start`}
      >
        {MenuItemsData.map((item) => (
          <MenuItem {...item} key={item.key} />
        ))}
      </section>
      <section
        className={`${useDefaultMobileButtons ? 'hidden lg:flex' : 'flex'}`}
      >
        <div className="flex items-center justify-between gap-[20px]">
          {buttons.map((obj) => (
            <LinkWithLocale
              href={obj.href}
              key={`${obj.title}-${obj.href}`}
              target={obj.target}
              rel={obj.rel}
            >
              <Button
                Icon={obj.icon}
                theme={theme}
                buttonType={'secondary'}
                className="button-small"
                typography="flex text-paragraph-medium text-white font-bold uppercase"
                hideTextOnMobile
              >
                {obj.title}
              </Button>
            </LinkWithLocale>
          ))}
        </div>
      </section>
    </nav>
  )
}

export default Navbar
