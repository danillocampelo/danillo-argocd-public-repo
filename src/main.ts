import {LogLevel, ValidationPipe} from '@nestjs/common'
import {ConfigService} from '@nestjs/config'
import {NestFactory} from '@nestjs/core'
import {MicroserviceOptions} from '@nestjs/microservices'
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger'
import {AppModule} from './app.module'
import {SqsTransporter} from './new/ports/output/externalSources/aws/aws.custom.transporter'

async function bootstrap() {
  const logger: LogLevel[] =
    process.env.NODE_ENV === 'production'
      ? ['log', 'error']
      : ['log', 'error', 'warn', 'debug', 'verbose']
  const app = await NestFactory.create(AppModule, {
    logger: logger,
  })
  const configService = new ConfigService()

  if (process.env.SQS_QUEUE_DISABLED !== '1') {
    const microservicePaymentConsumer =
      app.connectMicroservice<MicroserviceOptions>({
        strategy: new SqsTransporter({
          MaxNumberOfMessages: 10,
          WaitTimeSeconds: 1000,
          QueueUrl: configService.get('PAYMENT_CONSUMER_QUEUE_URL'),
        }),
      })

    const microservicePaymentConsumerFailure =
      app.connectMicroservice<MicroserviceOptions>({
        strategy: new SqsTransporter({
          MaxNumberOfMessages: 10,
          WaitTimeSeconds: 1000,
          QueueUrl: configService.get('PAYMENT_CONSUMER_QUEUE_URL_FAILURE'),
        }),
      })
  }

  if (process.env.SWAGGER_DOCS === '1') {
    const config = new DocumentBuilder()
      .addBearerAuth()
      .setTitle('Smiles')
      .setDescription('API Smiles')
      .setVersion('1.0')
      .build()

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('swagger', app, document)
  }

  app.useGlobalPipes(new ValidationPipe({transform: true}))
  app.select(AppModule), {fallbackOnErrors: true}

  app.enableCors()

  await app.startAllMicroservices()
  await app.listen(process.env.PORT || 3000)
}

bootstrap()
