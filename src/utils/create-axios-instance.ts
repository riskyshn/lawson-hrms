import axios, { AxiosRequestHeaders } from 'axios'
import useTokenStore from '@/store/token/store'

type CreateAxiosInstanceOptions = {
  baseURL?: string
  timeout?: number
  headers?: AxiosRequestHeaders
  withAuth?: boolean
}

export default function createAxiosInstance(options?: CreateAxiosInstanceOptions) {
  const request = axios.create({
    baseURL: options?.baseURL,
    timeout: options?.timeout,
    headers: options?.headers,
  })

  if (options?.withAuth) {
    request.interceptors.request.use((config) => {
      const { accessToken } = useTokenStore.getState()

      if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`
      }

      return config
    })
  }

  return request
}
