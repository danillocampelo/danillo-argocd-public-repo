import { afterLogin } from '@api/user/UserServiceApi'
import { handleAuth, handleCallback, handleLogin } from '@auth0/nextjs-auth0'
import logger from '@utils/logger'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const auth = handleAuth({
    login: async (req, res) => {
      try {
        await handleLogin(req, res)
      } catch (error) {
        logger.error('error on login', error)
      }
    },
    callback: async (req, res) => {
      try {
        await handleCallback(req, res, {
          afterCallback: async (req, res, session) => {
            session.accessToken && afterLogin(session.accessToken)
            return session
          },
        })
      } catch (error) {
        logger.error('error on callback', error)
      }
    },
  })

  const result = await auth(req, res)

  return result
}
