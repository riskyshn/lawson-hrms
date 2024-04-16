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
