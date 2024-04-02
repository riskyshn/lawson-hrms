import type { GenericAbortSignal } from 'axios'

import { API_CMS_BASE_URL } from '@/constants/base-urls'
import { createAxiosInstance } from '@/utils/axios'

const axios = createAxiosInstance({
  baseURL: API_CMS_BASE_URL,
  withAuth: true,
})

export const fetchCms = (signal?: GenericAbortSignal) => {
  return axios.get(`/cms`, { signal }).then((response) => response.data.data)
}

export const createCms = (payload: Record<string, any>) => {
  return axios.post(`/cms/create`, payload).then((response) => response.data.data)
}

export const updateCms = (id: string, payload: Record<string, any>) => {
  return axios.put(`/cms/update/${id}`, payload).then((response) => response.data.data)
}
