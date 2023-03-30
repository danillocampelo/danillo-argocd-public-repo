import { Drawer } from 'antd'

import { Themes } from '@utils/constants/theme'
import MenuItem, { Props as MenuItemProps } from './MenuItem'
import { CloseIcon, UserIcon } from '@assets/icons'
import Button from '@components/atoms/Button'
import { useTranslation } from 'next-i18next'
import LinkWithLocale from '@components/atoms/LinkWithLocale'
import { ROUTES } from '@utils/constants/routes'

type Props = {
  isOpen: boolean
  onClose: () => void
  theme: Themes
  items: MenuItemProps[]
}

const SideMenu = ({ isOpen, onClose, theme, items }: Props) => {
  const { t } = useTranslation('common')

  const menuItems = items.map((item) => (
    <MenuItem {...item} key={item.path} className="my-4 justify-center" />
  ))

  const colorStyle =
    theme === 'light'
      ? {
          background: '#fff',
          color: '#10181C',
        }
      : {
          background: '#10181C',
          color: '#fff',
        }

  const paddingStyle = {
    paddingLeft: '1.75rem',
    paddingRight: '1.75rem',
    paddingTop: '1.25rem',
    paddingBottom: '1.25rem',
  }

  return (
    <Drawer
      placement="left"
      onClose={onClose}
      open={isOpen}
      bodyStyle={{ ...colorStyle, alignItems: 'center' }}
      headerStyle={{ ...colorStyle, ...paddingStyle }}
      closeIcon={
        <CloseIcon
          className={`${
            theme === 'light' ? 'text-primary-contrast' : 'text-black-contrast'
          } w-8`}
        />
      }
      width={'100%'}
    >
      {menuItems}
      <div className="flex justify-center pt-8">
        <LinkWithLocale href={ROUTES.signInPage()}>
          <Button
            Icon={UserIcon}
            theme={theme}
            buttonType={'secondary'}
            className="button-small"
            typography="text-paragraph-medium font-bold"
          >
            {t('my-profile')}
          </Button>
        </LinkWithLocale>
      </div>
    </Drawer>
  )
}

export default SideMenu
