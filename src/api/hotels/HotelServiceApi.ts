import { Hotel } from '@models/Hotel'
import { hotelsMock } from './data/hotelsMock'

export const getHotels = async (): Promise<Hotel[]> => {
  try {
    return hotelsMock
  } catch (err) {
    throw err
  }
}
