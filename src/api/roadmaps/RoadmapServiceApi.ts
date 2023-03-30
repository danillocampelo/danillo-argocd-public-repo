import { Roadmap } from 'src/models/RoadMap'
import { roadmapsMock } from './mocks/roadmapsMock'

const getRoadmaps = async (): Promise<Roadmap> => {
  return roadmapsMock
}

export { getRoadmaps }
