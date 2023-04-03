import {Injectable, UnprocessableEntityException} from '@nestjs/common'
import {removeEmptyValues} from '~/helpers/remove-empty-values'
import {DetailType, ItemDetail} from '../database/entity/itemDetail.entity'
import {Package} from '../database/entity/package.entity'
import {ExperiencesRepository} from '../experiences/experiences.repository'
import {Experience} from '../packages/interfaces/package.interface'
import {IntegrationParser} from './integration.parser'

export enum packageCSVDictionary {
  EXERTNAL_ID = 'id_pacote',
  TITLE = 'titulo',
  SUBTITLE = 'subtitulo',
  CITY = 'cidade',
  STATE = 'estado',
  HIGHLIGHT = 'destaque',
  FIRST_DESCRIPTION = 'descricao_1',
  SECOND_DESCRIPTION = 'descricao_2',
  THIRD_DESCRIPTION = 'descricao_3',
  DETAIL_ITEM_TITLE = 'datalhe_titulo',
  DETAIL_ITEM_DESCRIPTION = 'datalhe_descricao',
  EXPERIENCE_NAME = 'nome_experiencia',
}

@Injectable()
export class IntegrationPackageParser {
  constructor(private readonly experiencesRepository: ExperiencesRepository) {}
  async parseCSVToPackage(
    file: Express.Multer.File,
  ): Promise<Partial<Package>[]> {
    try {
      const records = await IntegrationParser.parseCSV(file)
      const result = await Promise.all(
        records.map(async (parsedPackage) =>
          this.parseCSVRecordToPackage(parsedPackage),
        ),
      )
      return result
    } catch (error) {
      throw new UnprocessableEntityException('Unable to parse CSV')
    }
  }

  private async parseCSVRecordToPackage(
    record: any,
  ): Promise<Partial<Package>> {
    const mainItemDetails = this.handleMainItemDetails(record)

    const parsedPackage = {
      externalId: record[packageCSVDictionary.EXERTNAL_ID],
      title: record[packageCSVDictionary.TITLE],
      subtitle: record[packageCSVDictionary.SUBTITLE],
      city: record[packageCSVDictionary.CITY],
      state: record[packageCSVDictionary.STATE],
      highlight: this.handleBooleanCSVFields(
        record[packageCSVDictionary.HIGHLIGHT],
      ),
      itemDetail: [
        ...mainItemDetails,
        ...this.parseItemDetails(record),
      ] as ItemDetail[],
      experiences: [
        await this.handleExperiences(
          record[packageCSVDictionary.EXPERIENCE_NAME],
        ),
      ],
    }
    removeEmptyValues(parsedPackage)
    return parsedPackage
  }

  private handleBooleanCSVFields(value: string): boolean {
    const truthyCSValue = 'S'
    const falsyCSValue = 'N'

    if (value === truthyCSValue) {
      return true
    }
    if (value === truthyCSValue) {
      return true
    }

    if (value === falsyCSValue) {
      return false
    }
  }

  private handleMainItemDetails(record: any): Partial<ItemDetail>[] {
    const mainItemDetails: Partial<ItemDetail>[] = []

    if (!!record[packageCSVDictionary.FIRST_DESCRIPTION]) {
      mainItemDetails.push({
        description: record[packageCSVDictionary.FIRST_DESCRIPTION],
        type: DetailType.DETAIL_1,
      })
    }

    if (!!record[packageCSVDictionary.SECOND_DESCRIPTION]) {
      mainItemDetails.push({
        description: record[packageCSVDictionary.FIRST_DESCRIPTION],
        type: DetailType.DETAIL_2,
      })
    }

    if (!!record[packageCSVDictionary.THIRD_DESCRIPTION]) {
      mainItemDetails.push({
        description: record[packageCSVDictionary.FIRST_DESCRIPTION],
        type: DetailType.DETAIL_2,
      })
    }

    return mainItemDetails
  }

  private async handleExperiences(name: string): Promise<Experience> {
    if (!!name) {
      return this.experiencesRepository.getExperienceByName(name) as any
    }
  }

  private parseItemDetails(record: any): Partial<ItemDetail>[] {
    const itemDetails: Partial<ItemDetail>[] = []
    const detailItemsTitles = record[packageCSVDictionary.DETAIL_ITEM_TITLE]
    const detailItemsDescriptions =
      record[packageCSVDictionary.DETAIL_ITEM_DESCRIPTION]
    for (let index = 0; index < detailItemsTitles.length; index++) {
      if (detailItemsTitles[index]) {
        itemDetails.push({
          title: detailItemsTitles[index],
          description: detailItemsDescriptions[index],
          type: DetailType.DETAIL_TRIP,
        })
      }
    }

    return itemDetails
  }
}
