import React, { FC } from 'react'
import { KeyToIconMapper } from '@assets/icons'
import {
  Props as QuantityProps,
  QuantitySelector,
} from '@components/atoms/QuantitySelector'
import { useCheckoutContext } from '@contexts/CheckoutContext'

type Props = {
  name: [roomIndex: number, ageType: string]
  title: string
  ageDescription: string
  iconKey: string
  objectKey: 'adults' | 'children' | 'babies'
} & QuantityProps

export const AgeBasedQuantity: FC<Props> = ({
  name,
  title,
  ageDescription,
  objectKey,
  iconKey,
  minQuantity,
  maxQuantity,
  incrementAriaLabel,
  decrementAriaLabel,
  ...rest
}) => {
  const { formData } = useCheckoutContext()
  const Icon = KeyToIconMapper[iconKey]

  const calculateMaxBabiesCount = () => {
    let currentBabyCount = 0

    const countResult = formData.getRoomsQuantities()?.reduce(
      (acc, room, index) => {
        const [roomIndex] = name

        if (index === roomIndex) {
          currentBabyCount = room.babies
        }

        return {
          adultsCount: acc.adultsCount + room.adults,
          babiesCount: acc.babiesCount + room.babies,
        }
      },
      { adultsCount: 0, babiesCount: 0 },
    )

    if (countResult) {
      return (
        countResult.adultsCount - countResult.babiesCount + currentBabyCount
      )
    } else {
      return 0
    }
  }

  let calculatedMaxQuantity = maxQuantity

  if (objectKey === 'babies') {
    calculatedMaxQuantity = calculateMaxBabiesCount()
  }

  return (
    <div className="flex border-gray-10 max-xl:justify-between max-xl:py-4 max-md:border-b max-md:pb-6 max-md:pt-0 max-md:first:mt-6">
      <div className="flex flex-col pr-7">
        <span className="flex items-center">
          <Icon className="mr-1 w-6 md:w-7" />
          <h5 className="text-paragraph-medium font-bold md:text-h5-mobile">
            {title}
          </h5>
        </span>
        <span className="pt-1 pl-1 text-paragraph-small font-normal text-gray-60 md:pl-7 md:pt-3 2xl:text-paragraph-medium">
          {ageDescription}
        </span>
      </div>
      <QuantitySelector
        name={name}
        minQuantity={minQuantity}
        maxQuantity={calculatedMaxQuantity}
        incrementAriaLabel={incrementAriaLabel}
        decrementAriaLabel={decrementAriaLabel}
        {...rest}
      />
    </div>
  )
}
