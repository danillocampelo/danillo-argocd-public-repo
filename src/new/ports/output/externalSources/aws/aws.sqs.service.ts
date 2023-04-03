import {Injectable, Logger} from '@nestjs/common'
import {ConfigService} from '@nestjs/config'
import * as AWS from 'aws-sdk'
import {sendMessage} from '~/new/core/payment/models/payment.notification'
import {PaymentQueue} from '~/new/core/payment/queue/payment.queue'

@Injectable()
export class AWSService implements PaymentQueue {
  private config = new ConfigService()
  private AWS_REGION = this.config.get('AWS_REGION')
  private sqsService = new AWS.SQS({region: this.AWS_REGION})

  sendMessage(params: sendMessage) {
    return new Promise((resolve, reject) => {
      return this.sqsService.sendMessage(params, function (err, data) {
        if (err) {
          Logger.error('SQS ERR:', 'Fail Send Message' + err)
          reject(err)
        } else {
          resolve(data.MessageId)
        }
      })
    })
  }
}
