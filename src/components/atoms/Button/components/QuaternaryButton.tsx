import React from 'react'
import { Themes } from '@utils/constants/theme'
import { TypedButtonProps } from '../Button'

const QuaternaryButton = ({
  children,
  theme = Themes.light,
  className,
  ...ButtonProps
}: TypedButtonProps) => {
  const typeClasses =
    'bg-pink-100 text-black border border-transparent  hover:text-white hover:bg-primary-hover active:bg-primary-pressed active:text-white'

  const themeClasses = {
    light: 'disabled:bg-gray-10 disabled:text-gray-80',
    dark: 'disabled:bg-gray-90 disabled:text-gray-20',
  }

  return (
    <button
      className={`${typeClasses} ${themeClasses[theme]} ${className}`}
      {...ButtonProps}
    >
      {children}
    </button>
  )
}

export default QuaternaryButton
