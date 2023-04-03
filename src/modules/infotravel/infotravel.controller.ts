import {Controller, Get} from '@nestjs/common'
import {ApiTags} from '@nestjs/swagger'
import {InfotravelService} from './infotravel.service'

@ApiTags('infotravel')
@Controller('infotravel')
export class InfotravelController {
  constructor(private readonly service: InfotravelService) {}

  @Get()
  getInfotravel() {
    return this.service.getInfotravel()
  }
  @Get('valid-token')
  validToken() {
    return this.service.validToken()
  }
}
