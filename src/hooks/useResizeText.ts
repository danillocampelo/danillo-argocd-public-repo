import { useRef, useEffect } from 'react'
import { resizeText } from '../utils/resizeText'

export const useResizeText = <Tag extends HTMLElement>(
  overflowPercentage?: number,
  delayedResize?: number,
) => {
  const elementToResizeRef = useRef<Tag>(null)

  const resizeElementText = () => {
    if (elementToResizeRef.current) {
      resizeText(elementToResizeRef.current, overflowPercentage)
    }
  }

  useEffect(() => {
    resizeElementText()

    if (delayedResize) {
      setTimeout(() => {
        resizeElementText()
      }, delayedResize)
    }

    window.addEventListener('resize', resizeElementText)

    return () => {
      window.removeEventListener('resize', resizeElementText)
    }
  }, [])

  return { elementToResizeRef }
}
