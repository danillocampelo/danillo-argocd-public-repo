import React, { FunctionComponent } from 'react'

import InformationItem, {
  InformationItemProps,
} from 'src/components/atoms/InformationItem'

export type Props = {
  title: {
    content: string
    classes?: string
  }
  gridProps?: {
    classes?: string
  }
  informationItems: InformationItemProps[]
}

export const InformationGrid: FunctionComponent<Props> = ({
  title,
  gridProps = {},
  informationItems,
}) => {
  return (
    <section
      className={`flex flex-col justify-between border-b border-gray-80 pb-8 md:flex-row md:px-0 md:pb-16`}
    >
      <h3 className={`my-9 max-w-[555px] md:my-0 lg:pr-10 ${title.classes}`}>
        {title.content}
      </h3>
      <article
        className={`grid gap-y-4 md:gap-x-11 md:gap-y-12 ${gridProps.classes}`}
      >
        {informationItems.map((info) => (
          <InformationItem {...info} key={info.title.content} />
        ))}
      </article>
    </section>
  )
}

export default InformationGrid
