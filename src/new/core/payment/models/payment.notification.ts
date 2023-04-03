export class PaymentNotification {
  live: string
  notificationItems: NotificationItem[]
}
export class NotificationRequestItem {
  eventCode: string
  merchantAccountCode: string
  reason: string
  amount: Amount
  operations: string[]
  success: string
  paymentMethod: string
  additionalData: AdditionalData
  merchantReference: string
  pspReference: string
  eventDate: Date
}

export interface NotificationItem {
  NotificationRequestItem: NotificationRequestItem
}

export interface Amount {
  currency: string
  value: number
}

export interface AdditionalData {
  expiryDate: string
  authCode: string
  cardBin: string
  cardSummary: string
  checkoutSessionId: string
}
export enum PaymentNotificationEventCode {
  Authorisation = 'AUTHORISATION',
}

export enum PaymentNotificationSuccess {
  TRUE = 'true',
  FALSE = 'false',
}

export class sendMessage {
  MessageBody: string
  QueueUrl: string
  MessageGroupId?: string
}

export enum PaymentQueuePatterns {
  PAYMENT_QUEUE_PATTERN_SUCCESS = 'PAYMENT_SUCCESS',
  PAYMENT_QUEUE_PATTERN_ERROR = 'PAYMENT_ERROR',
}
