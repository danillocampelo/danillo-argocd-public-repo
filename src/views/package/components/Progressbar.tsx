type Props = {
  progress: number
  color?: string
  activeColor?: string
  className?: string
}

export const Progressbar = ({
  progress,
  color,
  activeColor,
  className,
}: Props) => {
  return (
    <div
      className={`${className}`}
      style={{
        backgroundColor: color ?? '#FFFFFF1a',
      }}
    >
      <div
        className={`h-full transition-all duration-500 ease-out`}
        style={{
          width: `${progress * 100}%`,
          backgroundColor: activeColor ?? 'white',
        }}
      ></div>
    </div>
  )
}
