import {Body, Controller, Get, Param, Post} from '@nestjs/common'
import {ApiBody, ApiParam, ApiResponse, ApiTags} from '@nestjs/swagger'
import {UserAuthentication} from '~/common/auth/models/UserAuthentication'
import {Authorized} from '../../common/auth/Authorized'
import {CurrentUser} from '../../common/auth/CurrentUser'
import {ResponseHttp} from '../../common/responseHttp/responseHttp.entity'
import {BookingService} from './booking.service'
import {BookingsDTO} from './dto/bookings.dto'

@ApiTags('booking')
@Controller('booking')
export class BookingController {
  constructor(private readonly service: BookingService) {}

  @ApiResponse({
    status: 200,
    description: 'Returns the bookings purchased by logged user.',
    type: BookingsDTO,
  })
  @Get('/')
  @Authorized()
  async getUserBookings(@CurrentUser() user: UserAuthentication): Promise<any> {
    return new ResponseHttp({
      entity: await this.service.getUserBookings(parseInt(user.memberNumber)),
    })
  }

  @ApiResponse({
    status: 200,
    description: 'Returns the details of a booking.',
    type: BookingsDTO,
  })
  @ApiParam({
    description: 'booking id',
    name: 'id',
    type: 'string',
  })
  @Get('/:id')
  @Authorized()
  async getBookingDetail(@Param('id') id: string): Promise<any> {
    return new ResponseHttp({
      entity: await this.service.getBookingDetail(id),
    })
  }
}
