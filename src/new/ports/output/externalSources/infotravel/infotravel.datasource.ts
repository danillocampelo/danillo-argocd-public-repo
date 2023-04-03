import {IinfoteraPackageById} from '~/modules/infotravel/infotravel.interfaces'
import {InfotravelUserDTO} from '~/new/ports/driven/externalSources/infotravel/dto/InfotravelUserDTO'

export interface InfotravelDataSource {
  getUserByMemberCode(user: any): Promise<InfotravelUserDTO>
  createUserInfotravel(user: any)
  infoTravelSearchPackageById(id): Promise<IinfoteraPackageById>
}

export const InfotravelDataSource = Symbol('InfotravelDataSource')
