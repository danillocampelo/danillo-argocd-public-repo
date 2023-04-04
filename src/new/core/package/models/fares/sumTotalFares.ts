import {TotalFares} from './totalFares'

export const sumTotalFares = (totalFares: TotalFares[]): TotalFares => {
  return totalFares.reduce(
    (acc, curr) => {
      acc.totalPrice += curr?.totalPrice || 0
      acc.totalMiles += curr?.totalMiles || 0
      return acc
    },
    {totalPrice: 0, totalMiles: 0},
  )
}
