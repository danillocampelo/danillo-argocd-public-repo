import {CanActivate, ExecutionContext, Inject, Injectable} from '@nestjs/common'
import {ConfigService} from '@nestjs/config'
import {Reflector} from '@nestjs/core'
import {JwtService} from '@nestjs/jwt'
import {Observable} from 'rxjs'
import {SHOULD_VALIDATE_TOKEN_METADATA} from './constants'
import {
  SmilesAuth0TokenPayload,
  SmilesClaims,
  SMILES_ACTIVE_STATUS,
  SMILES_AUDIENCES,
} from './models/SmilesAuth0Token'
import {UserAuthentication} from './models/UserAuthentication'

import {AuthGuard as defaultAuthGuard} from '@nestjs/passport'
import {InfotravelService} from '~/modules/infotravel/infotravel.service'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPrivateController = this.reflector.get<boolean>(
      SHOULD_VALIDATE_TOKEN_METADATA,
      context.getClass(),
    )
    const isPrivateRoute = this.reflector.get<boolean>(
      SHOULD_VALIDATE_TOKEN_METADATA,
      context.getHandler(),
    )

    if (!isPrivateRoute && !isPrivateController) {
      return true
    }

    const request = context.switchToHttp().getRequest()
    const tokenPayload = this.decodeTokenFromRequest(request)

    if (!tokenPayload) {
      return false
    }

    if (this.checkIsExpired(tokenPayload)) {
      return false
    }

    if (!this.checkIsActive(tokenPayload)) {
      return false
    }

    request.user = this.mountUser(tokenPayload)
    request.tokenSml =
      request.headers.Authorization || request.headers.authorization
    return !!request.user
  }

  private decodeTokenFromRequest(
    request: any,
  ): SmilesAuth0TokenPayload | undefined {
    const token = request.headers.Authorization || request.headers.authorization
    const user = token
      ? (this.jwtService.decode(token) as SmilesAuth0TokenPayload)
      : undefined

    return user
  }

  private checkIsExpired(tokenPayload: SmilesAuth0TokenPayload) {
    return (
      new Date().getTime() - new Date(tokenPayload.exp * 1000).getTime() >= 0
    )
  }

  private checkIsActive(tokenPayload: SmilesAuth0TokenPayload) {
    const memberStatusKey = Object.keys(tokenPayload || {}).find(
      (key) => key.indexOf(SmilesClaims.MEMBER_STATUS) !== -1,
    )

    return tokenPayload[memberStatusKey] === SMILES_ACTIVE_STATUS
  }

  private mountUser(tokenPayload: SmilesAuth0TokenPayload): UserAuthentication {
    const memberNumberKey = Object.keys(tokenPayload || {}).find(
      (key) => key.indexOf(SmilesClaims.MEMBER_NUMBER) !== -1,
    )

    return {
      memberNumber: tokenPayload[memberNumberKey] as string,
      id: tokenPayload.sub,
    }
  }
}

@Injectable()
export class AuthGuardDefaultUser
  extends defaultAuthGuard('defaultUser')
  implements CanActivate
{
  @Inject(InfotravelService)
  private readonly infotravel: InfotravelService
  configService = new ConfigService()
  INFOTERA_DEFAULT_USER = this.configService.get('INFOTERA_DEFAULT_USER')
  INFOTERA_DEFAULT_ID = this.configService.get('INFOTERA_DEFAULT_ID')
  constructor(private reflector: Reflector, private jwtService: JwtService) {
    super()
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest()
    const tokenPayload = this.decodeTokenFromRequest(request)
    request.user = tokenPayload
      ? this.mountUser(tokenPayload)
      : {
          memberNumber: this.INFOTERA_DEFAULT_USER,
          clientId: this.INFOTERA_DEFAULT_USER,
          id: this.INFOTERA_DEFAULT_ID,
        }
    return request.user
  }

  private decodeTokenFromRequest(
    request: any,
  ): SmilesAuth0TokenPayload | undefined {
    const token = request.headers.Authorization || request.headers.authorization
    const user = token
      ? (this.jwtService.decode(token) as SmilesAuth0TokenPayload)
      : undefined

    return user
  }

  private async mountUser(
    tokenPayload: SmilesAuth0TokenPayload,
  ): Promise<UserAuthentication> {
    const memberNumberKey = Object.keys(tokenPayload || {}).find(
      (key) => key.indexOf(SmilesClaims.MEMBER_NUMBER) !== -1,
    )

    const client = await (
      await this.infotravel.getUserByMemberCode(tokenPayload[memberNumberKey])
    ).id.toString()

    return {
      memberNumber: tokenPayload[memberNumberKey] as string,
      clientId: client,
      id: tokenPayload.sub,
    }
  }
}
