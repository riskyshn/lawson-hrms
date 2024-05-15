import type { IUser } from '../types'
import { API_AUTH_URL } from '../constants/base-urls'
import { createAxiosInstance } from '../utils'

const axios = createAxiosInstance({ baseURL: API_AUTH_URL, withAuth: true })

export const fetchProfile = () => {
  return axios.get<{ data: IUser }>('/account/profile').then((res) => res.data)
}
