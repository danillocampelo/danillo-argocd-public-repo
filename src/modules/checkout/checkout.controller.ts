import {Body, Controller, Get, HttpStatus, Post, Query} from '@nestjs/common'
import {ApiQuery, ApiResponse, ApiTags} from '@nestjs/swagger'
import {Authorized} from '~/common/auth/Authorized'
import {CurrentUser} from '~/common/auth/CurrentUser'
import {UserAuthentication} from '~/common/auth/models/UserAuthentication'
import {QueryRequired} from '~/helpers/QueryRequired'
import {
  IResponse,
  ResponseHttp,
} from '../../common/responseHttp/responseHttp.entity'
import {PackageType} from '../infotravel/constants/constant'
import {AvailbilityQueryDTO} from '../packages/dto/package.hotels.rooms.dto'
import {CheckoutService} from './checkout.service'
import {AvailbilityDTO} from './dto/availbility.dto'
import {CheckoutOriginDTO} from './dto/checkout.origin.dto'
import {CheckRatesDTO} from './dto/checkrate.dto'
import {CheckRatesInputDto} from './dto/checkrate.input.dto'
import {FlightInputDTO} from './dto/flight.input.dto'

@ApiTags('checkout')
@Controller('checkout')
export class CheckoutController {
  constructor(private readonly service: CheckoutService) {}

  @Get('availability')
  async availability(
    @QueryRequired('startDate') startDate: string,
    @QueryRequired('endDate') endDate: string,
    @QueryRequired('origin') origin: string,
    @QueryRequired('destination') destination: string,
    @QueryRequired('occupancy') occupancy: string,
    @Query('fields') fields: string,
  ) {
    return new ResponseHttp({
      entity: this.service.availability({
        startDate,
        endDate,
        origin: parseInt(origin),
        occupancy: occupancy,
        destination: parseInt(destination),
        fields,
      }),
      statusCode: HttpStatus.OK,
    })
  }

  @Get('/flights')
  async getFlights(@Query() availbilityQuery: FlightInputDTO) {
    return await this.service.getFlightAvailbility(availbilityQuery)
  }

  @Get('/origins')
  @ApiResponse({
    status: 200,
    description:
      'Returns registred origins. If a query string is sent, it searches for origins that contain this query.',
    type: CheckoutOriginDTO,
  })
  @ApiQuery({
    name: 'query',
    description: 'Query string used to search registred origins',
    required: false,
  })
  @ApiQuery({
    name: 'type',
    description:
      'It can be either "hotel" or "hotel_flight". If none is sent, default value is "hotel_flight"',
    required: false,
  })
  @Get('origin')
  async getOrigins(
    @Query('query') query: string,
    @Query('type') type: string,
  ): Promise<ResponseHttp<CheckoutOriginDTO>> {
    return new ResponseHttp({
      entity: await this.service.getOrigins({
        query,
        packageType: type as PackageType,
      }),
      statusCode: HttpStatus.OK,
    })
  }

  @ApiResponse({
    status: 200,
    description:
      'Returns availability of hotels, flights and insurance information based on submitted parameters',
    type: AvailbilityDTO,
  })
  @Get('availability/package')
  @Authorized()
  async getAvailbility(
    @Query() availbilityQuery: AvailbilityQueryDTO,
    @CurrentUser() user: UserAuthentication,
  ): Promise<ResponseHttp<IResponse>> {
    return await this.service.getPackageAvailbility({
      ...availbilityQuery,
      clientId: user.memberNumber,
    })
  }

  @ApiResponse({
    status: 200,
    description:
      'Returns the rate for the checkout. Use this endpoint before creating a reservation.',
    type: CheckRatesDTO,
  })
  @Post('/checkRate')
  @Authorized()
  async checkRate(
    @Body() input: CheckRatesInputDto,
    @CurrentUser() user: UserAuthentication,
  ): Promise<ResponseHttp<CheckRatesDTO>> {
    return new ResponseHttp({
      entity: await this.service.checkRates(input, user),
      statusCode: HttpStatus.CREATED,
    })
  }
}
