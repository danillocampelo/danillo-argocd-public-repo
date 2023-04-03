export class PaymentNotificationInputDTO {
  live: string
  notificationItems: {
    NotificationRequestItem: {
      additionalData: any
      eventCode: 'AUTHORISATION' | string
      success: 'true' | 'false'
      eventDate: Date
      merchantAccountCode: string
      pspReference: string
      merchantReference: string
      amount: {
        value: number
        currency: 'EUR'
      }
    }
  }[]
}
