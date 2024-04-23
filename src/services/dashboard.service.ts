import { API_DASHBOARD_BASE_URL } from '@/constants/base-urls'
import { createAxiosInstance } from '@/utils/axios'

const axios = createAxiosInstance({
  baseURL: API_DASHBOARD_BASE_URL,
  withAuth: true,
})

export const recentlyApplied = (params?: IPaginationParam) => {
  return axios.get<{ data: IPaginationResponse<IDashboardRecentlyApplied> }>(`/recently-applied`, { params }).then(({ data }) => data.data)
}

export const recentlyPostedJobs = (params?: IPaginationParam & { department_id?: string }) => {
  return axios
    .get<{ data: IPaginationResponse<IDashboardRecentlyPostedJob> }>(`/recently-posted-jobs`, { params })
    .then(({ data }) => data.data)
}

export const upcomingSchedule = (params?: IPaginationParam & { date?: string }) => {
  return axios.get<{ data: IPaginationResponse<IDashboardSchedule> }>(`/upcoming-schedule`, { params }).then(({ data }) => data.data)
}

export const fetchAnnouncements = (params?: IPaginationParam & { start_date?: string; end_date?: string }) => {
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

export const fetchCalendar = (params?: IPaginationParam & { start_date?: string; end_date?: string }) => {
  return axios.get<{ data: IPaginationResponse<IDashboardSchedule> }>(`/calendar`, { params }).then((response) => response.data.data)
}
