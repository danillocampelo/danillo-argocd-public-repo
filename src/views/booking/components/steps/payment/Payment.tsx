import React, { FC, useEffect } from 'react'
import PaymentPlugin from '@components/organisms/PaymentPlugin'
import { useStartPaymentSession } from '@api/payment/hooks/useStartPaymentSession'
import { useCheckoutContext } from '@contexts/CheckoutContext'
import { useTranslation } from 'next-i18next'
import { ContentProps } from '../../BookingController'

export const Payment = ({
  notify,
  completeStepAndAdvance,
}: ContentProps<any>) => {
  const { t } = useTranslation('checkout')
  const { mutate, data: payment } = useStartPaymentSession()
  const { totalAmount, totalFees, bookingId } = useCheckoutContext()
  const amount = (totalAmount + totalFees).toFixed(2).replace(/[^\d]+/g, '')

  useEffect(() => {
    mutate({
      params: {
        amount: {
          value: Number(amount),
        },
        returnUrl: window.location.href,
        bookingId: bookingId,
      },
    })
  }, [])

  const onErrorCallback = () => {
    notify({ message: t('payment.error'), type: 'error' })
  }

  const onSuccessCallback = () => completeStepAndAdvance()

  return (
    <div className="h-full">
      {payment && (
        <PaymentPlugin
          paymentSession={{
            id: payment.id,
            sessionData: payment.data,
          }}
          onSuccessCallback={onSuccessCallback}
          onErrorCallback={onErrorCallback}
        />
      )}
    </div>
  )
}
