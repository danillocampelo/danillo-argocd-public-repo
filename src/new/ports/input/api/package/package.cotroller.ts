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
import {CreatePackageDto} from '~/modules/packages/dto/package.create.dto'
import {PackageEntity} from '~/modules/packages/entity/package.entity'
import {packageOutputEntity} from '~/modules/packages/entity/package.output.entity'
import {PackageServiceCreateUseCase} from '~/new/core/package/package.create.useCase'
import {PackageServiceCustomListUseCase} from '~/new/core/package/package.customPackage.list.useCase'
import {PackageServiceDeleteUseCase} from '~/new/core/package/package.delete.useCase'
import {PackageServiceGetByIdUseCase} from '~/new/core/package/package.getById.useCase'
import {PackageServiceListUseCase} from '~/new/core/package/package.list.useCase'
import {PackageServiceUpdateUseCase} from '~/new/core/package/package.update.useCase'
import {CustomPackageListDTO} from '~/new/ports/driven/api/dto/customPackageDTO'
@Controller('packages')
export class PackageController {
  constructor(
    private readonly createUseCase: PackageServiceCreateUseCase,
    private readonly deleteUseCase: PackageServiceDeleteUseCase,
    private readonly getByIdUseCase: PackageServiceGetByIdUseCase,
    private readonly updateUseCase: PackageServiceUpdateUseCase,
    private readonly listUseCase: PackageServiceListUseCase,
    private readonly listCustomCase: PackageServiceCustomListUseCase,
  ) {}

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
      entity: this.listUseCase.handler(
        experiences,
        highlight,
        limit,
        Offset,
        onlyAvailable,
      ),
    })
  }

  @ApiTags('packages')
  @Post('')
  @ApiResponse({status: 201, description: '', type: PackageEntity})
  create(@Body() payload: CreatePackageDto): Promise<any> {
    return this.createUseCase.create(payload)
  }

  @ApiTags('packages')
  @Delete(':id/')
  async delPackage(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.deleteUseCase.deletePackage(id)
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
    return this.updateUseCase.updatePackage(id, payload)
  }

  @ApiTags('packages')
  @Get('custom')
  @ApiResponse({
    status: 200,
    description: 'custom packages list',
    type: CustomPackageListDTO,
  })
  async getCustomPackageList(): Promise<IResponse> {
    return new ResponseHttp<IResponse>({
      statusCode: 200,
      entity: await this.listCustomCase.handle(),
    })
  }

  @ApiTags('packages')
  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'search package by id',
    type: packageOutputEntity,
  })
  async getPackageByIdSmile(@Param('id') id: string): Promise<IResponse> {
    return await this.getByIdUseCase.handler({id})
  }
}
