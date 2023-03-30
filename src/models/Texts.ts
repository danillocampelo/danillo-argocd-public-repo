export enum PackageTextType {
  TITLE_PACKAGE_TEXT = 1,
  DESCRIPTION_PACKAGE_TEXT = 2,
  DESCRIPTION_DESTINY = 3,
  CATCHPHRASE = 4,
}

export interface PackageTexts {
  description: string
  type: number
}
