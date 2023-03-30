import React, { FC } from 'react'
import { useTranslation } from 'next-i18next'
import DatePicker from '@components/atoms/DatePicker'
import { useCheckoutContext } from '@contexts/CheckoutContext/CheckoutContext'
import { CHECKOUT_FORM_INPUT_NAMES } from '@utils/constants/formInputName'
import { Form } from 'antd'
import dayjs from 'dayjs'

type Props = {
  nights?: number
  startDate?: string
  endDate?: string
}

export const PackageDates: FC<Props> = ({ nights, startDate, endDate }) => {
  const { t } = useTranslation(['checkout'])
  const { formInstance, triggerRender } = useCheckoutContext()

  const onDepartureDateChange = (date: any) => {
    if (date && nights) {
      const returnDate = date.add(nights, 'day')
      formInstance.setFieldValue(CHECKOUT_FORM_INPUT_NAMES.departureDate, date)
      formInstance.setFieldValue(
        CHECKOUT_FORM_INPUT_NAMES.returnDate,
        returnDate,
      )
      triggerRender()
    } else {
      formInstance.setFieldValue(CHECKOUT_FORM_INPUT_NAMES.departureDate, date)
    }
  }

  const initialStartDate = startDate ? dayjs(startDate) : undefined
  const initialEndDate = endDate ? dayjs(endDate) : undefined

  return (
    <section>
      <h5 className="mb-8 font-bold">{t('packageDates.title')}</h5>
      <div className="flex flex-col md:flex-row">
        <div className="flex flex-col md:mr-8 lg:mr-16">
          <Form.Item
            name="departure-date"
            label={t('packageDates.startDate')}
            rules={[
              {
                required: true,
                message: t('packageDates.error'),
              },
            ]}
            initialValue={initialStartDate}
          >
            <DatePicker
              previousDatesDisabled
              onChange={onDepartureDateChange}
            />
          </Form.Item>
        </div>
        <div className="mt-6 flex flex-col md:mt-0">
          <Form.Item
            name="return-date"
            label={t('packageDates.endDate')}
            initialValue={initialEndDate}
          >
            <DatePicker disabled={Boolean(nights)} />
          </Form.Item>
        </div>
      </div>
    </section>
  )
}
