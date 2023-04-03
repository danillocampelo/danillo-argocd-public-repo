import {faker} from '@faker-js/faker'
import {Injectable} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm'
import {Package, Status} from '~/modules/database/entity/package.entity'
import {Experience} from '../entity/experience.entity'
import {ItemDetail} from '../entity/itemDetail.entity'
import {Trivia} from '../entity/trivia.entity'
import {IPackageSeed} from './dto/package-seed.dto'

@Injectable()
export class SeedRepository {
  constructor(
    @InjectRepository(Experience)
    private readonly repoExperience: Repository<Experience>,

    @InjectRepository(Package)
    private readonly repoPack: Repository<Package>,
  ) {}

  async createExperiences(experiences: string[]): Promise<void> {
    await Promise.all(
      experiences.map(async (name) => {
        if (!(await this.getExperience(name))) {
          await this.repoExperience.insert({
            name,
          })
        }
      }),
    )
  }

  async createPackages(packages: IPackageSeed[]): Promise<void> {
    await Promise.all(
      packages.map(async (pack) => {
        if (!(await this.checkPackage(pack.id))) {
          const {trivia, experience, information_items, ...rest} = pack
          const resultExperience = await this.getExperience(experience)
          console.log(trivia, information_items, resultExperience)
          try {
            await this.repoPack.save({
              ...rest,
              experiences: [
                {
                  id: resultExperience.id,
                },
              ],
            })
          } catch (error) {
            console.log(error)
          }
        }
      }),
    )
  }

  async createPackageFake() {
    const packageFaker = this.getRandomPackage()
    const exp = this.getRandomExériences()
    const trivia = this.getRandomTrivia()
    const informationItem = this.getRandomInformationItems()

    packageFaker.experiences = [exp]
    packageFaker.trivia = [trivia]
    packageFaker.itemDetail = [informationItem]
    return await this.repoPack.save(packageFaker)
  }

  private getRandomInformationItems() {
    const informationItem = new ItemDetail()
    informationItem.description = faker.word.verb()
    informationItem.icon = faker.word.verb()
    informationItem.title = faker.word.verb()
    informationItem.createdAt = new Date()
    informationItem.updatedAt = new Date()
    return informationItem
  }

  private getRandomTrivia() {
    const trivia = new Trivia()
    trivia.text = faker.word.verb()
    trivia.createdAt = new Date()
    trivia.updatedAt = new Date()
    trivia.boldText = faker.word.verb()
    return trivia
  }

  private getRandomExériences() {
    const exp = new Experience()
    exp.name = faker.word.verb()
    return exp
  }

  private getRandomPackage() {
    const packageFaker = new Package()
    packageFaker.title = faker.word.conjunction()
    packageFaker.subtitle = faker.word.conjunction()
    packageFaker.itinerarySubtitle = faker.word.conjunction()
    packageFaker.description = faker.word.conjunction()
    packageFaker.catchphrase = faker.word.conjunction()
    packageFaker.catchphraseIcon = faker.word.adjective()
    packageFaker.highlight = faker.datatype.boolean()
    packageFaker.externalDescription = faker.word.conjunction()
    packageFaker.externalId = '35'
    packageFaker.destination = faker.datatype.number({max: 9999}).toString()
    packageFaker.destinationType = 'M'
    packageFaker.occupancy = faker.datatype.number({max: 10}).toString()
    packageFaker.startDate = faker.datatype.datetime()
    packageFaker.endDate = faker.datatype.datetime()
    packageFaker.status = Status.ACTIVE
    return packageFaker
  }

  private async getExperience(name: string) {
    return this.repoExperience.findOneBy({
      name,
    })
  }
  private async checkPackage(id: number) {
    return this.repoPack.findOneBy({
      id,
    })
  }

  async getPackages() {
    return this.repoPack.find({
      relations: {
        experiences: true,
      },
    })
  }
}
