import React, { FC, useEffect } from 'react'
import { Options, Splide, SplideSlide } from '@splidejs/react-splide'

export type TabContentProps = {
  triggerResize: () => void
}

type Props = {
  tabs: {
    id: string
    content: FC<TabContentProps & any>
    props?: any
  }[]
  splideRef: React.RefObject<Splide>
  currentSlideState: [number, React.Dispatch<React.SetStateAction<number>>]
  differentHeightSlides?: boolean
  options?: Options
  className?: string
}

export const TabCarousel: FC<Props> = ({
  tabs,
  splideRef,
  currentSlideState,
  differentHeightSlides,
  options = {
    type: 'loop',
    pagination: false,
    arrows: false,
    drag: false,
  },
  className = '',
}) => {
  const [currentSlide, setCurrentSlide] = currentSlideState

  const resizeSlide = (index: number) => {
    if (!splideRef.current) return

    const slide =
      splideRef.current.splide?.Components?.Slides?.getAt(index)?.slide

    setTimeout(() => {
      if (slide && slide.parentElement) {
        slide.parentElement.style.height = slide.offsetHeight + 'px'
      }
    }, 0)
  }

  const subscribeEvents = () => {
    if (splideRef.current && splideRef.current.splide) {
      splideRef.current.splide.on('move', (newIndex: number) => {
        resizeSlide(newIndex)
      })
      splideRef.current.splide.on('resize', () => {
        const index =
          splideRef.current?.splide?.Components.Controller.getIndex() || 0
        resizeSlide(index)
      })
    }
  }

  const unsubscribeEvents = () => {
    if (splideRef.current && splideRef.current.splide) {
      splideRef.current.splide.off('move resize')
    }
  }

  useEffect(() => {
    if (differentHeightSlides) resizeSlide(currentSlide)
  }, [])

  useEffect(() => {
    if (currentSlide < 0 && tabs.length > 0) {
      setCurrentSlide(0)
    } else if (currentSlide > tabs.length - 1) {
      setCurrentSlide(tabs.length - 1)
    } else {
      splideRef.current?.go(currentSlide)
    }
  }, [currentSlide, tabs.length])

  useEffect(() => {
    if (differentHeightSlides) subscribeEvents()

    return () => {
      unsubscribeEvents()
    }
  }, [differentHeightSlides, splideRef])

  return (
    <Splide
      ref={splideRef}
      options={options}
      className={`flex w-full overflow-x-hidden ${className}`}
    >
      {tabs.map((tab, index) => {
        const TabContent = tab.content
        return (
          <SplideSlide key={tab.id} className="h-fit">
            <TabContent
              {...tab.props}
              triggerResize={() => {
                if (currentSlide === index) {
                  resizeSlide(index)
                }
              }}
            />
          </SplideSlide>
        )
      })}
    </Splide>
  )
}
