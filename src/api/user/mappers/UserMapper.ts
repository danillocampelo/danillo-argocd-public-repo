import { User } from '@models/User'
import { UserDto } from '../dtos/UserDto'

export const UserMapper = (userData: UserDto): User => {
  return {
    id: userData.id,
    name: userData.name,
    cpf: userData.cpf,
    birthDate: userData.dateNasc,
    rg: userData.rg,
    telephone: userData.tell,
    address: userData.address,
  }
}
