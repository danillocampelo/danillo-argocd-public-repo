export interface Roadmap {
  id: string
  days: {
    day: number
    title: string
    description: string
    duration?: number
  }[]
}
