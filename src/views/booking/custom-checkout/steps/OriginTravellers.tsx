import React, { useState } from 'react'
import { Form } from 'antd'

import { Divider } from '@components/index'

import useOrigins from '@api/origins/hooks/useOrigins'
import useDebounce from '@hooks/useDebounce'
import { useTranslation } from 'next-i18next'
import { Select } from '@components/atoms/Select'
import { useCheckoutContext } from '@contexts/CheckoutContext'
import { CHECKOUT_FORM_INPUT_NAMES } from '@utils/constants/formInputName'
import { ContentProps } from '@views/booking/components/BookingController'
import { PackageDates } from '@views/booking/components/PackageDates'
import { RoomQuantitySelection } from '@views/booking/components/RoomQuantitySelection'
import { CustomCheckoutRequiredData } from '../CustomCheckout'

export const OriginTravellers = ({
  requiredData,
}: ContentProps<CustomCheckoutRequiredData>) => {
  const { t } = useTranslation(['checkout'])

  const { formData, formInstance, triggerRender } = useCheckoutContext()
  const [search, setSearch] = useState(formData.getOriginQuery())
  const debouncedSearchTerm = useDebounce(search, 300)

  const { data: origins } = useOrigins({
    query: debouncedSearchTerm,
    queryOptions: { keepPreviousData: true },
  })

  formInstance.setFieldValue(
    CHECKOUT_FORM_INPUT_NAMES.originQuery,
    requiredData.origin.query,
  )

  return (
    <div className="p-4 md:p-8 2xl:p-11">
      <PackageDates
        startDate={requiredData.startDate}
        endDate={requiredData.endDate}
      />
      <Divider className="gray-10 my-8 md:my-11" />
      <h5 className="mb-8 font-bold">{t('searchBar.title')}</h5>
      <Form.Item
        name={CHECKOUT_FORM_INPUT_NAMES.originId}
        label={t('searchBar.label')}
        rules={[
          {
            required: true,
            message: t('searchBar.error'),
          },
        ]}
        initialValue={{
          label: requiredData.origin.value,
          value: requiredData.origin.id,
        }}
      >
        <Select
          name={CHECKOUT_FORM_INPUT_NAMES.originId}
          notFoundContent={t('searchBar.notFoundContent')}
          placeholder={t('searchBar.placeholder')}
          onSearch={(value: string) => setSearch(value)}
          options={
            origins?.map((origin) => ({
              label: origin.name,
              value: String(origin.id),
            })) || []
          }
          onSelect={(value: string) => {
            const origin = origins?.find(
              (origin) => String(origin.id) === value,
            )

            if (origin) {
              formInstance.setFieldValue(
                CHECKOUT_FORM_INPUT_NAMES.originQuery,
                debouncedSearchTerm,
              )
              triggerRender()
            }
          }}
        />
      </Form.Item>
      <Divider className="gray-10 my-8 md:my-11" />
      <RoomQuantitySelection />
    </div>
  )
}
