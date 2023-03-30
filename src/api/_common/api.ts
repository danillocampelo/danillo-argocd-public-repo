import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { Config } from '../../utils/config'

export type PaginationParams = {
  limit?: number
  offset?: number
}

const http = axios.create({
  baseURL: Config.ApiBaseUrl,
})

http.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error
    if (response.status === 404) {
    }
    return Promise.reject(error)
  },
)

const get = <T = never, R = AxiosResponse<T>>({
  url,
  config,
}: {
  url: string
  config?: Partial<AxiosRequestConfig<T>>
}): Promise<R> =>
  http.get(url, { ...config, paramsSerializer: { indexes: null } })

const post = <T = never, P = any, R = AxiosResponse<T>>({
  url,
  params,
  config,
}: {
  url: string
  params?: P
  config?: Partial<AxiosRequestConfig>
}): Promise<R> => http.post(url, params, config)

export { get, post }
