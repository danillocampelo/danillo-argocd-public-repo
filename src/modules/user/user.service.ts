import {Injectable} from '@nestjs/common'
import {UpdateUserDto} from './dto/update-user.dto'
import {UserDto} from './dto/create-user.dto'
import {UserRepository} from './user.repository'

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  createNewUser(dto: UserDto) {
    return this.userRepository.createNewUser(dto)
  }

  getAllUsers(limit: string, offset: string) {
    return this.userRepository.getAllUsers({
      take: Number(limit) || 100,
      skip: Number(offset) || 0,
    })
  }

  getUserById(id: number) {
    return this.userRepository.getUserByID(id)
  }

  updateUserById(id: number, dto: UpdateUserDto) {
    return this.userRepository.updateUserById(id, dto)
  }

  deleteUserById(id: number) {
    return this.userRepository.deleteUserByID(id)
  }
}
