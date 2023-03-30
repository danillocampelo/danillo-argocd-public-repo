export const isOverflown = ({
  elementWidth,
  parentWidth,
}: {
  elementWidth: number
  parentWidth: number
}) => elementWidth > parentWidth

export const resizeText = (
  element: HTMLElement,
  overflowPercentage = 1,
  minSize = 1,
  maxSize = 750,
  step = 0.5,
  unit = 'px',
): void => {
  let i = minSize
  let overflow = false

  const parent = element.parentElement

  if (parent) {
    while (!overflow && i < maxSize) {
      element.style.fontSize = `${i - step}${unit}`

      overflow = isOverflown({
        elementWidth: element.offsetWidth,
        parentWidth: parent.offsetWidth,
      })
      if (!overflow) i += step
    }

    element.style.fontSize = `${(i - step) * overflowPercentage}${unit}`
  }
}
