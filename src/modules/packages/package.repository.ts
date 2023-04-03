import {Injectable} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {FindOptionsWhere, In, Repository} from 'typeorm'
import {Package} from '../database/entity/package.entity'
import {IPackageWithRelations} from './interfaces/package.interface'

export enum TransactionCommand {
  SAVE = 'save',
  UPDATE = 'update',
}

export interface PackageTransactionInput {
  package: Partial<Package>
  command: TransactionCommand
}
@Injectable()
export class PackageRepository {
  constructor(
    @InjectRepository(Package)
    private readonly repo: Repository<Package>,
  ) {}

  async package(packageWhereUniqueInput: {
    id: number
  }): Promise<Package | null> {
    return await this.repo.findOne({where: {id: packageWhereUniqueInput.id}})
  }

  async packageFullInfoById(
    packageWhereUniqueInput: any,
  ): Promise<IPackageWithRelations> {
    const packages = await this.repo.findOne({
      relations: {
        trivia: true,
        itemDetail: true,
        experiences: true,
      },
      where: {id: packageWhereUniqueInput.id},
    })

    return packages as any
  }

  async packageFullInfoByExternalId(
    where: FindOptionsWhere<Package>,
  ): Promise<IPackageWithRelations> {
    const packages = await this.repo.findOne({
      relations: {
        trivia: true,
        itemDetail: true,
        experiences: true,
      },
      where: where,
    })

    return packages as any
  }

  async packages(params: {
    skip?: number
    take?: number
    where: {experiences?: {ids: number[]}; highlight?: boolean}
  }): Promise<Package[]> {
    const {skip, take, where} = params

    const [result, total] = await this.repo.findAndCount({
      where: {
        experiences: where.experiences ? {id: In(where.experiences.ids)} : null,
        highlight: where.highlight,
      },
      take: take,
      skip: skip,
      relations: {
        trivia: true,
        itemDetail: true,
        experiences: true,
      },
    })

    return result
  }

  async createPackage(data: Package): Promise<Package> {
    const pack = await this.repo.create(data)
    pack.createdAt = new Date()
    pack.updatedAt = new Date()
    return this.repo.save(pack)
  }

  async updatePackage(id, payload): Promise<any> {
    return await this.repo.update(id, payload)
  }

  async deletePackage(id: number): Promise<any> {
    const package2 = await this.repo.findOneBy({id: id})
    return await this.repo.remove(package2)
  }

  async packageByExternalId(externalId: string): Promise<Package> {
    return await this.repo.findOneBy({externalId})
  }

  async bulkSaveOrUpdate(input: PackageTransactionInput[]) {
    return await this.repo.manager.transaction(
      async (transactionalEntityManager) => {
        for await (const record of input) {
          if (record.command === TransactionCommand.SAVE) {
            await transactionalEntityManager.save(Package, record.package)
          }

          if (record.command === TransactionCommand.UPDATE) {
            await transactionalEntityManager.update(
              Package,
              {id: record.package.id},
              record.package,
            )
          }
        }
      },
    )
  }
}
