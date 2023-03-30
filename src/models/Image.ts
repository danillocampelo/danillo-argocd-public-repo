export enum PackageImages {
  WINDOW_IMAGE = 1,
  SECOND_WINDOW_IMAGE = 2,
  BANNER_IMAGE = 3,
  ALTERNATIVE_COVER = 4,
}

export type ImagesType = PackageImages

export interface Image {
  id?: string
  src: string
  type?: ImagesType
}
