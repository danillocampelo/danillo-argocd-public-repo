import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common'
import {ApiQuery, ApiResponse, ApiTags} from '@nestjs/swagger'
import {
  IResponse,
  ResponseHttp,
} from '~/common/responseHttp/responseHttp.entity'
import {CreatePackageDto} from './dto/package.create.dto'
import {PackageEntity} from './entity/package.entity'
import {packageOutputEntity} from './entity/package.output.entity'
import {PackageService} from './package.service'

@Controller('packages/old')
export class PackageController {
  constructor(private readonly service: PackageService) {}

  @ApiTags('packages')
  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'search package by id',
    type: packageOutputEntity,
  })
  async getPackageByIdSmile(@Param('id') id: string): Promise<IResponse> {
    return await this.service.smileGetById({id})
  }

  @ApiTags('packages')
  @Post('')
  @ApiResponse({status: 201, description: '', type: PackageEntity})
  create(@Body() payload: CreatePackageDto): Promise<any> {
    return this.service.create(payload)
  }

  @ApiTags('packages')
  @Get('')
  @ApiQuery({name: 'experiences', type: Number, required: false, isArray: true})
  @ApiQuery({name: 'highlight', type: Boolean, required: false})
  @ApiQuery({name: 'limit', type: Number, example: 10, required: false})
  @ApiQuery({name: 'Offset', type: Number, example: 0, required: false})
  @ApiQuery({
    name: 'onlyAvailable',
    type: Boolean,
    example: false,
    required: false,
    description:
      'If true, endpoinnt will only return packages with availability',
  })
  @ApiResponse({
    status: 200,
    type: [PackageEntity],
  })
  async getPackagesWithPagination(
    @Query('experiences') experiences: number[],
    @Query('highlight') highlight: boolean,
    @Query('limit') limit: string,
    @Query('Offset') Offset: string,
    @Query('onlyAvailable') onlyAvailable: boolean,
  ): Promise<any> {
    return new ResponseHttp({
      entity: this.service.packages(
        experiences,
        highlight,
        limit,
        Offset,
        onlyAvailable,
      ),
    })
  }

  @ApiTags('packages')
  @Patch(':id/')
  @ApiResponse({
    status: 200,
    description: 'Update data',
    type: PackageEntity,
  })
  async upPackage(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: PackageEntity,
  ): Promise<any> {
    return this.service.updatePackage(id, payload)
  }

  @ApiTags('packages')
  @Delete(':id/')
  async delPackage(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.service.deletePackage(id)
  }
}
