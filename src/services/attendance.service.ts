import { API_ATTENDANCE_BASE_URL } from '@/constants/base-urls'
import { createAxiosInstance } from '@/utils/axios'
import { GenericAbortSignal } from 'axios'

const axios = createAxiosInstance({ baseURL: API_ATTENDANCE_BASE_URL, withAuth: true })

type FetchAttendanceParams = IPaginationParam & {
  attendance_group?: string
  start_date?: string
  end_date?: string
  branch_id?: string
  is_late?: string
}

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

/**
 * Attendance Management
 *
 */
export const fetchClientVisitAndOvertime = (params?: FetchAttendanceParams, signal?: GenericAbortSignal) => {
  return axios
    .get<{ data: IPaginationResponse<IAttendance> }>(`/employer/history`, { params, signal })
    .then((response) => response.data.data)
}

export const fetchAttendanceManagement = (params?: FetchAttendanceParams, signal?: GenericAbortSignal) => {
  return axios
    .get<{ data: IPaginationResponse<IEmployeeHistoryAttendance> }>(`/logs`, { params, signal })
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

export const fetchEmployee = (oid: string, payload: Record<string, any>) => {
  const queryString = new URLSearchParams(payload).toString()
  const url = `/employer/history/${oid}?${queryString}`
  return axios.get<{ data: IPaginationResponse<IEmployeeHistoryAttendance> }>(url).then((response) => response.data.data)
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
export const fetchEmployeeLeave = (params: IPaginationParam & { employee_id: string; start_date?: string; end_date?: string }) => {
  params = { start_date: '2024-01-01', end_date: '2030-01-01', ...params }
  return axios.get<{ data: IPaginationResponse<IEmployeeLeave> }>(`/employer/leave`, { params }).then((response) => response.data.data)
}

export const fetchEmployeeAttendanceHistories = (
  oid: string,
  params?: IPaginationParam & { attendance_group?: 'overtime' | 'clock' | 'client_visit'; start_date?: string; end_date?: string },
) => {
  params = { start_date: '2024-01-01', end_date: '2030-01-01', ...params }
  return axios
    .get<{ data: IPaginationResponse<IEmployeeHistoryAttendance> }>(`/employer/history/${oid}`, { params })
    .then((response) => response.data.data)
}

export const fetchReportStatistic = (oid: string, payload: Record<string, any>) => {
  const queryString = new URLSearchParams(payload).toString()
  const url = `/employer/report-statistics/${oid}?${queryString}`
  return axios.get<{ data: IStatistic[] }>(url).then((response) => response.data.data)
}
