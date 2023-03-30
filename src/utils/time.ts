import { Dayjs } from 'dayjs'

export const getTimeHourMinDiff = (startDate: Dayjs, endDate: Dayjs) => {
  const hours = endDate.diff(startDate, 'hours')
  const minutes = endDate.subtract(hours, 'hour').diff(startDate, 'minutes')

  return { hours, minutes }
}

export const getTimeHourMin = (date: Dayjs) => {
  return `${date.hour()}h${date.minute()}`
}

export const getDateRange = (
  startDate: Date,
  endDate: Date,
  locale = 'pt-BR',
) => {
  const startMonth = startDate
    .toLocaleString(locale, { month: 'short' })
    .slice(0, -1)
  const endMonth = endDate
    .toLocaleString(locale, { month: 'short' })
    .slice(0, -1)

  const rangeSymbol = locale === 'pt-BR' ? 'A' : '-'

  if (startMonth === endMonth)
    return `${startDate.getDate()} ${rangeSymbol} ${endDate.getDate()} ${endMonth}`

  return `${startDate.getDate()} ${startMonth} ${rangeSymbol} ${endDate.getDate()} ${endMonth}`
}

export const convertMinToHourMin = (min: number) => {
  const hours = Math.floor(min / 60)
  const minutes = (min % 60).toString().padStart(2, '0')

  return { hours, minutes }
}
