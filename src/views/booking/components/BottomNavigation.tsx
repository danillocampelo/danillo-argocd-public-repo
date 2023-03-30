import React, { FC } from 'react'
import { useTranslation } from 'next-i18next'
import { BackArrowIcon, ForwardArrowIcon } from '@assets/icons'
import Button from '@components/atoms/Button'
import { Spin } from 'antd'

type Props = {
  previousButtonText?: string
  nextButtonText?: string
  loading: boolean
  nextStepDisabled: boolean
  returnToPreviousStep: () => void
  completeStepAndAdvance: () => void
}

export const BottomNavigation = ({
  previousButtonText,
  nextButtonText,
  loading,
  nextStepDisabled,
  returnToPreviousStep,
  completeStepAndAdvance,
}: Props) => {
  const { t } = useTranslation('checkout')

  return (
    <nav className="fixed bottom-0 right-0 z-10 flex w-full flex-col justify-end gap-4 border-t border-gray-40 bg-gray-0 p-4 lg:gap-7 lg:p-6 xl:flex-row xl:px-11">
      {previousButtonText && (
        <Button
          aria-label={t('steps.previous-step')}
          buttonType="secondary"
          Icon={BackArrowIcon}
          onClick={returnToPreviousStep}
          className="button-small 3xl:button-regular"
        >
          {previousButtonText}
        </Button>
      )}
      {nextButtonText && (
        <Button
          aria-label={t('steps.next-step')}
          buttonType="primary"
          Icon={loading ? Spin : ForwardArrowIcon}
          className="button-small 3xl:button-regular"
          reverseIcon
          htmlType="submit"
          onClick={completeStepAndAdvance}
          disabled={nextStepDisabled}
        >
          {nextButtonText}
        </Button>
      )}
    </nav>
  )
}
