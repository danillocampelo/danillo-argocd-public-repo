import React, { FC, useState } from 'react'
import { ContentProps } from '@views/booking/components/BookingController'
import { CustomCheckoutRequiredData } from '../CustomCheckout'
import { hotelsMock } from '@api/hotels/data/hotelsMock'
import { useCheckoutContext } from '@contexts/CheckoutContext'
import { useTranslation } from 'next-i18next'
import { HotelCard } from '@components/molecules/HotelCard'
import { CHECKOUT_FORM_INPUT_NAMES } from '@utils/constants/formInputName'
import { Form, Radio } from 'antd'

export const Hotels: FC<ContentProps<CustomCheckoutRequiredData>> = ({
  requiredData,
}) => {
  /**@todo: Change to hotels returned by availability */
  const hotels = hotelsMock
  const { t } = useTranslation(['checkout'])
  const { formData } = useCheckoutContext()
  const [currentValue, setCurrentValue] = useState(
    formData.getHotelId() || hotels[0].id,
  )
  return (
    <div className="p-4 md:p-8 2xl:p-11">
      <h5 className="mb-7 font-bold md:mb-8">{t('accommodation.title')}</h5>
      <Form.Item
        name={CHECKOUT_FORM_INPUT_NAMES.hotelId}
        noStyle
        initialValue={currentValue}
      >
        <Radio.Group onChange={(e) => setCurrentValue(e.target.value)}>
          <div className="flex flex-col gap-8">
            {hotels.map((hotel) => (
              <HotelCard
                key={hotel.id}
                currentValue={currentValue}
                hotel={hotel}
                wide
              />
            ))}
          </div>
        </Radio.Group>
      </Form.Item>
    </div>
  )
}
