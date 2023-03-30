import { get } from '@api/_common/api'
import { User } from '@models/User'
import axios, { AxiosResponse } from 'axios'

import userMock from './data/mocks/UserMock'
import { UserMapper } from './mappers/UserMapper'

const basePath = 'user'

export type GetUserInput = {
  userId?: string
}

export type InputSetUser = {
  user: User
}

export type Status = {
  status: string
}

const getUser = async ({ userId }: GetUserInput): Promise<User> => {
  try {
    if (userId === undefined || userId === null)
      throw new Error('userId is required')

    return await UserMapper(userMock)
  } catch (err) {
    throw err
  }
}

const setUser = async ({
  user,
}: InputSetUser): Promise<AxiosResponse<User, Status>> => {
  try {
    return axios.post<User>('/api/user', user)
  } catch (err) {
    throw err
  }
}

const afterLogin = async (accessToken: string) => {
  try {
    await get({
      url: `${basePath}/after-login`,
      config: {
        headers: {
          Authorization: accessToken,
        },
      },
    })
  } catch (error) {
    console.error(error)
    throw error
  }
}

export { afterLogin, getUser, setUser }
