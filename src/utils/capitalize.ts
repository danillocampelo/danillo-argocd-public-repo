export const capitalize = (text: string): string => {
  const words = text.split(' ')
  const capitalizedWords: string[] = []

  words.forEach((word) => {
    const lowerCasedWord = word.toLowerCase()

    capitalizedWords.push(
      word.charAt(0).toUpperCase() + lowerCasedWord.slice(1),
    )
  })

  return capitalizedWords.join(' ')
}
