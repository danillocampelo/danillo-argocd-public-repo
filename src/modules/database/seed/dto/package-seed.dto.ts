export interface IPackageSeed {
  itinerarySubtitle: string
  id: number
  title: string
  subtitle: string
  description: string
  experience: string
  catchphrase: string
  catchphraseIcon: string
  externalDescription?: string
  externalId?: string
  destination: string
  destinationType: string
  occupancy: string
  startDate: string
  endDate?: string
  trivia: {
    boldText: string
    text: string
  }[]
  information_items: {
    title: string
    description: string
    icon: string
  }[]
}
