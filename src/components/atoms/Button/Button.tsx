import React, { ComponentClass, FunctionComponent } from 'react'
import { Themes } from '@utils/constants/theme'
import PrimaryButton from './components/PrimaryButton'
import SecondaryButton from './components/SecondaryButton'
import TertiaryButton from './components/TertiaryButton'
import QuaternaryButton from './components/QuaternaryButton'

export type ButtonTypes = 'primary' | 'secondary' | 'tertiary' | 'quaternary'

export type Size = 'extra-small' | 'small' | 'regular'

export type Icon =
  | string
  | FunctionComponent<{ width: number; height: number }>
  | ComponentClass<{ width: number; height: number }, any>

export interface TypedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  theme: Themes
  children?: React.ReactNode
}

export interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType: ButtonTypes
  children?: React.ReactNode
  Icon?: Icon
  theme?: Themes
  typography?: string
  className?: string
  htmlType?: 'submit' | 'button' | 'reset'
  reverseIcon?: boolean
  hideTextOnMobile?: boolean
}

const Button = ({
  buttonType,
  children,
  Icon,
  theme = Themes.light,
  className = 'button-regular',
  typography = 'text-button',
  reverseIcon = false,
  hideTextOnMobile = false,
  ...ButtonProps
}: Props) => {
  const defaultClass = `flex items-center justify-center whitespace-nowrap`

  const iconPositionClass = Icon
    ? reverseIcon
      ? hideTextOnMobile
        ? 'xl:has-right-icon'
        : 'has-right-icon'
      : hideTextOnMobile
      ? 'has-left-icon'
      : 'xl:has-left-icon'
    : ''

  const TypedButton = ({ theme, className, children }: TypedButtonProps) => {
    switch (buttonType) {
      case 'primary':
        return (
          <PrimaryButton theme={theme} {...ButtonProps} className={className}>
            {children}
          </PrimaryButton>
        )
      case 'secondary':
        return (
          <SecondaryButton theme={theme} {...ButtonProps} className={className}>
            {children}
          </SecondaryButton>
        )
      case 'tertiary':
        return (
          <TertiaryButton theme={theme} {...ButtonProps} className={className}>
            {children}
          </TertiaryButton>
        )
      case 'quaternary':
        return (
          <QuaternaryButton
            theme={theme}
            {...ButtonProps}
            className={className}
          >
            {children}
          </QuaternaryButton>
        )
    }
  }

  return (
    <TypedButton
      theme={theme}
      className={`${defaultClass} ${typography} ${className} ${
        reverseIcon ? 'flex-row-reverse' : ''
      } ${iconPositionClass}`}
      {...ButtonProps}
    >
      {Icon && <Icon width={24} height={24} />}
      {children && (
        <span className={`${hideTextOnMobile ? 'hidden lg:block' : ''}`}>
          {children}
        </span>
      )}
    </TypedButton>
  )
}

export default Button
