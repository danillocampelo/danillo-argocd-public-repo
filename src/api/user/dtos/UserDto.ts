export interface UserDto {
  id: string
  name: string
  dateNasc: string
  rg: string
  cpf: string
  tell: string
  address: {
    cep: string
    address: string
    number: number
    complement: string
    district: string
    city: string
    state: string
  }
}
