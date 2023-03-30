type DateDifferenceMode = 'minutes' | 'hours' | 'days'

const diffTypeBreakpoints: Record<DateDifferenceMode, number> = {
  minutes: 60,
  hours: 60 * 60,
  days: 60 * 60 * 24,
}

export const getDifferenceBetweenDates = (
  firstDate: Date,
  secondDate: Date,
  differenceMode: DateDifferenceMode,
): number => {
  const timeDiffInMilliseconds = Math.abs(
    new Date(secondDate).getTime() - new Date(firstDate).getTime(),
  )

  const timeDiff = Math.ceil(
    timeDiffInMilliseconds / (1000 * diffTypeBreakpoints[differenceMode]),
  )

  return timeDiff
}
