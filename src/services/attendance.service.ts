import type {
  IEmployeeHistoryAttendance,
  IEmployeeLeave,
  ILeave,
  IPaginationParam,
  IPaginationResponse,
  ISchedule,
  IStatistic,
  ITimezone,
} from '../types'
import { GenericAbortSignal } from 'axios'
import { API_ATTENDANCE_URL } from '../constants/base-urls'
import { createAxiosInstance } from '../utils'

const axios = createAxiosInstance({ baseURL: API_ATTENDANCE_URL, withAuth: true })

type FetchAttendanceParams = {
  log_type?: string
  branch_id?: string
  employee_id?: string
  end_date?: string
  is_in_office?: string
  is_late?: string
  start_date?: string
} & IPaginationParam

/**
 * Schedule
 *
 */
export const fetchSchedules = (params?: IPaginationParam, signal?: GenericAbortSignal) => {
  return axios.get<{ data: IPaginationResponse<ISchedule> }>(`/schedule`, { params, signal }).then((response) => response.data.data)
}

export const fetchSchedule = (oid: string) => {
  return axios.get<{ data: ISchedule }>(`/schedule/${oid}`).then((response) => response.data.data)
}

export const createSchedule = (payload: Record<string, any>) => {
  return axios.post<{ data: ISchedule }>(`/schedule`, payload).then((response) => response.data.data)
}

export const updateSchedule = (id?: string, payload?: Record<string, any>) => {
  return axios.put<{ data: ISchedule }>(`/schedule/${id}`, payload).then((response) => response.data.data)
}

export const deleteSchedule = (id?: string) => {
  return axios.delete(`/schedule/${id}`).then((response) => response.data.data)
}

/**
 * Timezone
 *
 */
export const fetchTimezones = (params?: IPaginationParam, signal?: GenericAbortSignal) => {
  return axios.get<{ data: IPaginationResponse<ITimezone> }>(`/timezone`, { params, signal }).then((response) => response.data.data)
}

export const fetchAttendanceManagement = (params?: FetchAttendanceParams, signal?: GenericAbortSignal) => {
  return axios
    .get<{ data: IPaginationResponse<IEmployeeHistoryAttendance> }>(`/employer/logs`, { params, signal })
    .then((response) => response.data.data)
}

/**
 * Request Management
 *
 */
export const fetchRequestManagement = (params?: FetchAttendanceParams, signal?: GenericAbortSignal) => {
  return axios.get<{ data: IPaginationResponse<ILeave> }>(`/employer/leave`, { params, signal }).then((response) => response.data.data)
}

export const updateRequest = (payload: Record<string, any>) => {
  return axios.post(`/employer/leave/update-status`, payload).then((response) => response.data.data)
}

export const fetchStatistic = (params?: FetchAttendanceParams, signal?: GenericAbortSignal) => {
  return axios.get<{ data: IStatistic[] }>(`/employer/statistics`, { params, signal }).then((response) => response.data.data)
}

export const updateAttendance = (payload: Record<string, any>) => {
  return axios.post(`/employer/update-status`, payload).then((response) => response.data.data)
}

export const downloadAttendance = (oid: string, payload: Record<string, any>) => {
  const queryString = new URLSearchParams(payload).toString()
  const url = `employer/export-report/${oid}?${queryString}`
  return axios.get(url).then((response) => response.data)
}

/**
 * Request Management
 *
 */
export const fetchEmployeeLeave = (params: { employee_id: string; end_date?: string; start_date?: string } & IPaginationParam) => {
  params = { end_date: '2030-01-01', start_date: '2024-01-01', ...params }
  return axios.get<{ data: IPaginationResponse<IEmployeeLeave> }>(`/employer/leave`, { params }).then((response) => response.data.data)
}

export const fetchReportStatistic = (oid: string, payload: Record<string, any>) => {
  const queryString = new URLSearchParams(payload).toString()
  const url = `/employer/report-statistics/${oid}?${queryString}`
  return axios.get<{ data: IStatistic[] }>(url).then((response) => response.data.data)
}
