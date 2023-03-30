import { useTranslation } from 'next-i18next'
import { MenuSubitems } from './MenuSubitems'

export type SubItemProps = {
  title: string
  link: string
  icon?: any
}

export type FooterDataProps = {
  title: string
  isExternalLink?: boolean
  subitems: SubItemProps[]
}

const MenuItems = (card: FooterDataProps) => {
  const { t } = useTranslation('footer')

  return (
    <div className="container flex h-auto flex-1 flex-col">
      <section className="text-3xl flex font-primary font-medium text-black">
        {card.title}
      </section>
      <nav
        className={`flex gap-4 pt-8 ${
          card.title == t('social-networks') ? 'flex-row' : 'flex-col'
        }`}
      >
        <MenuSubitems {...card} />
      </nav>
    </div>
  )
}

export default MenuItems
