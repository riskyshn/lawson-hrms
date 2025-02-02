import type { AxiosRequestConfig, GenericAbortSignal } from 'axios'
import type { IPaginationParam, IPaginationResponse, IVacancy } from '../types'
import { API_VACANCY_URL } from '../constants/base-urls'
import { createAxiosInstance } from '../utils'

type FetchVacanciesParams = {
  departmentId?: string
  isRequisition?: 0 | 1
  status?: string
} & IPaginationParam

const axios = createAxiosInstance({
  baseURL: API_VACANCY_URL,
  withAuth: true,
})

export const fetchVacancies = (params?: FetchVacanciesParams, signal?: GenericAbortSignal) => {
  return axios.get<{ data: IPaginationResponse<IVacancy> }>(`/vacancy`, { params, signal }).then((response) => response.data.data)
}

export const fetchVacancyDetail = (id: string, config?: AxiosRequestConfig) => {
  return axios.get<{ data: IVacancy }>(`/vacancy/${id}`, config).then((response) => response.data.data)
}

export const createVacancy = (payload: Record<string, any>) => {
  return axios.post<{ data: IVacancy }>(`/vacancy`, payload).then((response) => response.data.data)
}

export const udpateVacancy = (id: string, payload: Record<string, any>) => {
  return axios.put<{ data: IVacancy }>(`/vacancy/${id}`, payload).then((response) => response.data.data)
}

export const deleteDraftVacancy = (id: string) => {
  return axios.delete(`/vacancy/${id}`).then((response) => response.data.data)
}

export const updateVacancyStatus = (id: string, status: 'active' | 'draft' | 'inactive', payload?: Record<string, any>) => {
  return axios.patch(`/vacancy/${id}/${status}`, payload).then((response) => response.data.data)
}

export const cancelRequisition = (id: string) => {
  return axios.patch(`/requisition/${id}/cancel`).then((response) => response.data.data)
}

export const progressRequisition = (id: string) => {
  return axios.patch(`/requisition/${id}/progress`).then((response) => response.data.data)
}

export const publishRequisition = (id: string) => {
  return axios.patch(`/requisition/${id}/publish`).then((response) => response.data.data)
}

export const approveRequisition = (id: string, payload: Record<string, any>, config?: AxiosRequestConfig) => {
  return axios.patch(`/requisition/${id}/approve`, payload, config).then((response) => response.data.data)
}

export const sendReminder = (id: string) => {
  return axios.post(`/requisition/${id}/send-reminder`).then((response) => response.data.data)
}

export const fetchVacancyStratistic = (params?: { isRequisition: boolean }) => {
  return axios.get<{ data: Record<string, number> }>(`/vacancy/statistics`, { params }).then((response) => response.data.data)
}

export const fetchVacancyRRNumber = () => {
  return axios.get<{ data: string }>(`/requisition/rr-number`).then((response) => response.data.data)
}
