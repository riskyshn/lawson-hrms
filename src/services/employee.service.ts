import type { GenericAbortSignal } from 'axios'
import type { IDataTableEmployee, IEmployee, IPaginationParam, IPaginationResponse, IPreviousEmployee } from '../types'
import { API_EMPLOYEE_BASE_URL } from '../constants/base-urls'
import { createAxiosInstance } from '../utils'

type FetchEmployeesParams = {
  scheduleId?: string
  branchId?: string
  departmentId?: string
} & IPaginationParam

const axios = createAxiosInstance({
  baseURL: API_EMPLOYEE_BASE_URL,
  withAuth: true,
})

/**
 * Employee
 *
 */
export const fetchEmployees = (params: FetchEmployeesParams = {}, signal?: GenericAbortSignal) => {
  return axios
    .get<{ data: IPaginationResponse<IDataTableEmployee> }>(`/employee`, { params: { ...params, status: 1 }, signal })
    .then((response) => response.data.data)
}

export const fetchPreviousEmployees = (params: FetchEmployeesParams = {}) => {
  return axios
    .get<{ data: IPaginationResponse<IPreviousEmployee> }>(`/employee`, { params: { ...params, status: 2 } })
    .then((response) => response.data.data)
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

export const setInactiveEmployee = (id: string, payload: Record<string, any>) => {
  return axios.patch(`/employee/inactive/${id}`, payload).then((response) => response.data.data)
}

export const restoreEmployee = (id: string) => {
  return axios.patch(`/employee/restore-inactive/${id}`).then((response) => response.data.data)
}

export const isEmployeeActive = (oid: string) => {
  return axios.get<{ data: { active: boolean } }>(`/employee/${oid}/active`).then((response) => response.data.data)
}
