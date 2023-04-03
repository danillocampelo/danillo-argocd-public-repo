import {Injectable} from '@nestjs/common'
import {
  IResponse,
  ResponseHttp,
} from './common/responseHttp/responseHttp.entity'

@Injectable()
export class AppService {
  getHello(): ResponseHttp<IResponse> {
    return new ResponseHttp<IResponse>({
      statusCode: 200,
      entity: {data: 'hello'},
    })
  }
}
