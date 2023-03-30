/**
 * This route is used to obtain access token during development of new features
 * It is only available for tokens!!!
 *
 */
import { getAccessToken, GetAccessTokenResult } from '@auth0/nextjs-auth0'
import { NextApiRequest, NextApiResponse } from 'next'

interface GetTokenOutput {
  data?: GetAccessTokenResult
  isUserLogged: boolean
}

const getToken = async (req: NextApiRequest, res: NextApiResponse) => {
  return new Promise<GetTokenOutput>((resolve) => {
    getAccessToken(req, res)
      .then((data) => {
        resolve({
          data,
          isUserLogged: true,
        })
      })
      .catch(() => {
        resolve({
          isUserLogged: false,
        })
      })
  })
}

const ALLOWEDE_ENVS = ['DEV', 'HML']

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (!ALLOWEDE_ENVS.includes(process.env.ENV?.toUpperCase() || '')) {
    res.status(404).send('Not Found')
    return
  }

  const { data, isUserLogged } = await getToken(req, res)

  if (isUserLogged) {
    res.status(200).send({
      data,
    })
  } else {
    const signUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/sign-in`

    res.writeHead(302, {
      Location: signUrl,
    })
    res.end(signUrl)
  }
}
