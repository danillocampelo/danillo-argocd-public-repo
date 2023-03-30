import React from 'react'
import { KeyToIconMapper } from '@assets/icons'
import { Icon } from '@models/Icon'
import { Metainfo } from '@models/Metainfo'

type Props = {
  metainfos?: Metainfo[]
  className?: string
  iconSize?: string
  itemClassName?: string
}

export const IconTextList = ({
  metainfos,
  className,
  itemClassName,
  iconSize = 'w-7',
}: Props) => (
  <ul className={`items-start text-paragraph-medium ${className}`}>
    {metainfos?.map(({ icon, title, description }) => {
      const Icon = icon && KeyToIconMapper[icon.src || '']

      return (
        <li
          key={`${title}-${icon}`}
          className={`flex break-inside-avoid items-center ${itemClassName}`}
        >
          {!!Icon && <Icon className={`mr-3 ${iconSize}`} />}
          {!!title && <span className="max-md:w-4/5">{title}</span>}
          {!!description && <span className="max-md:w-4/5">{description}</span>}
        </li>
      )
    })}
  </ul>
)
