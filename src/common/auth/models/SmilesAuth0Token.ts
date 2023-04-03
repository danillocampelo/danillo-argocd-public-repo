export const SMILES_ACTIVE_STATUS = 'ACTIVE'

export const SMILES_AUDIENCES = ['https://partners.smiles.api']

export enum SmilesClaims {
  MEMBER_NUMBER = 'memberNumber',
  MEMBER_STATUS = 'memberStatus',
}
export interface SmilesAuth0TokenPayload {
  [claims: string]: string | number | string[]
  sub: string
  iat: number
  exp: number
  aud: string[]
}
