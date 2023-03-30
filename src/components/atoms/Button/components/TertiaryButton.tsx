import React from 'react'
import { Themes } from '@utils/constants/theme'
import { TypedButtonProps } from '../Button'

const TertiaryButton = ({
  children,
  theme = Themes.light,
  className,
  ...ButtonProps
}: TypedButtonProps) => {
  const typeClasses = `bg-transparent text-primary border border-transparent active:border-primary disabled:border-transparent`

  const themeClasses = {
    light:
      'hover:text-primary-contrast active:text-primary-contrast disabled:text-gray-60',
    dark: 'hover:text-white active:text-white disabled:text-gray-40',
  }

  return (
    <button
      className={`${typeClasses} ${themeClasses[theme]} ${
        className ? className : ''
      }`}
      {...ButtonProps}
    >
      {children}
    </button>
  )
}

export default TertiaryButton
