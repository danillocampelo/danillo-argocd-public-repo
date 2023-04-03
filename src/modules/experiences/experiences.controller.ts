import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common'
import {ApiResponse, ApiTags} from '@nestjs/swagger'
import {ExperienceDto} from './dto/experiences.dto'
import {ExperiencesService} from './experiences.service'
import {ExperienceOutput} from './interfaces'

@ApiTags('experience')
@Controller('experiences')
export class ExperiencesController {
  constructor(private readonly service: ExperiencesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: ExperienceOutput,
  })
  async createNewExperience(@Body() dto: ExperienceDto) {
    return await this.service.createNewExperience(dto)
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    type: [ExperienceOutput],
  })
  async getAllExperiences() {
    return await this.service.getAllExperiences()
  }

  @Get(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    type: ExperienceOutput,
  })
  async getExperienceByID(@Param('id') id: number) {
    return await this.service.getExperienceByID(id)
  }

  @Put(':id')
  @ApiResponse({
    status: HttpStatus.OK,
    type: ExperienceOutput,
  })
  async updateExperienceByID(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ExperienceDto,
  ) {
    return await this.service.updateExperienceById(id, dto)
  }

  @Delete(':id/')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteExperienceByID(@Param('id') id: number) {
    return await this.service.deleteExperienceByID(id)
  }
}
