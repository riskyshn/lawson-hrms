import type { GenericAbortSignal } from 'axios'
import type { SpringPaginationParam, SpringPaginationResponse } from '@/types/pagination'

import { API_VACANCY_BASE_URL } from '@/constants/base-urls'
import { createAxiosInstance } from '@/utils/axios'

type FetchAreaParams = SpringPaginationParam & {
  keyword?: string
  departmentId?: string
  flag?: number
}

const axios = createAxiosInstance({
  baseURL: API_VACANCY_BASE_URL,
  withAuth: true,
})

export const fetchVacancies = <T = any>(params: FetchAreaParams, signal?: GenericAbortSignal) => {
  return axios.get<{ data: SpringPaginationResponse<T> }>(`/vacancy`, { params, signal }).then((response) => response.data.data)
}

export const fetchVacancyDetail = (id: string) => {
  return axios.get(`/vacancy/${id}`).then((response) => response.data.data)
}

export const createVacancy = (payload: Record<string, any>) => {
  return axios.post(`/vacancy`, payload).then((response) => response.data.data)
}

export const udpateVacancy = (id: string, payload: Record<string, any>) => {
  return axios.put(`/vacancy/${id}`, payload).then((response) => response.data.data)
}
