import { Fare } from '@models/Fare'
import { Price } from '@models/Price'

export const calculateTotalFares = (faresArray: Fare[]): number =>
  faresArray.reduce(
    (total: number, fare: Fare) => total + Number(fare.price?.amount),
    0,
  )

export const calculateTotalFees = (faresArray: Fare[]): number =>
  faresArray.reduce(
    (total: number, fare: Fare) =>
      fare.type !== 'FARE' ? total + Number(fare.price?.amount) : total,
    0,
  )

type ItemWithPrice = { price: Price; fees: Price }

type ItemArray<T extends ItemWithPrice> = T[]

export const reduceItemPrices = <T extends ItemWithPrice>(
  items: ItemArray<T>,
): number => {
  return items.reduce((total: number, item: T) => {
    return total + item.price.amount
  }, 0)
}

export const reduceItemFees = <T extends ItemWithPrice>(
  items: ItemArray<T>,
): number => {
  return items.reduce((total: number, item: T) => {
    return total + item.fees.amount
  }, 0)
}
