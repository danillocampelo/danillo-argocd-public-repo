import {createParamDecorator, ExecutionContext} from '@nestjs/common'

export const CurrentToken = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    return context.switchToHttp().getRequest().tokenSml
  },
)
