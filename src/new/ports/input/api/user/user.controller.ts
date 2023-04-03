import {Controller, Get} from '@nestjs/common'
import {ApiResponse, ApiTags} from '@nestjs/swagger'
import {Authorized} from '~/common/auth/Authorized'
import {CurrentToken} from '~/common/auth/CurrentToken'
import {CurrentUser} from '~/common/auth/CurrentUser'
import {UserAuthentication} from '~/common/auth/models/UserAuthentication'
import {UserService} from '~/new/core/user/user.service'

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @ApiTags('user')
  @ApiResponse({
    status: 200,
  })
  @Authorized()
  @Get('/after-login')
  async afterLogin(
    @CurrentUser() user: UserAuthentication,
    @CurrentToken() token,
  ) {
    return await this.service.createUserIfNotExist(user, token)
  }

  @ApiTags('user')
  @ApiResponse({
    status: 200,
  })
  @Authorized()
  @Get('/me')
  async usersMe(
    @CurrentUser() user: UserAuthentication,
    @CurrentToken() token,
  ) {
    return await this.service.usersMe(user, token)
  }
}
