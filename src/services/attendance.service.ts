import { API_ATTENDANCE_BASE_URL } from '@/constants/base-urls'
import { createAxiosInstance } from '@/utils/axios'
import { GenericAbortSignal } from 'axios'

const axios = createAxiosInstance({ baseURL: API_ATTENDANCE_BASE_URL, withAuth: true })

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
