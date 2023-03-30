import AdyenCheckout from '@adyen/adyen-web'
import '@adyen/adyen-web/dist/adyen.css'
import Core from '@adyen/adyen-web/dist/types/core/core'
import { CoreOptions } from '@adyen/adyen-web/dist/types/core/types'
import { useEffect, useState, FC, useMemo } from 'react'
import { PAYMENT_PLUGIN_OPTIONS_DEFAULT } from './constants'

export interface PaymentPluginProps {
  onPaymentCompleted?: (result: any, compoment: any) => void
  onError?: (error: any, compoment: any) => void
  executePayment?: boolean
  paymentSession: {
    id: string
    sessionData: string
  }
  onSuccessCallback: (result: any) => void
  onErrorCallback: () => void
}

export const PaymentPlugin: FC<PaymentPluginProps> = ({
  executePayment,
  paymentSession,
  onSuccessCallback,
  onErrorCallback,
}) => {
  const shouldExecute = useMemo(
    () => paymentSession.id && paymentSession.sessionData,
    [paymentSession],
  )
  const [checkout, setCheckout] = useState<Core>()

  const onPaymentCompleted = (result: any, component: any) => {
    onSuccessCallback(result)
  }
  const onPaymentError = (result: any, component: any) => {
    onErrorCallback()
  }

  useEffect(() => {
    const configuration: CoreOptions = {
      ...PAYMENT_PLUGIN_OPTIONS_DEFAULT,
      onPaymentCompleted,
      onError: onPaymentError,
      session: {
        id: paymentSession.id,
        sessionData: paymentSession.sessionData,
      },
    }

    if (shouldExecute) {
      AdyenCheckout(configuration).then((res) => {
        setCheckout(res)
      })
    }
  }, [shouldExecute])

  useEffect(() => {
    if (checkout && shouldExecute) {
      checkout.create('dropin').mount('#dropin-container')
    }
  }, [checkout, shouldExecute])

  return <div>{shouldExecute && <div id="dropin-container"></div>}</div>
}
