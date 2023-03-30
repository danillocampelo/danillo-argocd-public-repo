import React, { FC, useEffect, useState } from 'react'
import { Collapse as AntDCollapse } from 'antd'

import { ForwardArrowIcon } from '@assets/icons'
import styles from './Collapse.module.css'
export const { Panel } = AntDCollapse

type Props = {
  iconPosition?: 'start' | 'end'
  className?: string
  children: React.ReactNode
}

export const Collapse: FC<Props> = ({
  iconPosition = 'end',
  className,
  children,
}) => {
  return (
    <AntDCollapse
      expandIconPosition={iconPosition}
      expandIcon={({ isActive }) => (
        <ForwardArrowIcon
          className={`${isActive ? '-rotate-90' : 'rotate-90'} transition-all`}
        />
      )}
      className={`text-gray-90 ${styles['custom-collapse']} bg-white ${className}`}
    >
      {children}
    </AntDCollapse>
  )
}

export default Collapse
