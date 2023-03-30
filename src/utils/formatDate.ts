export const placeholder: { [lang: string]: string } = {
  en: 'YYYY/MM/DD',
  'pt-BR': 'DD/MM/AAAA',
}

export const formatDate: { [lang: string]: string } = {
  en: 'YYYY/MM/DD',
  'pt-BR': 'DD/MM/YYYY',
}

export const getFormattedDate = (date: Date, locale: string) =>
  date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  })
