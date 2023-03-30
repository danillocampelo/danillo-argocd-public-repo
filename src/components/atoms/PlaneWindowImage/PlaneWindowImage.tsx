/* eslint-disable @next/next/no-img-element */
//TODO: remove eslint next-img rule
import { FunctionComponent } from 'react'

type ComponentSizes = 'large'

type Props = {
  alt?: string
  size: ComponentSizes
  imageSrc: string
  className?: string
}

const sizeClasses: Record<ComponentSizes, string> = {
  large:
    'rounded-t-[30%] rounded-b-[25%] w-[328px] h-[457px] md:w-[500px] md:h-[600px] 2xl:w-[707px] 2xl:h-[864px]',
}

export const PlaneWindowImage: FunctionComponent<Props> = ({
  alt,
  size,
  imageSrc,
  className,
}) => {
  return (
    <img
      alt={alt}
      src={imageSrc}
      className={`${sizeClasses[size]} ${className} object-cover`}
    />
  )
}
