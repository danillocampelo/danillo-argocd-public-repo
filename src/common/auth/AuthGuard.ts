import {Injectable, CanActivate, ExecutionContext} from '@nestjs/common'
import {Reflector} from '@nestjs/core'
import {JwtService} from '@nestjs/jwt'
import {Observable} from 'rxjs'
import {SHOULD_VALIDATE_TOKEN_METADATA} from './constants'
import {
  SMILES_ACTIVE_STATUS,
  SMILES_AUDIENCES,
  SmilesAuth0TokenPayload,
  SmilesClaims,
} from './models/SmilesAuth0Token'
import {UserAuthentication} from './models/UserAuthentication'

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

    if (!this.checkAudiences(tokenPayload)) {
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

  private checkAudiences(tokenPayload: SmilesAuth0TokenPayload) {
    return tokenPayload.aud.some(
      (value) => SMILES_AUDIENCES.indexOf(value) !== -1,
    )
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
