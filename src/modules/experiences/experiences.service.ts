import {HttpStatus, Injectable} from '@nestjs/common'
import {
  IResponse,
  ResponseHttp,
} from '~/common/responseHttp/responseHttp.entity'
import {InfotravelService} from '../infotravel/infotravel.service'
import {PackageWithRelationsEntity} from '../packages/entity/package.withRelations.entity'
import {
  parseToIPackagesOutPutList,
  parseToListWithoutExternalData,
} from '../../common/parsers/packageParses'
import {ExperienceDto} from './dto/experiences.dto'
import {ExperiencesRepository} from './experiences.repository'

@Injectable()
export class ExperiencesService {
  constructor(
    private readonly experiencesRepository: ExperiencesRepository,
    private readonly infotravelService: InfotravelService,
  ) {}

  async createNewExperience(dto: ExperienceDto) {
    const data = await this.experiencesRepository.createNewExperience(dto)
    return new ResponseHttp<IResponse>({
      statusCode: HttpStatus.CREATED,
      entity: data,
    })
  }

  async getAllExperiences() {
    const experiences = await this.experiencesRepository.getAllExperiences()

    const packages: PackageWithRelationsEntity[] = experiences.reduce(
      (packages, experience) => [...packages, ...experience.packages],
      [],
    )

    const packagesExternalData = await Promise.all(
      packages.map((pck) =>
        this.infotravelService.infoTravelSearchPackageById(pck.externalId),
      ),
    )

    const parsedPackages = !!packagesExternalData
      ? parseToIPackagesOutPutList(packages as any, packagesExternalData)
      : parseToListWithoutExternalData(packages)

    const data = experiences.map((experience) => {
      const externalData = parsedPackages.filter((pck) =>
        experience.packages?.find(
          (experiencePck) => Number(experiencePck.externalId) === pck.id,
        ),
      )

      return {
        ...experience,
        packages: externalData,
      }
    })

    return new ResponseHttp<IResponse>({
      statusCode: HttpStatus.OK,
      entity: {data},
    })
  }

  async getExperienceByID(id: number) {
    const data = await this.experiencesRepository.getExperienceByID(id)

    return new ResponseHttp<IResponse>({
      statusCode: HttpStatus.OK,
      entity: data,
    })
  }

  async updateExperienceById(id: number, dto: ExperienceDto) {
    await this.experiencesRepository.updateExperienceById(id, dto)
    return new ResponseHttp<IResponse>({
      statusCode: HttpStatus.OK,
      entity: {id, ...dto},
    })
  }

  async deleteExperienceByID(id: number) {
    await this.experiencesRepository.deleteExperience(id)
    return new ResponseHttp<IResponse>({
      statusCode: HttpStatus.NO_CONTENT,
    })
  }
}
