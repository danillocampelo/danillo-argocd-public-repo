import {ConflictException, Injectable, NotFoundException} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm'
import {User} from '../database/entity/user.entity'
import {Document} from '../database/entity/document.entity'
import {DocumentDto} from './dto/document.dto'
import {UpdateUserDto} from './dto/update-user.dto'
import {UserDto} from './dto/create-user.dto'

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async createNewUser(dto: UserDto): Promise<User> {
    await this.hasUserOrDocument({
      email: dto.email,
      documents: dto.documents,
    })

    const user = this.repository.create(dto)
    return await this.repository.save(user)
  }

  async getAllUsers(params: {skip?: number; take?: number}): Promise<User[]> {
    const {skip, take} = params

    const [result] = await this.repository.findAndCount({
      take: take,
      skip: skip,
      relations: {
        address: true,
        documents: true,
      },
      order: {
        id: 'ASC',
      },
    })

    return result
  }

  async getUserByID(id: number): Promise<User> {
    const user = await this.repository.findOne({
      relations: {
        address: true,
        documents: true,
      },
      where: {id: id},
    })

    if (!user) {
      throw new NotFoundException('User not found')
    }

    return user
  }

  async updateUserById(id: number, dto: UpdateUserDto) {
    const user = await this.repository.findOneBy({id})

    if (!user) {
      throw new NotFoundException('User not found')
    }

    Object.assign(user, dto)

    await this.repository.save(user)

    return dto
  }

  async deleteUserByID(id: number) {
    const user = await this.repository.findOneBy({id: id})

    if (!user) {
      throw new NotFoundException('Experience not found')
    }
    user.deletedAt = new Date()
    await this.repository.save(user)
    await this.repository.remove(user)

    return user
  }

  async hasUserOrDocument(dto: {email: string; documents: DocumentDto[]}) {
    const user = await this.repository.findOneBy({
      email: dto.email,
    })

    const arrayDocuments = dto.documents.map(({document}) => document)

    const documents = await this.repository
      .createQueryBuilder()
      .select('document')
      .from(Document, 'document')
      .where('document IN(:...id)', {id: arrayDocuments})
      .getOne()

    if (user || documents) {
      throw new ConflictException('user or document already exists')
    }

    return !!user
  }
}
