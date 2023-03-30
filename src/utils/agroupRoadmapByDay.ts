import { Day, Roadmap } from '../models/RoadMap'

interface AgroupedRoadmap {
  [index: string]: Day[]
}

export const agroupRoadmapByDay = (roadmap: Roadmap): AgroupedRoadmap => {
  return roadmap.days
    .sort((itemA, itemB) => (itemA.day > itemB.day ? 1 : -1))
    .reduce((agrouped, item: Day) => {
      if (agrouped[item.day.toString()]) {
        agrouped[item.day.toString()].push(item)
      } else {
        agrouped[item.day] = [item]
      }
      return agrouped
    }, {} as AgroupedRoadmap)
}
