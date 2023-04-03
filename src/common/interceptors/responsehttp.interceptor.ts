import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import {Observable} from 'rxjs'
import {map} from 'rxjs/operators'
import {IResponse, ResponseHttp} from '../responseHttp/responseHttp.entity'

interface ResponseMapper {
  validate: (data: ResponseHttp<IResponse>) => boolean
  map: (data: ResponseHttp<IResponse>) => any
}

const ResponseMappers: ResponseMapper[] = [
  {
    validate: (data) => !!data.rawMessage,
    map: (data) => data.rawMessage,
  },
  {
    validate: (data) => !!data.message?.length,
    map: (data) => ({message: data.message}),
  },
  {
    validate: (data) => !!data.entity,
    map: (data) => data.entity,
  },
]

@Injectable()
export class ResponseHttpInterceptor<T>
  implements NestInterceptor<T, ResponseHttp<IResponse>>
{
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data: ResponseHttp<IResponse>) => {
        context.switchToHttp().getResponse().statusCode = data.statusCode
        const mapper = ResponseMappers.find(({validate}) => validate(data))
        return mapper?.map(data) || data
      }),
    )
  }
}
