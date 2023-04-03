import {Injectable} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm'
import {userCategory} from '~/modules/database/entity/userCategory.entity'

@Injectable()
export class UserCategoryRepository {
  constructor(
    @InjectRepository(userCategory)
    private readonly repo: Repository<userCategory>,
  ) {}

  public async findByCategory(category: string): Promise<userCategory | null> {
    return await this.repo.findOneBy({category})
  }
}
