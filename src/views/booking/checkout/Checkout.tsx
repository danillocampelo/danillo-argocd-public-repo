import React, { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { BookingController } from '../components/BookingController'
import { useSelectedPackage } from '@hooks/useSelectedPackage'
import { CheckoutProvider, useCheckoutContext } from '@contexts/CheckoutContext'
import { CheckoutStorageKeys } from '../checkoutStorageKeys'
import { useTranslation } from 'next-i18next'
import { usePackageAvailability } from './hooks/usePackageAvailability'
import { useCheckoutSteps } from './hooks/useCheckoutSteps'
import { PackageAvailability } from '@api/availability/AvailabilityServiceApi'
import { Package } from '@models/Package'
import { MoonIcon, PinIcon } from '@assets/icons'

export type CheckoutRequiredData = {
  packageData?: Package
  packageAvailability?: PackageAvailability
}

export const CheckoutPage: NextPage = () => {
  return (
    <CheckoutProvider>
      <CheckoutFlow />
    </CheckoutProvider>
  )
}

const CheckoutFlow = () => {
  const router = useRouter()
  const { t } = useTranslation(['checkout', 'common'])
  const { formData } = useCheckoutContext()
  const packageId = router.query.packageId?.toString()
  const [packageData] = useSelectedPackage(packageId)
  const [availabilityError, setAvailabilityError] = useState(false)

  useEffect(() => {
    if (packageData) {
      sessionStorage.setItem(
        CheckoutStorageKeys.PACKAGE_DATA,
        JSON.stringify(packageData),
      )
    }
  }, [packageData])

  const onMissingAvailability = () => {
    setAvailabilityError(true)
  }

  const { searchingAvailability, packageAvailability } = usePackageAvailability(
    packageId,
    formData,
    onMissingAvailability,
  )

  const { steps, setSteps } = useCheckoutSteps({ packageData })

  const requiredData = { packageAvailability, packageData }

  return (
    <BookingController
      steps={steps}
      setSteps={setSteps}
      SideMenuHeader={<CheckoutSideMenuHeader requiredData={requiredData} />}
      requiredData={requiredData}
      searchingRequiredData={searchingAvailability}
      requiredDataHasErrored={availabilityError}
      requiredDataErrorMessage={t('steps.missing-availability')}
    />
  )
}

const CheckoutSideMenuHeader = ({
  requiredData,
}: {
  requiredData: CheckoutRequiredData
}) => {
  const { t } = useTranslation(['common'])

  const packageData = requiredData.packageData

  if (!packageData) return null

  return (
    <div className="flex flex-col border-b border-gray-20 pb-7">
      <h5 className="pb-2 font-bold">{packageData.title}</h5>
      <p className="pb-6 text-paragraph-medium">{packageData.subtitle}</p>
      <div className="flex gap-6 text-button">
        <span className="flex items-center">
          <MoonIcon className="mr-2 w-7" />
          {packageData.packageDefault?.nights} {t('nights')}
        </span>
        <span className="flex items-center">
          <PinIcon className="mr-2 w-7" />
          {packageData.destination.city.name.split(',')[0]}
        </span>
      </div>
    </div>
  )
}
