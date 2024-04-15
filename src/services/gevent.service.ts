import { API_GEVENT_BASE_URL } from '@/constants/base-urls'
import { createAxiosInstance } from '@/utils/axios'

const axios = createAxiosInstance({
  baseURL: API_GEVENT_BASE_URL,
  withAuth: true,
})

export const createCalendarEvent = (payload: Record<string, any>) => {
  return axios.post(`/google-calendar/create`, payload).then((response) => response.data)
}
