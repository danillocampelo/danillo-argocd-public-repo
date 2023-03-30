export interface Day {
  day: number
  title: string
  description: string
  duration?: number
}

export interface Roadmap {
  id: string
  days: Day[]
}
