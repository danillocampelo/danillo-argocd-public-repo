import { TabCarousel } from '@components/molecules/TabCarousel/TabCarousel'
import { Splide } from '@splidejs/react-splide'
import { useEffect, useRef, useState } from 'react'
import { DetailsFaq } from './DetailsFaq'
import { CategoryData } from './FaqSection'

type Props = {
  categoryData: CategoryData[]
}

export const FaqSectionCarousel = ({ categoryData }: Props) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const sliderRef = useRef<Splide>(null)

  useEffect(() => {
    if (sliderRef.current && sliderRef.current.splide) {
      sliderRef.current.splide.on('move', (newIndex: number) => {
        setCurrentSlide(newIndex)
      })
    }
    return () => {
      if (sliderRef.current && sliderRef.current.splide) {
        sliderRef.current.splide.off('move')
      }
    }
  }, [])

  const renderControls = () => {
    return (
      <nav
        className={
          'relative -left-[24px] flex  w-auto flex-row overflow-x-scroll whitespace-nowrap bg-transparent pl-6 scrollbar-hide'
        }
      >
        {categoryData.map((item, index) => (
          <button
            key={index}
            className={`pb-2 ${
              currentSlide == index ? `border-primary` : `border-gray-800`
            } border-b-2 border-solid `}
            onClick={() => sliderRef.current?.go(index)}
          >
            <p
              className={`text-base mx-[0.375rem] mt-10 font-primary font-bold uppercase leading-9 md:mx-6 md:mt-0  ${
                currentSlide == index ? `text-primary` : `text-white`
              }`}
            >
              {item.category}
            </p>
          </button>
        ))}
      </nav>
    )
  }

  return (
    <main>
      {renderControls()}
      <TabCarousel
        splideRef={sliderRef}
        options={{
          type: 'loop',
          pagination: false,
          arrows: false,
          drag: false,
        }}
        differentHeightSlides
        currentSlideState={[currentSlide, setCurrentSlide]}
        className="flex h-auto w-full overflow-x-hidden"
        tabs={categoryData.map((category) => {
          const renderQuestions = ({
            triggerResize,
          }: {
            triggerResize: () => void
          }) => (
            <>
              {category.questions.map((item) => (
                <DetailsFaq
                  {...item}
                  key={item.title}
                  onClick={triggerResize}
                />
              ))}
            </>
          )
          return {
            id: category.category,
            content: renderQuestions,
          }
        })}
      />
    </main>
  )
}
