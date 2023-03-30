import Link from 'next/link'

import { useContext } from 'react'
import { LocaleContext } from 'src/contexts/LocaleContext'

type Props = {
  children: React.ReactNode
  href: string
  className?: string
  isInternal?: boolean
  target?: string
  rel?: string
}

export const LinkWithLocale = ({
  children,
  href,
  className,
  target,
  isInternal = true,
  rel,
}: Props) => {
  const { locale } = useContext(LocaleContext)

  return (
    <Link href={href} locale={isInternal && locale} target={target} rel={rel}>
      <a
        className={`hover:opacity-70 ${className || ''}`}
        target={target}
        rel={rel}
      >
        {children}
      </a>
    </Link>
  )
}
