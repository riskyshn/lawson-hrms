import type {
  IDashboardAnnouncement,
  IDashboardRecentlyApplied,
  IDashboardRecentlyPostedJob,
  IDashboardSchedule,
  IPaginationParam,
  IPaginationResponse,
} from '../types'
import { API_DASHBOARD_BASE_URL } from '../constants/base-urls'
import { createAxiosInstance } from '../utils'

const axios = createAxiosInstance({
  baseURL: API_DASHBOARD_BASE_URL,
  withAuth: true,
})

export const recentlyApplied = (params?: IPaginationParam) => {
  return axios.get<{ data: IPaginationResponse<IDashboardRecentlyApplied> }>(`/recently-applied`, { params }).then(({ data }) => data.data)
}

export const recentlyPostedJobs = (params?: { department_id?: string } & IPaginationParam) => {
  return axios
    .get<{ data: IPaginationResponse<IDashboardRecentlyPostedJob> }>(`/recently-posted-jobs`, { params })
    .then(({ data }) => data.data)
}

export const upcomingSchedule = (params?: { date?: string } & IPaginationParam) => {
  return axios.get<{ data: IPaginationResponse<IDashboardSchedule> }>(`/upcoming-schedule`, { params }).then(({ data }) => data.data)
}

export const fetchAnnouncements = (params?: { end_date?: string; start_date?: string } & IPaginationParam) => {
  return axios
    .get<{ data: IPaginationResponse<IDashboardAnnouncement> }>(`/announcements`, { params })
    .then((response) => response.data.data)
}

export const createAnnouncement = (payload: Record<string, any>) => {
  return axios.post(`/announcements/create`, payload).then((response) => response.data.data)
}

export const pinToggleAnnouncement = (oid: string) => {
  return axios.patch<{ data: IDashboardAnnouncement }>(`/announcements/pin/${oid}`).then((response) => response.data.data)
}

export const deleteAnnouncement = (oid: string) => {
  return axios.delete<{ data: IDashboardAnnouncement }>(`/announcements/delete/${oid}`).then((response) => response.data.data)
}

export const fetchCalendar = (params?: { end_date?: string; start_date?: string } & IPaginationParam) => {
  return axios.get<{ data: IPaginationResponse<IDashboardSchedule> }>(`/calendar`, { params }).then((response) => response.data.data)
}
