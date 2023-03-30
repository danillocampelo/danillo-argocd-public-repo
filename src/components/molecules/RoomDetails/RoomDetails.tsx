import IconTextList from '@components/atoms/IconTextList'
import { Metainfo } from '@models/Metainfo'

type Props = {
  metainfos: Metainfo[]
  className?: string
  itemClassName?: string
}

const RoomDetails = ({ metainfos, className, itemClassName }: Props) => {
  return (
    <IconTextList
      className={`text-paragraph-medium ${className}`}
      metainfos={metainfos}
      itemClassName={`first:mt-0 mt-4 ${itemClassName}`}
      iconSize="w-6"
    />
  )
}
export default RoomDetails
