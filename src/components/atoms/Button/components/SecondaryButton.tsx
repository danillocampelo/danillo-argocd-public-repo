import React from 'react'
import { Themes } from '@utils/constants/theme'
import { TypedButtonProps } from '../Button'

const SecondaryButton = ({
  children,
  theme = Themes.light,
  className,
  ...ButtonProps
}: TypedButtonProps) => {
  const typeClasses = `bg-transparent border`

  const themeClasses = {
    light:
      'text-primary-contrast border-gray-60 rounded-sm hover:border-primary-contrast active:bg-gray-10 disabled:bg-gray-10 disabled:text-gray-80 disabled:border-transparent',
    dark: `text-white border-gray-60 rounded-sm  hover:border-white active:bg-gray-90 active:border-white disabled:bg-gray-90 disabled:text-gray-20 disabled:border-gray-60`,
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

export default SecondaryButton
