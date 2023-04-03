import {SetMetadata} from '@nestjs/common'
import {ApiHeader} from '@nestjs/swagger'
import {SHOULD_VALIDATE_TOKEN_METADATA} from './constants'

/**
 * Turns one or more routes into private ones, which demands a valid token.
 *
 * It works as a class decorator, applying this rule in all routes inside a controller:
 *
 * @Controller('example')
 * @Authorized() // <-- here
 * export class Example Controller {
 *   constructor() {}
 *
 *   @Get('/')
 *   async getExample(): Promise<string> { // <-- if no token is sent, it will return 403 status code
 *     return 'OK'
 *   }
 * }
 *
 *
 * And as a method decorator, allowing to apply this rule in a single route
 *
 * @Controller('example')
 * export class Example Controller {
 *   constructor() {}
 *
 *   @Get('/')
 *   async getExample(): Promise<string> { // <-- if no token is sent, it will return 200 status code
 *     return 'OK'
 *   }
 *
 *   @Get('/profile')
 *   @Authorized()
 *   async getExample(): Promise<string> { // <-- if no token is sent, it will return 403 status code
 *     return 'OK'
 *   }
 * }
 *
 */

export const Authorized = () => {
  const setMetadataFn = SetMetadata(SHOULD_VALIDATE_TOKEN_METADATA, true)
  const apiHeaderFn = ApiHeader({
    name: 'Authorization',
    description: 'JWT Auth token',
    required: true,
  })

  return function (target: any, key: string, descriptor: any) {
    setMetadataFn(target, key, descriptor)
    apiHeaderFn(target, key, descriptor)
  }
}
