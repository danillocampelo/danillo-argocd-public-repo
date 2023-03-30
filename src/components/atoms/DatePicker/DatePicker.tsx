import React, { FC, useContext, useId } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { DatePicker as AntdDatePicker } from 'antd'
import { PickerDateProps } from 'antd/es/date-picker/generatePicker'
import IMask from 'imask'
import { CalendarIcon } from '@assets/icons'
import { formatDate, placeholder } from '@utils/formatDate'
import { LocaleContext } from '@contexts/LocaleContext'

type Props = PickerDateProps<Dayjs> & {
  previousDatesDisabled?: boolean
}

export const DatePicker: FC<Props> = ({
  previousDatesDisabled = false,
  className = '',
  ...rest
}) => {
  const id = useId()
  const { locale } = useContext(LocaleContext)
  const DATE_FORMAT = formatDate[locale]

  const MASKED = IMask.createMask({
    blocks: {
      MM: { from: 1, mask: IMask.MaskedRange, to: 12 },
      DD: { from: 1, mask: IMask.MaskedRange, to: 31 },
      YYYY: { from: 1000, mask: IMask.MaskedRange, to: 9999 },
    },
    mask: Date,
    pattern: DATE_FORMAT,
  })

  const tryToPickDate = () => {
    setTimeout(() => {
      const selectedDateElement = document.getElementsByClassName(
        'ant-picker-cell-selected',
      )[0] as HTMLElement
      if (selectedDateElement) {
        selectedDateElement.click()
      }
    }, 100)
  }

  const maskInput = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement
    input.value = MASKED.resolve(input.value)

    const isDateComplete = input.value.length === DATE_FORMAT.length - 1

    if (isDateComplete) {
      tryToPickDate()
    }
  }

  const disabledDate = (current: Dayjs) => {
    return current < dayjs().startOf('day')
  }

  return (
    <AntdDatePicker
      id={id}
      placeholder={placeholder[locale]}
      format={DATE_FORMAT}
      disabledDate={previousDatesDisabled ? disabledDate : undefined}
      className={`h-11 rounded-none border-2 px-6 py-5 ${className}`}
      showToday={false}
      suffixIcon={<CalendarIcon />}
      onKeyDown={maskInput}
      {...rest}
    />
  )
}
