import type { IUser } from '../types'
import { API_AUTH_BASE_URL } from '../constants/base-urls'
import { useAuthStore, useTokenStore } from '../store'
import { createAxiosInstance } from '../utils'

const axios = createAxiosInstance({ baseURL: API_AUTH_BASE_URL })

export const login = (payload: { email: string; password: string }) => {
  return axios
    .post<{ data: { access_token: string; refresh_token: string; user: IUser } }>('/auth/sign-in', payload)
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

export const refreshAccessToken = async (payload: { access_token: string; refresh_token: string }) => {
  return axios
    .get('/auth/refresh', {
      headers: {
        Authorization: 'Bearer ' + payload.access_token,
        'x-refresh-token': payload.refresh_token,
      },
    })
    .then(({ data }) => data)
}

export const signUpCandidate = async (payload: Record<string, any>) => {
  return axios
    .post<{ data: { user: IUser } }>('/auth/sign-up', payload, {
      headers: { company_id: useAuthStore.getState().user?.company?.oid },
    })
    .then(({ data }) => data)
}

export const isEmailUnique = (email: string) => {
  return axios.get('/check-unique/candidate/email', { params: { value: email } })
}

export const isNiklUnique = (nik: string) => {
  return axios.get('/check-unique/candidate/nik', { params: { value: nik } })
}
