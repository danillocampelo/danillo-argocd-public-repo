import { GRID_OPTIONS, GRID_SEQUENCE, GRID_TYPES } from './constants'

type Item = {
  categories: { name: string }[]
  description: string
  image: string
}

type Props = {
  data: Item[]
  sequence: GRID_TYPES[]
}

const Grid = ({ data }: Props) => {
  const getContainerType = (index: number) => {
    const max = GRID_SEQUENCE.length
    const counter = Math.floor(index / max)
    const position = index - counter * max
    return GRID_SEQUENCE[position].type
  }

  const renderItem = (item: Item, type: GRID_TYPES) => {
    return (
      <div className={GRID_OPTIONS[type].class}>
        {/* <Item type={type} offer={item} /> */}
      </div>
    )
  }

  return (
    <div className="flex flex-wrap">
      {data.map((item, index) => renderItem(item, getContainerType(index)))}
    </div>
  )
}

export default Grid
