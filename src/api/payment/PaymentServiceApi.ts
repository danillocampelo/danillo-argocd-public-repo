import { post } from '@api/_common/api'
import { StartPaymentSessionDto } from './dtos/StartPaymentSessionDto'

export type StartPaymentSessionInput = {
  params: {
    amount: {
      value: number
    }
    returnUrl: string
    bookingId: string
  }
}

export async function startPaymentSession({
  params,
}: StartPaymentSessionInput) {
  try {
    const returnUrl = new URL(params.returnUrl)

    const { data } = await post<StartPaymentSessionDto>({
      url: `payment/session/start`,
      params: {
        amount: {
          value: params.amount.value,
          currency: 'BRL',
        },
        returnUrl: returnUrl.toString(),
        bookingId: params.bookingId,
      },
    })
    return data
  } catch (err) {
    throw err
  }
}
