import {TotalFares} from './totalFares'

export const sortTotalFares = (totalFares?: TotalFares[]) => {
  return totalFares?.sort((a, b) => a.totalPrice - b.totalPrice)
}
