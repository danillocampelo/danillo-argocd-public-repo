export interface UserDataSource {
  getUserInfos(token: any)
}

export const UserDataSource = Symbol('UserDataSource')
