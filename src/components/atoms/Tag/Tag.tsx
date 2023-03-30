import React from 'react'
import useMediaQuery from '@hooks/useMediaQuery'

type ThemeOptions = 'light' | 'dark' | 'warn'

type Props = {
  theme?: ThemeOptions
  Icon?: any
  children?: React.ReactNode
  className?: string
}

export const Tag = ({
  children,
  theme = 'light',
  Icon,
  className,
  ...rest
}: Props) => {
  const isMobile = useMediaQuery('(max-width: 768px)')

  const sizeClasses = {
    small: 'px-1 h-6',
    medium: 'px-2 h-7',
  }

  const themeClasses: Record<ThemeOptions, string> = {
    light: 'bg-gray-100 text-black',
    dark: 'bg-black text-white',
    warn: 'bg-orange-100 text-feedback-warning',
  }

  return (
    <div
      className={`fit-content flex items-center whitespace-nowrap rounded-sm text-tag ${
        sizeClasses[isMobile ? 'small' : 'medium']
      } ${themeClasses[theme]} ${className}`}
      {...rest}
    >
      {Icon && <Icon className="w-6" />}
      <span className="px-1">{children}</span>
    </div>
  )
}
