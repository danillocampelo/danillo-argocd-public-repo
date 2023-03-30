import React from 'react'
export interface DividerProps {
  isHorizontal?: boolean
  width?: string
  className?: string
}

export const Divider = ({
  isHorizontal = true,
  width,
  className,
}: DividerProps) => {
  return (
    <div
      className={`${isHorizontal ? 'border-t' : 'border-l'} ${className}`}
      style={
        isHorizontal
          ? {
              width: width,
            }
          : {
              height: width,
            }
      }
    />
  )
}

Divider.defaultProps = {
  width: '100%',
}

export default Divider
