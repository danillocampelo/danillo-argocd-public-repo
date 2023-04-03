export class AdyenPaymentNotificationSuccessDTO {
  live: 'false' | 'true'
  notificationItems: Array<{
    NotificationRequestItem: {
      eventCode: 'AUTHORISATION'
      merchantAccountCode: string
      reason: string
      amount: {
        currency: string
        value: number
      }
      operations: ['CANCEL', 'CAPTURE', 'REFUND']
      success: 'false' | 'true'
      paymentMethod: 'mc'
      additionalData: {
        expiryDate: string
        authCode: string
        cardBin: string
        cardSummary: string
        checkoutSessionId: string
      }
      merchantReference: string
      pspReference: string
      eventDate: string
    }
  }>
}
