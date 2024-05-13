import type { IUser } from '@/types'
import { API_AUTH_BASE_URL } from '@/constants/base-urls'
import { createAxiosInstance } from '@/utils/axios'

const axios = createAxiosInstance({ baseURL: API_AUTH_BASE_URL, withAuth: true })

export const fetchProfile = () => {
  return axios.get<{ data: IUser }>('/account/profile').then((res) => res.data)
}
