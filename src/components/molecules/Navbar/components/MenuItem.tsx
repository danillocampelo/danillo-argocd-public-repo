import LinkWithLocale from 'src/components/atoms/LinkWithLocale'
import { Themes } from 'src/utils/constants/theme'

export type Props = {
  isActive?: boolean
  path: string
  title: string
  theme: Themes
  className?: string
}

const MenuItem = ({ isActive, path, title, theme, className }: Props) => {
  const defaultClass = `flex text-paragraph-medium mx-4 lg:mx-5 py-1 px-2 items-center`
  const customClasses = {
    dark: `bg-opacity-0 text-white`,
    light: `-mb-0.5 text-black`,
  }
  const activeClass = `border-primary border-b-2 font-bold`

  return (
    <LinkWithLocale
      href={path}
      className={`${defaultClass} ${customClasses[theme]} ${
        isActive && activeClass
      } ${className}`}
    >
      {title}
    </LinkWithLocale>
  )
}

export default MenuItem

MenuItem.defaultProps = {
  isActive: false,
}
