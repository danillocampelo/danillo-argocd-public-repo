import React, { useEffect, useRef, useState } from 'react'
import { Checkbox } from 'antd'

import styles from './CheckOption.module.css'

type Props = {
  value: string
  children: React.ReactNode
  defaultChecked?: boolean
  disabled?: boolean
  className?: string
  boxClassName?: string
}

export const CheckOption = ({
  value,
  defaultChecked,
  disabled,
  className,
  boxClassName,
  children,
  ...rest
}: Props) => {
  const checkboxRef = useRef<{ input: HTMLInputElement }>(null)

  const [checked, setChecked] = useState(false)

  const onChange = (e: Event) => {
    const target = e.currentTarget as HTMLInputElement
    setChecked(!target.checked)
  }

  useEffect(() => {
    if (checkboxRef.current?.input) {
      checkboxRef.current?.input.addEventListener('change', onChange)
    }
    return () => {
      checkboxRef.current?.input.removeEventListener('change', onChange)
    }
  }, [checkboxRef.current])

  return (
    <div
      className={`relative outline-offset-2 outline-primary transition-all ${
        !checked || disabled
          ? 'shadow-radio-container-unchecked'
          : 'shadow-radio-container-checked'
      }
      ${disabled ? 'bg-gray-20' : 'bg-white'}
      ${className}`}
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'Enter') checkboxRef.current?.input.click()
      }}
    >
      <Checkbox
        className={`${styles['custom-checkbox']} absolute flex appearance-none justify-center ${boxClassName} disabled:shadow-radio-unchecked checked:bg-none checked:hover:bg-primary-pressed`}
        value={value}
        defaultChecked={defaultChecked}
        ref={checkboxRef as any}
        {...rest}
      />
      {children}
    </div>
  )
}
