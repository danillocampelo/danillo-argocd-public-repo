import { Metainfo } from '@models/Metainfo'

export function getTextIconMetaInfos(metainfos: Metainfo[] | undefined) {
  let completeList = true

  const list = metainfos?.map((metainfo) => {
    if (!metainfo.icon && !metainfo.title) {
      completeList = false
    }
    return {
      icon: metainfo.icon || '',
      text: metainfo.title || '',
      description: metainfo.description || '',
    }
  })

  if (!list || !completeList) return null

  return list
}
