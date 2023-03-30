import React, { useState } from 'react'
import { Form } from 'antd'

import { Divider } from '@components/index'

import useOrigins from '@api/origins/hooks/useOrigins'
import useDebounce from '@hooks/useDebounce'
import { useTranslation } from 'next-i18next'
import { Select } from '@components/atoms/Select'
import { useCheckoutContext } from '@contexts/CheckoutContext'
import { CHECKOUT_FORM_INPUT_NAMES } from '@utils/constants/formInputName'
import { Skeleton } from '@components/atoms/Skeleton'
import { ContentProps } from '@views/booking/components/BookingController'
import { CheckoutRequiredData } from '@views/booking/checkout/Checkout'
import { PackageDates } from '@views/booking/components/PackageDates'
import { RoomQuantitySelection } from '@views/booking/components/RoomQuantitySelection'
import { AccommodationSelection } from './components/AccommodationSelection'

export const OriginAccommodation = ({
  requiredData,
  searchingRequiredData: searchingAvailability,
}: ContentProps<CheckoutRequiredData>) => {
  const { t } = useTranslation(['checkout'])

  const { formData, formInstance, triggerRender } = useCheckoutContext()
  const [search, setSearch] = useState(formData.getOriginQuery())
  const debouncedSearchTerm = useDebounce(search, 300)

  const { data: origins } = useOrigins({
    query: debouncedSearchTerm,
    queryOptions: { keepPreviousData: true },
  })

  return (
    <div className="p-4 md:p-8 2xl:p-11">
      <PackageDates
        nights={requiredData.packageData?.packageDefault?.nights || 0}
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
      <Divider className="gray-10 my-8 md:my-11" />
      {requiredData.packageAvailability?.hotels &&
        requiredData.packageAvailability.hotels?.length > 0 && (
          <AccommodationSelection
            hotels={requiredData.packageAvailability.hotels || []}
          />
        )}
      {searchingAvailability && (
        <section className="flex w-screen gap-11 overflow-x-hidden">
          <Skeleton className="h-[591px] w-[254px] flex-shrink-0 lg:h-[856px] lg:w-[400px]" />
          <Skeleton className="h-[591px] w-[254px] flex-shrink-0 lg:h-[856px] lg:w-[400px]" />
        </section>
      )}
    </div>
  )
}
