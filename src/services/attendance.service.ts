import { API_ATTENDANCE_BASE_URL } from '@/constants/base-urls'
import { createAxiosInstance } from '@/utils/axios'
import { GenericAbortSignal } from 'axios'

const axios = createAxiosInstance({ baseURL: API_ATTENDANCE_BASE_URL, withAuth: true })

type FetchAttendanceParams = IPaginationParam & {
  attendance_group?: string
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

export const updateSchedule = (id: string, payload: Record<string, any>) => {
  return axios.put<{ data: ISchedule }>(`/schedule/${id}`, payload).then((response) => response.data.data)
}

export const deleteSchedule = (id: string) => {
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
export const fetchAttendanceManagement = (params?: FetchAttendanceParams, signal?: GenericAbortSignal) => {
  return axios
    .get<{ data: IPaginationResponse<IAttendance> }>(`/employer/history`, { params, signal })
    .then((response) => response.data.data)
}

/**
 * Request Management
 *
 */
export const fetchRequestManagement = (params?: FetchAttendanceParams, signal?: GenericAbortSignal) => {
  return axios.get<{ data: IPaginationResponse<ILeave> }>(`/employer/leave`, { params, signal }).then((response) => response.data.data)
}

export const approvedRequestManagement = (oid: string) => {
  return axios.patch(`/employer/leave/${oid}/approved`).then((response) => response.data.data)
}

export const rejectedRequestManagement = (oid: string) => {
  return axios.patch(`/employer/leave/${oid}/rejected`).then((response) => response.data.data)
}
