import {DynamicModule} from '@nestjs/common'
import {ConfigService} from '@nestjs/config'
import {TypeOrmModule} from '@nestjs/typeorm'
import * as path from 'path'
import {DataSourceOptions} from 'typeorm'
import {parseUri, ReturnParseUri} from '~/helpers/parse-uri'

export function getOrmConfig(): DataSourceOptions {
  const _configService = new ConfigService()
  const DATABASE_URI = _configService.get('DATABASE_URL')

  if (!DATABASE_URI) {
    throw new Error('DATABASE_URL not specified')
  }

  const dbConfig: ReturnParseUri = parseUri(DATABASE_URI)

  return {
    type: 'postgres',
    host: dbConfig.host,
    port: dbConfig.port,
    username: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
    synchronize: false,
    logging: false,
    entities: [path.join(__dirname, '../**/{*.entity.ts,*.entity.js}')],
    migrations: [path.join(__dirname, '../database/migrations/**/{*.ts,*.js}')],
  }
}

export class DatabaseModule {
  static orm(): DynamicModule {
    const ormConfig: DataSourceOptions = getOrmConfig()

    return {
      module: DatabaseModule,
      imports: [TypeOrmModule.forRoot(ormConfig)],
      exports: [DatabaseModule],
    }
  }
}
