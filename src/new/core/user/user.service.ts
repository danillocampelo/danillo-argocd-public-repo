import {HttpStatus, Injectable, Logger} from '@nestjs/common'
import {UserAuthentication} from '~/common/auth/models/UserAuthentication'
import {
  IResponse,
  ResponseHttp,
} from '~/common/responseHttp/responseHttp.entity'
import {InfotravelService} from '~/modules/infotravel/infotravel.service'
import {UserCategoryRepository} from '~/new/ports/input/api/user/user.repository'
import {SmilesService} from '~/new/ports/output/externalSources/smiles/smiles.user.service'

@Injectable()
export class UserService {
  constructor(
    private readonly infotravelDataSource: InfotravelService,
    private readonly userDataSource: SmilesService,
    private readonly userCategoryRepository: UserCategoryRepository,
  ) {}
  private logger = new Logger(UserService.name)

  async createUserIfNotExist(
    user: UserAuthentication,
    token: string,
  ): Promise<ResponseHttp<IResponse>> {
    try {
      const userInfotravel =
        await this.infotravelDataSource.getUserByMemberCode(user.memberNumber)
      if (userInfotravel) {
        return new ResponseHttp({entity: userInfotravel})
      }

      const userSmiles = await this.userDataSource.getUserInfos(token)

      const category = await this.userCategoryRepository.findByCategory(
        userSmiles.category,
      )
      const userCreated = await this.infotravelDataSource.createUserInfotravel(
        userSmiles,
        category,
      )
      if (!userCreated || userCreated.isSuccess === false) {
        return new ResponseHttp({
          statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
          message:
            'Não foi possivel realizar a criação do usuario no serviço externo',
        })
      }

      return new ResponseHttp({entity: userCreated})
    } catch (error) {
      this.logger.error(error.message)
      return new ResponseHttp({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `Ocorreu um erro ao processar a requisição, erro: ${error.message}`,
      })
    }
  }

  async usersMe(user: UserAuthentication, token: string) {
    try {
      const userInfotravel =
        await this.infotravelDataSource.getUserByMemberCode(user.memberNumber)

      if (userInfotravel) {
        return new ResponseHttp({entity: userInfotravel})
      }
    } catch (error) {
      return new ResponseHttp({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `Ocorreu um erro ao processar a requisição, erro: ${error.message}`,
      })
    }
  }
}
