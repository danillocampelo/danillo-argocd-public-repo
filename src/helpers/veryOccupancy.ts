import {isArray} from 'class-validator'

export function verifyOccupancy(Queryparams) {
  const params = new URLSearchParams()

  if (isArray(Queryparams.occupancy)) {
    Queryparams.occupancy.forEach((occupancy) => {
      params.append('occupancy', occupancy)
      delete Queryparams.occupancy
    })
  }
  for (const key in Queryparams) {
    const element = Queryparams[key]
    params.append(key, element)
  }

  return params
}
