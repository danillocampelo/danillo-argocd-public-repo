const Circle = ({ className }: { className?: string }) => (
  <span
    className={`my-3 mr-4 block self-center justify-self-center rounded-full border-[0.5px] p-1 ${className}`}
  >
    <span className="block h-2 w-2 rounded-full bg-primary" />
  </span>
)

export default Circle
