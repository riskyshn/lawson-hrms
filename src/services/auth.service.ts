import { API_AUTH_BASE_URL } from '@/constants/base-urls'
import { createAxiosInstance } from '@/utils/axios'

const axios = createAxiosInstance({ baseURL: API_AUTH_BASE_URL })

export const login = (payload: { email: string; password: string }) => {
  return axios.post('/auth/sign-in', payload).then(({ data }) => data)
}

export const refreshAccessToken = async (payload: { refresh_token: string; access_token: string }) => {
  return axios.post('/auth/refresh', payload).then(({ data }) => data)
}
