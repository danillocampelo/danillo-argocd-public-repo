import {Controller, Get, Inject, Param, Query} from '@nestjs/common'
import {ApiParam, ApiQuery, ApiResponse, ApiTags} from '@nestjs/swagger'
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
    const normalizedQuery = query
      ?.normalize('NFD')
      ?.replace(/\p{Diacritic}/gu, '')
      .toLowerCase()
    const result = await this.service.search(normalizedQuery)
    return new ResponseHttp<LocationSearchOutput[]>({
      entity: result.map((item) =>
        this.localityAdapter.toLocalityOutputFromLocality(item),
      ),
    })
  }

  @ApiTags('locality')
  @Get('/:id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'Location id, send as string',
  })
  @ApiResponse({
    status: 200,
    type: LocationSearchOutput,
  })
  public async findOne(@Param('id') id: string) {
    const result = await this.service.getById(id)
    return new ResponseHttp<LocationSearchOutput>({
      entity: this.localityAdapter.toLocalityOutputFromLocality(result),
    })
  }
}
