import {Fare} from '../../../../../modules/infotravel/services/availbility/entities/packageAvailbility.entity'

export const sumFares = (fares: Fare[] = []) => {
  return fares.reduce(
    (acc, fare) => {
      acc.totalPrice += fare?.price?.amount || 0
      acc.totalMiles += fare?.point?.amount || 0
      return acc
    },
    {totalPrice: 0, totalMiles: 0},
  )
}
