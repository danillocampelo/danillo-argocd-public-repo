import { Price } from '@models/Price'
import { convertToCurrency } from '@utils/currency'
import { useTranslation } from 'next-i18next'

type Props = {
  price: Price
  priceClassName?: string
}

export const Pricing = ({ price, priceClassName }: Props) => {
  const { t } = useTranslation(['checkout'])

  return (
    <div className="flex flex-col gap-1">
      <span className="text-tag font-normal">{t('total-value')}</span>
      <div className="flex items-center gap-2">
        <h6
          className={`${
            priceClassName ? priceClassName : 'text-h6-desktop font-bold'
          }`}
        >
          {convertToCurrency({
            rawNumber: price.amount,
            currency: price.currency,
          })}
        </h6>
      </div>
    </div>
  )
}
