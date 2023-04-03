interface address {
  streetName: string
  streetNumber: string
  zipCode: string
  city: string
  state: string
  country: string
}
;[]

interface phoneList {
  type: string
  internationalCode: string
  areaCode: string
  number: string
}
;[]

interface documentList {
  type: string
  number: string
}
;[]

interface electronicAddressList {
  preferential: boolean
  address: string
}
;[]

export interface IUser {
  memberNumber: string
  firstName: string
  lastName: string
  birthDay: Date
  gender: string
  citizenship: string
  memberType: string
  availableMiles: string
  milesToExpire: string
  milesNextExpirationDate: Date
  owner: 'Owner' | string
  category: 'Smiles' | string
  status: 'Active' | string
  memberSince: Date
  addressList: address[]
  phoneList: phoneList[]
  documentList: documentList[]
  electronicAddressList: electronicAddressList[]
  role: string
  isClubMember: boolean
  isMgmMember: boolean
  lastLogin: Date
  allowPromoEmail: boolean
  allowMail: boolean
  allowSMS: boolean
  allowCall: boolean
  allowWhatsApp: boolean
  allowPromoCall: boolean
  language: string
  isFamilyAccount: boolean
  sendAccrualRdmEmail: boolean
  programName: string
  lastUpdateDate: Date
  statusCobranded: string
}
