import {Injectable, NotFoundException} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm'
import {Experience} from '../database/entity/experience.entity'
import {ExperienceDto} from './dto/experiences.dto'

@Injectable()
export class ExperiencesRepository {
  constructor(
    @InjectRepository(Experience)
    private readonly repository: Repository<Experience>,
  ) {}

  async createNewExperience(dto: ExperienceDto): Promise<Experience> {
    const experience = this.repository.create(dto)
    return await this.repository.save(experience)
  }

  async getAllExperiences(): Promise<Experience[]> {
    return await this.repository.find({
      relations: {
        packages: true,
      },
    })
  }

  async getExperienceByID(id: number): Promise<Experience> {
    const experience = await this.repository.findOneBy({id})

    if (!experience) {
      throw new NotFoundException('Experience not found')
    }

    return experience
  }

  async getExperienceByName(name: string): Promise<Experience> {
    return this.repository.findOneBy({name})
  }

  async updateExperienceById(id: number, dto: ExperienceDto) {
    const experience = await this.repository.findOneBy({id})

    if (!experience) {
      throw new NotFoundException('Experience not found')
    }

    return await this.repository.update(id, dto)
  }

  async deleteExperience(id: number): Promise<Experience> {
    const experience = await this.repository.findOneBy({id: id})

    if (!experience) {
      throw new NotFoundException('Experience not found')
    }

    return await this.repository.remove(experience)
  }
}
