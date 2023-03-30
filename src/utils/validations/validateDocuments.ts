import { TFunction } from 'next-i18next'

export const ValidateCPF = (strCPF: string) => {
  //Code adapted from http://www.receita.fazenda.gov.br/aplicacoes/atcta/cpf/funcoes.js
  let sum = 0
  let remainder

  strCPF = strCPF.replace(/[^\d]+/g, '')

  if (
    !strCPF ||
    strCPF.length != 11 ||
    strCPF == '00000000000' ||
    strCPF == '11111111111' ||
    strCPF == '22222222222' ||
    strCPF == '33333333333' ||
    strCPF == '44444444444' ||
    strCPF == '55555555555' ||
    strCPF == '66666666666' ||
    strCPF == '77777777777' ||
    strCPF == '88888888888' ||
    strCPF == '99999999999'
  )
    return false

  for (let index = 1; index <= 9; index++)
    sum = sum + parseInt(strCPF.substring(index - 1, index)) * (11 - index)

  remainder = (sum * 10) % 11

  if (remainder == 10 || remainder == 11) remainder = 0
  if (remainder != parseInt(strCPF.substring(9, 10))) return false

  sum = 0

  for (let index = 1; index <= 10; index++)
    sum = sum + parseInt(strCPF.substring(index - 1, index)) * (12 - index)

  remainder = (sum * 10) % 11

  if (remainder == 10 || remainder == 11) remainder = 0
  if (remainder != parseInt(strCPF.substring(10, 11))) return false
  return true
}

export const validateDocument = (
  value: string,
  t: TFunction,
  validationFunction: (value: string) => boolean,
) => {
  if (value === undefined) return Promise.resolve()

  if (value === '') {
    return Promise.reject(t('common:document-input.document-required'))
  }
  if (!validationFunction(value)) {
    return Promise.reject(t('common:document-input.document-invalid'))
  }
  return Promise.resolve()
}
