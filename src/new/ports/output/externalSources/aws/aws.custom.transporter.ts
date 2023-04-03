import {Logger} from '@nestjs/common'
import {ConfigService} from '@nestjs/config'
import {CustomTransportStrategy, Server, Transport} from '@nestjs/microservices'
import * as AWS from 'aws-sdk'
import {SqsContext} from './sqs.context'

export class SqsTransporter extends Server implements CustomTransportStrategy {
  private sqs: AWS.SQS
  private queueUrl: string
  private maxNumberMessages: number
  private pollingTime: number
  private config = new ConfigService()
  private AWS_REGION = this.config.get('AWS_REGION')

  constructor(config: AWS.SQS.Types.ReceiveMessageRequest) {
    Logger.log('sqs config')
    super()
    this.queueUrl = config.QueueUrl
    this.maxNumberMessages =
      config.MaxNumberOfMessages > 10 ? 10 : config.MaxNumberOfMessages
    this.pollingTime = config.WaitTimeSeconds
    this.sqs = new AWS.SQS({region: this.AWS_REGION})
  }

  transportId?: Transport
  listen(callback: (...optionalParams: unknown[]) => any) {
    this.start()
    callback()
  }

  start() {
    Logger.log('[SQS Consumer] start')
    setInterval(() => {
      this.receiveMessages(this.maxNumberMessages)
    }, this.pollingTime)
  }

  async receiveMessages(maxNumberMessages: number) {
    this.sqs.receiveMessage(
      {
        QueueUrl: this.queueUrl,
        MaxNumberOfMessages: maxNumberMessages,
      },
      (err, data) => {
        if (err) {
          Logger.log(`Error in receive message. Error Message: ${err}`)
          return
        }
        if (data.Messages) {
          for (const message of data.Messages) {
            try {
              const payload = JSON.parse(message.Body)

              const pattern = payload.pattern

              const context = new SqsContext([
                message,
                this.sqs,
                pattern,
                this.queueUrl,
              ])

              Logger.debug('[SQS HANDLER EVENT]', payload)

              this.handleEvent(
                pattern,
                {
                  data: payload.data,
                  pattern: pattern,
                },
                context,
              )
            } catch (error) {
              Logger.error(`Error in process message. Error: ${error}`)
            }
          }
        }
      },
    )
  }

  close() {
    Logger.log('sqs transporter close')
  }
}
