import { LOCALE_TO_CURRENCY } from './constants'

type Props = {
  rawNumber: number
  locale?: string
  currency?: string
}

export function convertToCurrency({
  rawNumber,
  currency,
  locale = 'pt-BR',
}: Props) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency || LOCALE_TO_CURRENCY[locale],
  }).format(rawNumber)
}
