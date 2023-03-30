import React, {
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
  useState,
} from 'react'
import { useTranslation } from 'next-i18next'
import { useNotification } from '@hooks/useNotification'

import { MarkerIcon, PeopleIcon } from '@assets/icons'
import { ROUTES } from '@utils/constants/routes'
import Navbar from '@components/molecules/Navbar'
import { NavbarButton } from '@components/molecules/Navbar/Navbar'
import { BottomNavigation } from './BottomNavigation'
import { FormController } from './FormController'
import { SideMenu } from './SideMenu'

export type Step<T> = {
  title: string
  content: (Props: ContentProps<T>) => JSX.Element | null
  props?: any
  onFinish?: (formInstanceData: any) => void
  hideSideMenu?: boolean
  hideBottomNav?: boolean
  interactable?: boolean
  done?: boolean
  disabled?: boolean
  validateOnMount?: boolean
}

export type NotifyProps = {
  message: string
  type: any
  placement?: any
  description?: string | undefined
  duration?: number | undefined
}

export type ContentProps<T> = {
  requiredData: T
  searchingRequiredData: boolean
  notify: (values: NotifyProps) => void
  setLoading: (value: boolean) => void
  setNextStepDisabled: (value: boolean) => void
  returnToPreviousStep: () => void
  completeStepAndAdvance: () => void
}

export type Props<T> = {
  steps: Step<T>[]
  setSteps: Dispatch<SetStateAction<Step<T>[]>>
  SideMenuHeader: ReactElement
  requiredData: T
  searchingRequiredData: boolean
  requiredDataHasErrored?: boolean
  requiredDataErrorMessage?: string
}

export const BookingController = <T,>({
  steps,
  setSteps,
  SideMenuHeader,
  requiredData,
  searchingRequiredData,
  requiredDataHasErrored,
  requiredDataErrorMessage,
}: Props<T>) => {
  const { t } = useTranslation(['checkout', 'common'])
  const { notify, contextHolder: notificationContextHolder } = useNotification()

  const [nextStepDisabled, setNextStepDisabled] = useState(true)
  const [loading, setLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  const isSideMenuHidden = steps[currentStep].hideSideMenu
  const isBottomNavHidden = steps[currentStep].hideBottomNav

  const returnToPreviousStep = () => {
    setCurrentStep((currentStep) => currentStep - 1)
  }

  const completeStepAndAdvance = () => {
    setSteps((steps: Step<T>[]) => {
      const newSteps = [...steps]
      if (currentStep + 1 < newSteps.length)
        newSteps[currentStep + 1].interactable = true
      newSteps[currentStep].done = true
      return newSteps
    })

    setCurrentStep((currentStep) => currentStep + 1)
  }

  const onRequiredDataError = (message: string) => {
    setSteps((steps) => {
      const newSteps = steps.map((step) => ({
        ...step,
        interactable: false,
        done: false,
      }))
      if (newSteps[0]) newSteps[0].interactable = true
      return newSteps
    })
    setCurrentStep(0)
    notify({ message, type: 'warning' })
  }

  useEffect(() => {
    if (requiredDataHasErrored && requiredDataErrorMessage) {
      onRequiredDataError(requiredDataErrorMessage)
    }
  }, [requiredDataHasErrored])

  useEffect(() => {
    setLoading(searchingRequiredData)
  }, [searchingRequiredData])

  useEffect(() => {
    window.scrollTo({ top: 0 })
    if (steps[currentStep].done) {
      setNextStepDisabled(false)
    }
  }, [currentStep])

  const CurrentContent = steps[currentStep].content

  const menuItems: NavbarButton[] = [
    {
      icon: MarkerIcon,
      title: t('common:speak-consultant'),
      href: ROUTES.concierge(),
      target: '_blank',
      rel: 'noopener noreferrer',
    },
  ]

  if (currentStep === steps.length - 1) {
    menuItems.push({
      icon: PeopleIcon,
      title: t('common:my-profile'),
      href: ROUTES.profile(),
    })
  }

  const hasUndefinedData = Object.values(requiredData as any).some(
    (value) => value === undefined,
  )

  return (
    <>
      <Navbar buttons={menuItems} useDefaultMobileButtons={false} />
      <div
        className={`flex justify-end bg-white text-gray-90 ${
          !isBottomNavHidden && 'pb-[180px] xl:pb-13'
        }`}
        role="form"
      >
        {notificationContextHolder}
        {!isSideMenuHidden && (
          <SideMenu
            steps={steps}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            Header={SideMenuHeader}
          />
        )}
        <main
          className={`overflow-x-hidden ${
            !isSideMenuHidden ? 'w-full xl:w-3/4 3xl:w-2/3' : 'w-full'
          }`}
        >
          <FormController
            setNextStepDisabled={setNextStepDisabled}
            validateOnMount={steps[currentStep].validateOnMount}
          >
            <CurrentContent
              notify={notify}
              requiredData={requiredData}
              searchingRequiredData={searchingRequiredData}
              setNextStepDisabled={setNextStepDisabled}
              setLoading={setLoading}
              returnToPreviousStep={returnToPreviousStep}
              completeStepAndAdvance={completeStepAndAdvance}
              {...steps[currentStep].props}
            />
            {!isBottomNavHidden && (
              <BottomNavigation
                previousButtonText={steps[currentStep - 1]?.title}
                nextButtonText={steps[currentStep + 1]?.title}
                loading={loading}
                nextStepDisabled={hasUndefinedData || nextStepDisabled}
                returnToPreviousStep={returnToPreviousStep}
                completeStepAndAdvance={completeStepAndAdvance}
              />
            )}
          </FormController>
        </main>
      </div>
    </>
  )
}
