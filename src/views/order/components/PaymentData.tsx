import { useTranslation } from 'next-i18next'
import { FunctionComponent, ReactElement } from 'react'
import { Order } from '@models/Order'
import { PaymentStatuses } from '@models/Payment'
import { convertToCurrency } from '@utils/currency'
import { MastercardLogoIcon } from '@assets/icons'
import { capitalize } from '@utils/capitalize'

const paymentStatusClasses: Record<PaymentStatuses, string> = {
  AUTHORIZED: 'text-feedback-positive',
  CAPTURED: 'text-feedback-positive',
  ANALYZING: 'text-feedback-warning',
  PENDING: 'text-feedback-warning',
  RECURRENT: 'text-feedback-warning',
  DENIED: 'text-feedback-negative',
  CANCELED: 'text-feedback-negative',
}

/**
 * @todo: add other card brand icons and type as Record<CardBrands, ReactElement>
 */
const cardBrandIcons: Record<string, ReactElement> = {
  MASTERCARD: <MastercardLogoIcon />,
}

type Props = {
  order: Order
}

export const PaymentData: FunctionComponent<Props> = ({ order }) => {
  const { t, i18n } = useTranslation('order-page')

  const formatedPaymentDate = new Intl.DateTimeFormat(i18n.language, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(order.payment[0].date))

  return (
    <section>
      <h5 className="mb-8 mt-9 font-bold md:text-h4-desktop lg:mt-14">
        {t('payment')}
      </h5>

      {order.payment.map((payment, index) => {
        const { installments, cardBrand, cardLastDigits, status, price } =
          payment

        return (
          <div
            className="w-full border border-gray-10 px-6 py-7 lg:w-1/2"
            key={`payment-${index}`}
          >
            <article className="mb-8 flex justify-between">
              <p
                className={`text-paragraph-small font-bold ${paymentStatusClasses[status]} uppercase`}
              >
                {t(`order-status.${status}`)}
              </p>
              <p className="max-w-[50%] text-end text-paragraph-small font-bold md:text-paragraph-medium">
                {formatedPaymentDate}
              </p>
            </article>

            <article className="flex items-center justify-between border-b border-gray-10 pb-8">
              <h5 className="font-bold md:text-h6-desktop">
                {convertToCurrency({
                  rawNumber: price.amount,
                  currency: price.currency,
                })}
              </h5>
              <p className="max-w-[45%] text-end text-paragraph-medium font-bold md:text-h5-mobile">
                {installments} x{' '}
                {convertToCurrency({
                  rawNumber: price.amount / installments,
                  currency: price.currency,
                })}
              </p>
            </article>

            <article className="mt-8 flex">
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-10">
                {cardBrandIcons[cardBrand]}
              </div>

              <div className="ml-4">
                <p className="text-paragraph-medium font-bold md:text-h6-desktop">
                  {capitalize(cardBrand)}
                </p>
                <p className="text-bold max-md:text-paragraph-small">
                  **** {cardLastDigits}
                </p>
              </div>
            </article>
          </div>
        )
      })}
    </section>
  )
}
