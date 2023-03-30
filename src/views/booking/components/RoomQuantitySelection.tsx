import React, { FC } from 'react'
import { useTranslation } from 'next-i18next'

import { RoomIcon } from '@assets/icons'
import { QuantitySelector } from '@components/atoms/QuantitySelector'
import { RoomQuantities } from './RoomQuantities'
import { Form } from 'antd'
import { CHECKOUT_FORM_INPUT_NAMES } from '@utils/constants/formInputName'
import { useCheckoutContext } from '@contexts/CheckoutContext'
import { generateNewAccommodationRow } from '@utils/generateNewAccommodationRow'

export type RoomQuantity = {
  id: string
  adults: number
  children: number
  babies: number
}

export const RoomQuantitySelection: FC = () => {
  const { t } = useTranslation(['checkout', 'common'])

  const { formData, triggerRender } = useCheckoutContext()

  let addRow: (value: any) => void
  let removeRow: (index: number) => void
  let rows = []

  return (
    <section>
      <h5 className="mb-8 font-bold">{t('roomQuantitySelection.title')}</h5>
      <div className="flex max-w-[73.3125rem] select-none flex-col gap-6 border p-7 text-gray-90 md:gap-7">
        <div className="flex w-full justify-between">
          <div className="max-md:pr-2">
            <span className="flex items-center">
              <RoomIcon className="w-6 md:w-7" />
              <h6 className="inline pl-1 text-paragraph-medium font-bold md:text-h6-desktop">
                {t('roomQuantitySelection.rooms')}
              </h6>
            </span>
            <p className="pt-1 pl-1 text-paragraph-small text-gray-60 md:pt-3 md:pl-7 2xl:text-paragraph-medium">
              {t('roomQuantitySelection.defineQuantity')}
            </p>
          </div>
          <div>
            <QuantitySelector
              name={CHECKOUT_FORM_INPUT_NAMES.numberOfRooms}
              minQuantity={1}
              incrementAriaLabel={t('roomQuantitySelection.addedAriaLabel', {
                added: t('roomQuantitySelection.room'),
              })}
              decrementAriaLabel={t('roomQuantitySelection.removedAriaLabel', {
                removed: t('roomQuantitySelection.room'),
              })}
              onDecrement={() => {
                removeRow(rows.length - 1)
                triggerRender()
              }}
              onIncrement={() => {
                addRow(generateNewAccommodationRow())
                triggerRender()
              }}
            />
          </div>
        </div>
        <Form.List
          name={CHECKOUT_FORM_INPUT_NAMES.roomQuantities}
          initialValue={
            formData.getRoomsQuantities() || [generateNewAccommodationRow()]
          }
        >
          {(quantitiesFields, { add, remove }) => {
            addRow = add
            removeRow = remove
            rows = quantitiesFields

            return (
              <RoomQuantities
                quantitiesFields={quantitiesFields}
                remove={remove}
              />
            )
          }}
        </Form.List>
      </div>
    </section>
  )
}
