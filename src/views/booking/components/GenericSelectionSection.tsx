import React, { FC, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { Form, Radio } from 'antd'

import Caption from '@components/atoms/Caption'
import { AlertFillIcon } from '@assets/icons'
import { useCheckoutContext } from '@contexts/CheckoutContext'

type Props<DataType extends { id: string }> = {
  name: string | number | (string | number)[]
  title: string
  SubtitleElement: () => JSX.Element
  selectionData: DataType[]
  ItemOption: FC<{
    data: DataType
    currentValue: string
    value: string
  }>
}

export const GenericSectionSelection = <DataType,>({
  name,
  title,
  SubtitleElement,
  selectionData,
  ItemOption,
}: Props<DataType & { id: string }>) => {
  const { t } = useTranslation(['checkout', 'common'])
  const { formInstance } = useCheckoutContext()

  const selectionDataCopy = [...selectionData]
  const firstItem = selectionDataCopy.shift()
  const [currentValue, setCurrentValue] = useState<string>(
    formInstance.getFieldValue(name) || firstItem?.id || '',
  )

  if (!firstItem) return null

  return (
    <section className="flex flex-col">
      <Form.Item
        name={name}
        noStyle
        initialValue={formInstance.getFieldValue(name) || firstItem?.id || ''}
      >
        <Radio.Group onChange={(e) => setCurrentValue(e.target.value)}>
          <main className="flex flex-col bg-orange-50 p-6 xl:p-7 2xl:p-8 3xl:p-11">
            <h5 className="font-bold">{title}</h5>
            <SubtitleElement />
            <ItemOption
              data={firstItem}
              value={firstItem.id}
              currentValue={currentValue}
            />
          </main>
          {!!selectionDataCopy.length && (
            <div className="flex flex-col p-6 xl:p-7 2xl:p-8 3xl:p-11">
              <h6 className="mb-6 font-bold">{t('other-options')}</h6>
              <Caption
                Icon={AlertFillIcon}
                className="mb-8 max-w-none max-xl:w-full xl:max-w-[55.75rem] 2xl:max-w-[64.25rem] 3xl:max-w-[73.5rem]"
              >
                {t('caption')}
              </Caption>
              <div className="flex flex-col gap-8">
                {selectionDataCopy.map((item) => (
                  <ItemOption
                    data={item}
                    value={item.id}
                    currentValue={currentValue}
                    key={`${item.id}`}
                  />
                ))}
              </div>
            </div>
          )}
        </Radio.Group>
      </Form.Item>
    </section>
  )
}
