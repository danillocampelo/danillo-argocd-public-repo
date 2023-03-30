import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const i18nTestProvider = ({ language, namespaces }: any) => {
  const files = namespaces.map((ns: any) => ({
    [ns]: require(`../../../public/locales/${language}/${ns}.json`),
  }))

  const namespacesFlat = {}

  Object.entries({ ...files }).every(([, value]) =>
    Object.assign(namespacesFlat, value),
  )

  i18n.use(initReactI18next).init({
    lng: language,
    fallbackLng: 'en',
    ns: [...namespaces],
    defaultNS: [...namespaces],
    debug: false,
    resources: { [language]: namespacesFlat },
  })

  return i18n
}

export default i18nTestProvider
