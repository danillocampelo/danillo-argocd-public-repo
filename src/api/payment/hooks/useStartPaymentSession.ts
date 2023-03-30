import { useMutation } from 'react-query'
import {
  startPaymentSession,
  StartPaymentSessionInput,
} from '../PaymentServiceApi'

export function useStartPaymentSession() {
  return useMutation((params: StartPaymentSessionInput) =>
    startPaymentSession(params),
  )
}
