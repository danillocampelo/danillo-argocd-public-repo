import {Controller, Get, Inject, Query} from '@nestjs/common'
import {ApiQuery, ApiResponse, ApiTags} from '@nestjs/swagger'
import {ResponseHttp} from '../../../../../common/responseHttp/responseHttp.entity'
import {LocalityApiAdapter} from '../../../../adapters/input/api/locality/locality.api.adapter'
import {LocalityService} from '../../../../core/locality/locality.service'
import {LocationSearchOutput} from './dto/location.search.dto'

@Controller('/locality')
export class LocalityController {
  @Inject()
  private readonly service: LocalityService

  @Inject()
  private readonly localityAdapter: LocalityApiAdapter

  @ApiTags('locality')
  @Get('')
  @ApiQuery({
    name: 'query',
    type: String,
    required: true,
    description: 'Query for a location. Minimum length is 3.',
  })
  @ApiResponse({
    status: 200,
    type: [LocationSearchOutput],
  })
  public async search(@Query('query') query: string) {
    const result = await this.service.search(query)
    return new ResponseHttp<LocationSearchOutput[]>({
      entity: result.map((item) =>
        this.localityAdapter.toLocalityOutputFromLocality(item),
      ),
    })
  }
}
