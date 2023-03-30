type Props = {
  gradient?: [string, string]
  rotation?: number
  className?: string
  zIndex?: number
}

export const GradientCover = ({
  gradient = ['#000000', '#00000000'],
  rotation = 0,
  className = '',
}: Props) => (
  <div
    className={`z-1 absolute -translate-x-1/2 -translate-y-1/2 ${className}`}
    style={{
      background: `linear-gradient(${rotation}deg, ${gradient[0]} 0%, ${gradient[1]} 100%)`,
    }}
  />
)
