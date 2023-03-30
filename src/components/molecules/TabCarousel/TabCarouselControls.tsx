export type Props<T extends { id: string; tabText: string }> = {
  items: T[]
  currentSlideState: [number, React.Dispatch<React.SetStateAction<number>>]
}

export const TabCarouselControls = <T,>({
  items,
  currentSlideState,
}: Props<T & { id: string; tabText: string }>) => {
  const [currentSlide, setCurrentSlide] = currentSlideState

  return (
    <nav className="flex-row overflow-hidden overflow-x-auto whitespace-nowrap py-4 max-md:scrollbar-hide md:py-7">
      {items.map((item, index) => (
        <button
          key={item.id}
          className={`border-b-2 py-4 px-6 ${
            currentSlide == index
              ? `border-primary-pressed`
              : `border-transparent`
          }`}
          onClick={() => setCurrentSlide(index)}
        >
          <h6
            className={`text-paragraph-medium ${
              currentSlide == index
                ? `font-bold text-black`
                : `font-normal text-gray-60`
            }`}
          >
            {item.tabText}
          </h6>
        </button>
      ))}
    </nav>
  )
}
