import type { GenericAbortSignal } from 'axios'
import type { ICms } from '../types'
import { API_CMS_URL } from '../constants/base-urls'
import { createAxiosInstance } from '../utils'

const axios = createAxiosInstance({
  baseURL: API_CMS_URL,
  withAuth: true,
})

export const fetchCms = (signal?: GenericAbortSignal) => {
  return axios.get<{ data: ICms }>(`/cms`, { signal }).then((response) => response.data.data)
}

export const createCms = (payload: Record<string, any>) => {
  return axios.post(`/cms/create`, payload).then((response) => response.data.data)
}

export const updateCms = (id: string, payload: Record<string, any>) => {
  return axios.put(`/cms/update/${id}`, payload).then((response) => response.data.data)
}
