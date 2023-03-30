import React, { FunctionComponent } from 'react'

export type Props = {
  Icon?: any
  children?: React.ReactNode
  className?: string
}

export const Caption: FunctionComponent<Props> = ({
  children,
  Icon,
  className,
}) => (
  <div
    className={`flex w-full items-center rounded-sm bg-black px-4 py-3 ${className}`}
  >
    {Icon && <Icon className="w-6 text-primary" />}
    <span className="pl-3 text-paragraph-small text-white">{children}</span>
  </div>
)
