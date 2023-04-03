import {HttpStatus} from '@nestjs/common'

export class ResponseHttp<T extends IResponse> {
  constructor({
    entity,
    message,
    rawMessage,
    statusCode = HttpStatus.OK,
  }: NamedParameters) {
    this.statusCode = statusCode
    this.entity = entity
    this.message = message
    this.rawMessage = rawMessage
  }
  public entity: T
  public statusCode: number
  public message: string
  public rawMessage: string
}

export interface IResponse {}

interface NamedParameters {
  statusCode?: number
  entity?: any
  message?: string
  rawMessage?: string
}
