import { CheckoutProvider } from '@contexts/CheckoutContext'
import { NextPage } from 'next'
import { FunctionComponent, useEffect } from 'react'
import { BookingController } from '../components/BookingController'
import { useCustomCheckoutSteps } from './hooks/useCustomCheckoutSteps'
import { CustomCheckoutSideMenuHeader } from './components/CustomCheckoutSideMenu'
import { useRouter } from 'next/router'
import { ROUTES } from '@utils/constants/routes'

export type LocationData = {
  id: number
  query: string
  value: string
}

export type CustomCheckoutRequiredData = {
  origin: LocationData
  destination: LocationData
  startDate?: string
  endDate?: string
}

type Props = {
  requiredData: CustomCheckoutRequiredData
}

export const CustomCheckoutPage: NextPage<Props> = ({
  requiredData,
}: Props) => {
  return (
    <CheckoutProvider>
      <CustomCheckoutFlow requiredData={requiredData} />
    </CheckoutProvider>
  )
}

export const CustomCheckoutFlow: FunctionComponent<Props> = ({
  requiredData,
}) => {
  const { steps, setSteps } = useCustomCheckoutSteps()
  const router = useRouter()

  const hasOriginAndDestination =
    requiredData.origin && requiredData.destination

  useEffect(() => {
    if (!hasOriginAndDestination) {
      /**@todo: Mudar rota para a página de monte seu pacote quando disponível */
      router.push(ROUTES.home())
    }
  }, [])

  if (!hasOriginAndDestination) return null

  return (
    <BookingController
      steps={steps}
      setSteps={setSteps}
      SideMenuHeader={
        <CustomCheckoutSideMenuHeader
          initialDestination={requiredData.destination}
        />
      }
      requiredData={requiredData}
      searchingRequiredData={false}
    />
  )
}
