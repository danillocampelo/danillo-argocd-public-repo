import React, { FunctionComponent } from 'react'
import { KeyToIconMapper } from 'src/assets/icons'

export type Props = {
  title: {
    content: string
    classes?: string
  }
  description: {
    content: string
    classes?: string
  }
  icon?: {
    name: string
    classes?: string
  }
}

export const InformationItem: FunctionComponent<Props> = ({
  icon,
  title,
  description,
}) => {
  const Icon = icon && KeyToIconMapper[icon.name]

  return (
    <section className="flex w-full md:max-w-[245px]" key={title.content}>
      {Icon && (
        <div>
          <Icon
            className={`ml-2 mt-1 h-[1rem] w-[1rem] md:h-[1.5rem] md:w-[1.5rem] lg:ml-0 xl:h-[2rem] xl:w-[2rem]  ${icon.classes}`}
          />
        </div>
      )}
      <div className={`mb-2 ml-3 flex flex-col md:ml-2 md:max-w-[205px]`}>
        <h5
          className={`mb-2 text-paragraph-medium font-bold md:text-h5-mobile ${title.classes}`}
        >
          {title.content}
        </h5>
        <p
          className={`text-paragraph-medium font-normal text-gray-40 md:whitespace-pre-line ${description.classes}`}
        >
          {description.content}
        </p>
      </div>
    </section>
  )
}
