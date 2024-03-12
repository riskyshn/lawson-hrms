import type { GenericAbortSignal } from 'axios'
import type { PythonPaginationParam, PythonPaginationResponse } from '@/types/pagination'

import { API_VACANCY_BASE_URL } from '@/constants/base-urls'
import { createAxiosInstance } from '@/utils/axios'
import { IVacancy } from '@/types/vacancy'

type FetchVacanciesParams = PythonPaginationParam & {
  keyword?: string
  departmentId?: string
  status?: string
  isRequisition?: 0 | 1
}

const axios = createAxiosInstance({
  baseURL: API_VACANCY_BASE_URL,
  withAuth: true,
})

export const fetchVacancies = (params?: FetchVacanciesParams, signal?: GenericAbortSignal) => {
  return axios.get<{ data: PythonPaginationResponse<IVacancy> }>(`/vacancy`, { params, signal }).then((response) => response.data.data)
}

export const fetchVacancyDetail = (id: string) => {
  return axios.get(`/vacancy/${id}`).then((response) => response.data.data as IVacancy)
}

export const createVacancy = (payload: Record<string, any>) => {
  return axios.post(`/vacancy`, payload).then((response) => response.data.data)
}

export const udpateVacancy = (id: string, payload: Record<string, any>) => {
  return axios.put(`/vacancy/${id}`, payload).then((response) => response.data.data)
}

export const updateVacancyStatus = (id: string, status: 'active' | 'inactive' | 'draft') => {
  return axios.patch(`/vacancy/${id}?status=${status}`).then((response) => response.data.data)
}
