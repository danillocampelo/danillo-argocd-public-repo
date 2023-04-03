import {Controller, Get, Post} from '@nestjs/common'
import {ApiExcludeController} from '@nestjs/swagger'

import {SeedService} from './seed.service'

@ApiExcludeController()
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Post('mock')
  async createRoles() {
    await this.seedService.seed()

    return 'Seeds executadas com sucesso.'
  }

  @Get()
  async getPackages() {
    return await this.seedService.getPack()
  }

  @Post('/random')
  async getPackages2() {
    return await this.seedService.seedRandom()
  }
}
