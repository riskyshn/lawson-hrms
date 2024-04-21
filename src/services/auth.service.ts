import { API_AUTH_BASE_URL } from '@/constants/base-urls'
import { useTokenStore } from '@/store'
import { createAxiosInstance } from '@/utils/axios'

const axios = createAxiosInstance({ baseURL: API_AUTH_BASE_URL })

export const login = (payload: { email: string; password: string }) => {
  return axios
    .post<{ data: { user: IUser; refresh_token: string; access_token: string } }>('/auth/sign-in', payload)
    .then(({ data }) => data)
}

export const forgotPasswordRequest = (payload: { email: string }) => {
  return axios.post('/auth/forgot-password', payload).then(({ data }) => data)
}

export const checkforgotPasswordToken = (params: { token: string }) => {
  return axios.get('/open-auth/check-forgot-password', { params }).then(({ data }) => data)
}

export const resetPassword = ({ token, ...payload }: Record<string, any>) => {
  return axios
    .post('/auth/reset-password', payload, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    .then(({ data }) => data)
}

export const changePassword = (payload: Record<string, any>) => {
  const { access_token } = useTokenStore.getState()
  return axios
    .post('/auth/change-password', payload, {
      headers: {
        Authorization: 'Bearer ' + access_token,
      },
    })
    .then(({ data }) => data)
}

export const refreshAccessToken = async (payload: { refresh_token: string; access_token: string }) => {
  return axios
    .get('/auth/refresh', {
      headers: {
        Authorization: 'Bearer ' + payload.access_token,
        'x-refresh-token': payload.refresh_token,
      },
    })
    .then(({ data }) => data)
}
