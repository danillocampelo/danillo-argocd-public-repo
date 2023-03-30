import React, { FC } from 'react'
import { useTranslation } from 'next-i18next'

import { TrashIcon } from '@assets/icons'
import { AgeBasedQuantity } from './AgeBasedQuantities'
import Collapse from '@components/atoms/Collapse'
import { Button, Divider } from '@components/index'
import { Panel } from '@components/atoms/Collapse/Collapse'
import { FormListFieldData } from 'antd'
import { CHECKOUT_FORM_INPUT_NAMES } from '@utils/constants/formInputName'
import { useCheckoutContext } from '@contexts/CheckoutContext'

type Props = {
  quantitiesFields: FormListFieldData[]
  remove: (index: number | number[]) => void
}

export type AgeQuantity = {
  objectKey: 'adults' | 'children' | 'babies'
  title: string
  ageDescription: string
  iconKey: string
  minQuantity?: number
}

export const RoomQuantities: FC<Props> = ({ quantitiesFields, remove }) => {
  const { t } = useTranslation(['checkout', 'common'])
  const { formInstance, triggerRender } = useCheckoutContext()

  const ageQuantities: AgeQuantity[] = [
    {
      objectKey: 'adults',
      title: t('roomQuantitySelection.adults'),
      ageDescription: t('roomQuantitySelection.adultsAge', { minYears: 12 }),
      iconKey: 'people',
      minQuantity: 1,
    },
    {
      objectKey: 'children',
      title: t('roomQuantitySelection.children'),
      ageDescription: t('roomQuantitySelection.childrenAge', {
        minYears: 2,
        maxYears: 11,
      }),
      iconKey: 'child',
    },
    {
      objectKey: 'babies',
      title: t('roomQuantitySelection.babies'),
      ageDescription: t('roomQuantitySelection.babiesAge', {
        minMonths: 0,
        maxMonths: 23,
      }),
      iconKey: 'baby',
    },
  ]

  const onRemoveRoom = (index: number) => {
    remove(index)
    formInstance.setFieldValue(
      CHECKOUT_FORM_INPUT_NAMES.numberOfRooms,
      formInstance.getFieldValue(CHECKOUT_FORM_INPUT_NAMES.numberOfRooms) - 1,
    )
    triggerRender()
  }

  const MobileGuestQuantities = () => (
    <Collapse className="flex flex-col rounded-none border-0 text-paragraph-medium font-bold lg:hidden">
      {quantitiesFields.map((field, index) => (
        <>
          <Divider className="mt-6 first:mt-0" />
          <Panel
            header={`${t('roomQuantitySelection.room')} ${index + 1}`}
            key={field.key}
          >
            <div className="flex flex-col flex-wrap justify-between gap-6 md:pt-6">
              <AgeQuantities index={index} />
              {quantitiesFields.length > 1 && (
                <Button
                  Icon={TrashIcon}
                  buttonType="secondary"
                  aria-label={t('roomQuantitySelection.removeRoom')}
                  typography="text-paragraph-small"
                  className="button-small w-fit rounded-sm font-bold"
                  reverseIcon
                  onClick={() => onRemoveRoom(index)}
                >
                  <span className="normal-case">
                    {t('roomQuantitySelection.removeRoom')}
                  </span>
                </Button>
              )}
            </div>
          </Panel>
        </>
      ))}
    </Collapse>
  )

  const DesktopGuestQuantities = () => (
    <>
      {quantitiesFields.map(({ name, ...field }, index) => (
        <div
          className=" hidden flex-col border-t border-gray-10 pt-7 lg:flex"
          key={field.key}
        >
          <div className="flex justify-between">
            <span className="text-tag text-gray-60">{`${t(
              'roomQuantitySelection.room',
            )} ${index + 1}`}</span>
            {quantitiesFields.length > 1 && (
              <button
                aria-label={t('roomQuantitySelection.removeRoom')}
                className="outline-primary"
                onClick={() => onRemoveRoom(index)}
              >
                <TrashIcon className="w-6 cursor-pointer hover:text-primary-hover active:text-primary-pressed" />
              </button>
            )}
          </div>
          <div className="flex flex-col justify-between max-2xl:flex-wrap md:pt-6 lg:flex-row">
            <AgeQuantities index={index} {...field} />
          </div>
        </div>
      ))}
    </>
  )

  const AgeQuantities = ({ index, ...field }: { index: number }) => (
    <>
      {ageQuantities.map((ageQuantity) => (
        <AgeBasedQuantity
          listName={CHECKOUT_FORM_INPUT_NAMES.roomQuantities}
          name={[index, ageQuantity.objectKey]}
          key={ageQuantity.objectKey}
          incrementAriaLabel={t('roomQuantitySelection.addedAriaLabel', {
            added: ageQuantity.title,
          })}
          decrementAriaLabel={t('roomQuantitySelection.removedAriaLabel', {
            removed: ageQuantity.title,
          })}
          {...ageQuantity}
          {...field}
        />
      ))}
    </>
  )

  return (
    <>
      {MobileGuestQuantities()}
      <DesktopGuestQuantities />
    </>
  )
}
