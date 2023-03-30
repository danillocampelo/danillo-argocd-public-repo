import { get } from '@api/_common/api'
import { Experience } from 'src/models/Experience'
import { ExperiencesDto } from './dtos/ExperiencesDto'

const basePath = 'experiences'

async function getExperiences(): Promise<Experience[]> {
  try {
    const { data } = await get<ExperiencesDto>({
      url: `${basePath}`,
    })

    return data.data.map((experience) => ({
      id: experience.id.toString(),
      name: experience.name,
      description: experience.description,
    }))
  } catch (err) {
    throw err
  }
}

export { getExperiences }
