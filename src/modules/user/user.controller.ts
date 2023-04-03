import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common'
import {UpdateUserDto} from './dto/update-user.dto'
import {UserDto} from './dto/create-user.dto'
import {UserService} from './user.service'
import {ApiQuery, ApiResponse, ApiTags} from '@nestjs/swagger'
import {UserOutputEntity} from './entity/user.output.entity'

@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {}

  @ApiTags('users')
  @Post()
  @ApiResponse({
    status: 201,
    description: 'create user',
    type: UserOutputEntity,
  })
  async createNewUser(@Body() dto: UserDto) {
    return await this.service.createNewUser(dto)
  }

  @ApiTags('users')
  @ApiQuery({name: 'limit', type: Number, example: 10, required: false})
  @ApiQuery({name: 'offset', type: Number, example: 0, required: false})
  @ApiResponse({
    status: 200,
    type: UserOutputEntity,
  })
  @Get()
  async getAllUser(
    @Query('limit') limit: string,
    @Query('offset') offset: string,
  ) {
    return await this.service.getAllUsers(limit, offset)
  }

  @ApiTags('users')
  @ApiResponse({
    status: 200,
    description: 'search user by id',
  })
  @Get(':id')
  async getUserById(@Param('id') id: number) {
    return await this.service.getUserById(id)
  }

  @ApiTags('users')
  @ApiResponse({
    status: 200,
    description: 'update user',
    type: UserOutputEntity,
  })
  @Patch(':id')
  async updateUserById(@Param('id') id: number, @Body() dto: UpdateUserDto) {
    return await this.service.updateUserById(id, dto)
  }

  @ApiTags('users')
  @ApiResponse({
    status: 204,
    description: 'delete user',
  })
  @Delete(':id')
  async deleteUserById(@Param('id') id: number) {
    return await this.service.deleteUserById(id)
  }
}
