export interface PaymentQueue {
  sendMessage(input: any): Promise<any>
}

export const PaymentQueue = Symbol('PaymentQueue')
