import { v4 as uuid } from 'uuid'

export const generateNewAccommodationRow = () => ({
  id: uuid(),
  adults: 1,
  children: 0,
  babies: 0,
})
