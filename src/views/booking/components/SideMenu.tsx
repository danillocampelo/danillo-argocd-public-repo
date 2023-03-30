import React, { ReactElement } from 'react'

import { CheckIcon } from '@assets/icons'
import { Step } from './BookingController'

type Props<T> = {
  steps: Step<T>[]
  currentStep: number
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>
  Header: ReactElement
}

export const SideMenu = <T,>({
  steps,
  currentStep,
  setCurrentStep,
  Header,
}: Props<T>) => {
  const StepItem = ({ step, index }: { step: Step<T>; index: number }) => {
    const isCurrentStep = index === currentStep
    const isInteractable = step.interactable
    const isDone = step.done

    const handleOnItemClick = () => {
      isInteractable && setCurrentStep(index)
    }

    return (
      <li
        className={`flex items-center border-b border-gray-20 p-[0.375rem] transition-all`}
      >
        <button
          className={`${
            isInteractable ? 'cursor-pointer' : 'cursor-not-allowed'
          } flex w-full py-7
          outline-primary`}
          onClick={handleOnItemClick}
        >
          {isCurrentStep || !isDone ? (
            <div className="h-6 w-6 self-center">
              <div
                className={`inline-block rounded-full p-[0.375rem] ${
                  isCurrentStep ? 'bg-primary' : 'bg-gray-20'
                }`}
              />
            </div>
          ) : (
            <CheckIcon className="w-6 text-feedback-positive" />
          )}
          <h5 className="ml-4 text-left text-paragraph-medium font-bold 3xl:text-h5-mobile">{`${
            index + 1
          }. ${step.title}`}</h5>
        </button>
      </li>
    )
  }

  return (
    <aside
      className="fixed top-14 left-0 z-20 hidden h-screen w-1/4
    flex-shrink-0 overflow-y-auto border-r border-gray-20 bg-gray-0 p-8 pb-14 shadow-lg xl:block 2xl:p-11 3xl:w-1/3"
    >
      {Header}
      <ol className="flex flex-col">
        {steps.map((step, index) => (
          <StepItem step={step} index={index} key={step.title} />
        ))}
      </ol>
    </aside>
  )
}
