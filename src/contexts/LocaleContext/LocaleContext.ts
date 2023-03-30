import { createContext, useContext } from 'react'

export const LocaleContext = createContext({
  locale: 'pt-br',
})

export const useLocaleContext = () => {
  return useContext(LocaleContext)
}
