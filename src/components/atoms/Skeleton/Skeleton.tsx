import React, { FC } from 'react'

type Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

export const Skeleton: FC<Props> = ({ ...rest }) => (
  <div className={`shine ${rest.className}`} />
)
