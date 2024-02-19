import { API_AUTH_BASE_URL } from '@/constants/base-urls'
import createAxiosInstance from '@/utils/create-axios-instance'

const axios = createAxiosInstance({ baseURL: API_AUTH_BASE_URL, withAuth: true })

export const login = (payload: { email: string; password: string }) => {
  return axios.post('/auth/sign-in', payload).then(({ data }) => data)
}

export const getProfile = () => {
  return axios.get('/account/profile').then(({ data }) => data)
}
