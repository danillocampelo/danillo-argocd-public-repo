import {
  Controller,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import {FileInterceptor} from '@nestjs/platform-express'
import {ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger'
import {
  IResponse,
  ResponseHttp,
} from '~/common/responseHttp/responseHttp.entity'
import {IntegrationService} from './integration.service'

@Controller('integration')
@ApiTags('integration')
export class IntegrationController {
  constructor(private readonly integrationService: IntegrationService) {}

  @Post('package')
  @ApiOperation({summary: 'Create or update packages based on a csv file'})
  @ApiResponse({
    status: 201,
  })
  @UseInterceptors(FileInterceptor('file'))
  async packageFileIntegration(@UploadedFile() file: Express.Multer.File) {
    await this.integrationService.packageCSVIntegration(file)
    return new ResponseHttp<IResponse>({
      statusCode: HttpStatus.CREATED,
      message: 'Packages created successfully',
    })
  }
}
