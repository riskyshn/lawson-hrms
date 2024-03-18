import type { GenericAbortSignal } from 'axios'

import { API_EMPLOYEE_BASE_URL } from '@/constants/base-urls'
import { createAxiosInstance } from '@/utils/axios'

const axios = createAxiosInstance({
  baseURL: API_EMPLOYEE_BASE_URL,
  withAuth: true,
})

/**
 * Employee
 *
 */
export const fetchEmployees = (params?: IPaginationParam & { status?: 1 | 2 }, signal?: GenericAbortSignal) => {
  return axios.get<{ data: IPaginationResponse<IEmployee> }>(`/employee`, { params, signal }).then((response) => response.data.data)
}

export const fetchEmployee = (oid: string) => {
  return axios.get<{ data: IEmployee }>(`/employee/${oid}`).then((response) => response.data.data)
}

export const createEmployee = (payload: Record<string, any>) => {
  return axios.post<{ data: IEmployee }>(`/employee`, payload).then((response) => response.data.data)
}

export const updateEmployee = (id: string, payload: Record<string, any>) => {
  return axios.put<{ data: IEmployee }>(`/employee/${id}`, payload).then((response) => response.data.data)
}

export const deleteEmployee = (id: string) => {
  return axios.delete(`/employee/${id}`).then((response) => response.data.data)
}
