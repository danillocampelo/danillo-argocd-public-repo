import React, { FunctionComponent } from 'react'

import { Tooltip as AntdTooltip } from 'antd'
export type Props = {
  text: string
  placement?:
    | 'topLeft'
    | 'top'
    | 'topRight'
    | 'leftTop'
    | 'left'
    | 'leftBottom'
    | 'rightTop'
    | 'right'
    | 'rightBottom'
    | 'bottomLeft'
    | 'bottom'
    | 'bottomRight'
  children?: React.ReactNode
  className?: string
  color?: string
}

export const Tooltip: FunctionComponent<Props> = ({
  text,
  placement = 'top',
  children,
  className,
  color = '#282F33',
}) => (
  <AntdTooltip
    title={text}
    color={color}
    overlayClassName={`text-tag tracking-normal normal-case text-white ${className}`}
    overlayInnerStyle={{
      padding: '1rem 0.75rem',
      borderRadius: '2px',
    }}
    placement={placement}
  >
    {children}
  </AntdTooltip>
)
