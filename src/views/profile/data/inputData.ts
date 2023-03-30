import { User } from '@models/User'

export const userRenderData = (userData: User) => {
  const USER_INPUT_NAMES = [
    {
      nameForm: 'name',
      defaultValue: userData ? userData.name : '',
    },
    {
      nameForm: 'dateNasc',
      mask: '00/00/0000',
      defaultValue: userData ? userData.birthDate : '00/00/0000',
    },
    {
      nameForm: 'rg',
      mask: '0000000-0',
      defaultValue: userData ? userData.rg : '0000000-0',
    },
    {
      nameForm: 'cpf',
      mask: '000.000.000-00',
      defaultValue: userData ? userData.cpf : '000.000.000-00',
    },
    {
      nameForm: 'tell',
      mask: '(00)00000-0000',
      defaultValue: userData ? userData.telephone : '(00)00000-0000',
    },
  ]

  const ADDRESS_INPUT_NAMES = [
    {
      nameForm: 'address',
      defaultValue: userData ? userData.address.address : '',
    },
    {
      nameForm: 'number',
      defaultValue: userData ? userData.address.number : '',
    },
    {
      nameForm: 'complement',
      defaultValue: userData ? userData.address.complement : '',
    },
    {
      nameForm: 'district',
      defaultValue: userData ? userData.address.district : '',
    },
    {
      nameForm: 'city',
      defaultValue: userData ? userData.address.city : '',
    },
  ]

  return { USER_INPUT_NAMES, ADDRESS_INPUT_NAMES }
}
