import LinkWithLocale from 'src/components/atoms/LinkWithLocale'
import { FooterDataProps } from './MenuItems'

export const MenuSubitems = ({ isExternalLink, subitems }: FooterDataProps) => {
  return (
    <>
      {subitems.map((item) => (
        <LinkWithLocale
          className="text-xl flex font-secondary font-medium text-black text-opacity-60"
          isInternal={!isExternalLink}
          href={item.link}
          key={item.title}
        >
          {item.icon ? <item.icon /> : item.title}
        </LinkWithLocale>
      ))}
    </>
  )
}
