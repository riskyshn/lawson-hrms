import { API_AUTH_BASE_URL } from '@/constants/base-urls'
import { createAxiosInstance } from '@/utils/axios'

const axios = createAxiosInstance({ baseURL: API_AUTH_BASE_URL, withAuth: true })

export const getProfile = () => {
  return axios.get('/account/profile').then((res) => res.data)
}
