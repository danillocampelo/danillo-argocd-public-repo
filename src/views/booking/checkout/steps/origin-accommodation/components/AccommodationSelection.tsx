import React, { FC, useState } from 'react'
import { useTranslation } from 'next-i18next'

import { Hotel } from '@models/Hotel'
import { Form, Radio } from 'antd'
import { CHECKOUT_FORM_INPUT_NAMES } from '@utils/constants/formInputName'
import { useCheckoutContext } from '@contexts/CheckoutContext'
import { HotelCard } from '@components/molecules/HotelCard'

type Props = {
  hotels: Hotel[]
}

export const AccommodationSelection: FC<Props> = ({ hotels }) => {
  const { t } = useTranslation(['checkout'])
  const { formData } = useCheckoutContext()
  const [currentValue, setCurrentValue] = useState<string>(
    formData.getHotelId() || hotels[0].id,
  )

  return (
    <section className="flex flex-col">
      <h5 className="mb-7 font-bold md:mb-8">{t('accommodation.title')}</h5>
      <Form.Item
        name={CHECKOUT_FORM_INPUT_NAMES.hotelId}
        noStyle
        initialValue={currentValue}
      >
        <Radio.Group onChange={(e) => setCurrentValue(e.target.value)}>
          <main className="relative -left-4 flex w-screen gap-7 overflow-x-scroll px-4 pt-2 pb-2 max-md:scrollbar-hide lg:-left-8 lg:px-8 xl:w-[75vw] xl:gap-11 xl:pb-7 2xl:-left-11 2xl:px-11 3xl:w-[66vw]">
            {hotels.map((accommodation) => {
              return (
                <HotelCard
                  key={accommodation.id}
                  hotel={accommodation}
                  currentValue={currentValue}
                />
              )
            })}
          </main>
        </Radio.Group>
      </Form.Item>
    </section>
  )
}
