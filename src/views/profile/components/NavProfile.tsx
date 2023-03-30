import { LogoIcon } from '@assets/icons'
import Button from '@components/atoms/Button'
import LinkWithLocale from '@components/atoms/LinkWithLocale'
import useMediaQuery from '@hooks/useMediaQuery'
import { ROUTES } from '@utils/constants/routes'
import { Themes } from '@utils/constants/theme'
import { useTranslation } from 'next-i18next'

type Props = {
  theme: Themes
}

const NavProfile = ({ theme }: Props) => {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const { t } = useTranslation('profile-page')
  const useLightTheme = theme === Themes.light

  return (
    <nav
      className={`${
        useLightTheme && 'border-b'
      }relative z-50 w-full border-b border-gray-10 pr-6 pl-2 md:pl-3 lg:px-11`}
    >
      <div className="flex h-14 w-full items-center justify-between">
        <LogoIcon className="w-[100px] md:w-[128px]" />
        {/* <section className={`flex flex-row items-center`}>
          <LinkWithLocale
            href="/"
            className="text-hyperlink-medium font-bold text-gray-60 md:ml-21 md:text-hyperlink-small md:uppercase md:text-black"
          >
            {isMobile ? t('back-in-home-mobile') : t('back-in-home-desktop')}
          </LinkWithLocale>
        </section> */}
        <section className={`flex`}>
          <div className="flex items-center justify-between">
            <Button
              buttonType="secondary"
              className="button-small rounded-sm"
              disabled
              theme={theme}
            >
              {/* TODO: change this link, should move user to login screen */}
              <LinkWithLocale href={ROUTES.logout()}>
                {isMobile
                  ? t('leave-button-mobile')
                  : t('leave-button-desktop')}
              </LinkWithLocale>
            </Button>
          </div>
        </section>
      </div>
    </nav>
  )
}

export default NavProfile
