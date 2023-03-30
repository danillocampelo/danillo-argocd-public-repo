import { Radio } from 'antd'
import React, { Dispatch, SetStateAction, useEffect, useRef } from 'react'

import styles from './RadioOption.module.css'

type Props = {
  currentValue: string
  value: string
  children: React.ReactNode
  setCurrentValue?: Dispatch<SetStateAction<string>>
  optional?: boolean
  defaultChecked?: boolean
  disabled?: boolean
  className?: string
  buttonClassName?: string
}

export const RadioOption = ({
  currentValue,
  setCurrentValue,
  value,
  defaultChecked,
  disabled,
  className,
  buttonClassName,
  optional,
  children,
  ...rest
}: Props) => {
  const radioButtonRef = useRef<{ input: HTMLInputElement }>(null)

  const checked = currentValue === value

  const disableIfChecked = () => {
    if (!optional || !setCurrentValue) return

    setCurrentValue((prev) => {
      const checked = prev === value

      if (checked && radioButtonRef.current) {
        radioButtonRef.current.input.checked = false
        return ''
      } else {
        return value
      }
    })
  }

  useEffect(() => {
    if (optional && setCurrentValue) {
      radioButtonRef.current?.input.addEventListener('click', disableIfChecked)
    }

    return () => {
      radioButtonRef.current?.input.removeEventListener(
        'click',
        disableIfChecked,
      )
    }
  }, [])

  return (
    <div
      className={`${
        styles['custom-radio-button']
      } relative outline-offset-2 outline-primary transition-all ${
        !checked || disabled
          ? 'shadow-radio-container-unchecked'
          : 'shadow-radio-container-checked'
      }
      ${disabled ? 'bg-gray-20' : 'bg-white'}
      ${className}`}
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'Enter') radioButtonRef.current?.input.click()
      }}
    >
      <Radio
        className={`absolute flex h-6 w-6 appearance-none justify-center rounded-full  ${buttonClassName} disabled:shadow-radio-unchecked checked:bg-none hover:bg-gray-40 checked:hover:bg-primary-pressed disabled:bg-gray-40`}
        tabIndex={-1}
        value={value}
        defaultChecked={defaultChecked}
        ref={radioButtonRef as any}
        {...rest}
      />
      {children}
    </div>
  )
}
