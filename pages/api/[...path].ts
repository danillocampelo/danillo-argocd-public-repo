/**
 * We use Auht0 for login with @auth0/nextjs-auth0 lib.It saves user information in "sessionData"
 * cookie, which is encrypted. Due to security reasons, it does not allow us to decode this cookie
 * and retrive user's access token directly in Browser. However, it can be done in Frontend's server
 * side, by using the method "getAccessToken"
 *
 *
 * In order to obtain this token before every request, this page was created. It provides us a generic
 * route `/api/*` in our application. So everytime we need to make requests to our Backend, instead of
 * calling it directly, we should call `{FRONTEND-URL}/api/{BACKEND-PATH}`
 *
 * Example:
 * - instead of calling `backend.com.br/packages?highlight=true`
 * - we call `frontend.com.br/api/packages?highlight=true`
 *
 */
import {
  getAccessToken,
  GetAccessTokenResult,
  getSession,
} from '@auth0/nextjs-auth0'
import logger from '@utils/logger'
import httpProxy from 'http-proxy'
import { NextApiRequest, NextApiResponse } from 'next'

/**
 * This config tells next that this file is not a page, only an API request
 */
export const config = {
  api: {
    externalResolver: true,
    bodyParser: false,
  },
}

const mapQueryparams = ({
  path,
  ...query
}: Partial<{
  [key: string]: string | string[]
}>) => ({
  path: typeof path !== 'string' ? path?.join('/') : undefined,
  query,
  queryString: Object.keys(query)
    .map(function (key) {
      return key + '=' + query[key]
    })
    .join('&'),
})

/**
 * Get token from `getAccessToken`
 */
const getToken = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession(req, res)
  let shouldRefresh = false
  if (session?.refreshToken && session.accessTokenExpiresAt)
    shouldRefresh = session?.accessTokenExpiresAt * 1000 < Date.now()

  if (session?.accessToken) {
    return new Promise<GetAccessTokenResult | undefined>((resolve) => {
      getAccessToken(req, res, {
        refresh: shouldRefresh,
      })
        .then((tokenData) => {
          resolve(tokenData)
        })
        .catch((err) => {
          logger.error({ err })
          resolve(undefined)
        })
    })
  }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken(req, res)

  const { path, queryString } = mapQueryparams(req.query)

  return new Promise((resolve, reject) => {
    const proxy: httpProxy = httpProxy.createProxy()
    proxy
      .once('proxyRes', resolve)
      .once('error', reject)
      .web(req, res, {
        changeOrigin: true,
        ignorePath: true,
        target: `${process.env.MIDDLEWARE_API_URL}/${path}${
          queryString && `?${queryString}`
        }`,
        headers: token?.accessToken
          ? {
              Authorization: token.accessToken,
            }
          : undefined,
      })
  })
}
