import {createParamDecorator, ExecutionContext} from '@nestjs/common'
import {UserAuthentication} from './models/UserAuthentication'

/**
 * CurrentUser is a parameter decorator that returns logged user.
 * So one can use it to inject user data into a controller method. See an example below:
 *
 * @Controller('example')
 * export class Example Controller {
 *   constructor() {}
 *
 *   @Get('/')
 *   async getExample(
 *     @CurrentUser() user, // <-- use it in methods parameters definition
 *   ): Promise<string> {
 *     console.log('user: ', user)
 *     return 'OK'
 *   }
 * }
 *
 */
export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    return context.switchToHttp().getRequest().user as UserAuthentication
  },
)
