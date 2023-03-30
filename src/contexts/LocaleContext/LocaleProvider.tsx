import React, { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'

import { LocaleContext } from './'

type Props = {
  children: React.ReactNode
}

export const LocaleProvider = ({ children }: Props) => {
  const { i18n } = useTranslation()
  const [locale, setLocale] = useState(i18n.language)

  useEffect(() => {
    if (i18n) {
      i18n.on('languageChanged', () => {
        setLocale(i18n.language)
      })
    }
  }, [i18n])

  return (
    <LocaleContext.Provider value={{ locale }}>
      {children}
    </LocaleContext.Provider>
  )
}
