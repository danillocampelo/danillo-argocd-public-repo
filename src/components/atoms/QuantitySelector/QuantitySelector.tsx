import React from 'react'
import { MinusIcon, PlusIcon } from '@assets/icons'
import { Form, InputNumber } from 'antd'

import styles from './QuantitySelector.module.css'
import { useCheckoutContext } from '@contexts/CheckoutContext'

export type Props = {
  name: string | number | (string | number)[]
  listName?: string
  initialQuantity?: number
  minQuantity?: number
  maxQuantity?: number
  incrementAriaLabel: string
  decrementAriaLabel: string
  onDecrement?: () => void
  onIncrement?: () => void
}

export const QuantitySelector = ({
  name,
  listName,
  minQuantity = 0,
  initialQuantity = minQuantity,
  maxQuantity,
  incrementAriaLabel,
  decrementAriaLabel,
  onDecrement,
  onIncrement,
  ...rest
}: Props) => {
  const { formInstance, triggerRender } = useCheckoutContext()

  const onChange = (action?: 'decrement' | 'increment') => {
    const currentValue = formInstance.getFieldValue(getFieldPath())

    if (currentValue === undefined || currentValue === null) {
      formInstance.setFieldValue(getFieldPath(), minQuantity)
      return
    }

    if (action === 'decrement' && currentValue - 1 >= minQuantity) {
      formInstance.setFieldValue(getFieldPath(), currentValue - 1)
      onDecrement && onDecrement()
      triggerRender()
    } else if (
      action === 'increment' &&
      (maxQuantity === undefined || currentValue + 1 <= maxQuantity)
    ) {
      formInstance.setFieldValue(getFieldPath(), currentValue + 1)
      onIncrement && onIncrement()
      triggerRender()
    }
  }

  const getFieldPath = () => {
    if (!listName) {
      return name
    }

    if (Array.isArray(name)) {
      return [listName, ...name]
    }

    return [listName, name]
  }

  return (
    <div className="flex h-9 items-center border-2 border-gray-20 lg:w-19 2xl:h-11 2xl:w-[9.25rem]">
      <button
        type="button"
        data-testid="decrement-button"
        aria-label={decrementAriaLabel}
        className="p-[0.375rem] outline-primary hover:text-primary-hover active:text-primary-pressed md:p-[0.625rem] md:py-[0.875rem]"
        onClick={() => onChange('decrement')}
      >
        <MinusIcon className="w-7" />
      </button>
      <Form.Item name={name} initialValue={initialQuantity} noStyle {...rest}>
        <InputNumber
          data-testid="quantity-selector"
          className={`pointer-events-none mx-1 flex h-6 w-6 select-none items-center justify-center text-center md:h-[2.75rem] md:w-[2.75rem] ${styles['custom-quantity-selector']}`}
          min={minQuantity}
          max={maxQuantity}
          bordered={false}
          controls={false}
        />
      </Form.Item>
      <button
        type="button"
        data-testid="increment-button"
        aria-label={incrementAriaLabel}
        className="p-[0.375rem] outline-primary hover:text-primary-hover active:text-primary-pressed md:p-[0.625rem] md:py-[0.875rem]"
        onClick={() => onChange('increment')}
      >
        <PlusIcon className="w-7" />
      </button>
    </div>
  )
}
