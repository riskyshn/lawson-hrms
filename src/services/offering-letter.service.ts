import { API_OFFERING_LETTER_BASE_URL } from '@/constants/base-urls'
import { useAuthStore } from '@/store'
import { createAxiosInstance } from '@/utils/axios'

const axios = createAxiosInstance({
  baseURL: API_OFFERING_LETTER_BASE_URL,
  withAuth: true,
})

export const preview = () => {
  const company_id = useAuthStore.getState().user?.company?.oid
  return axios.get(`/offering-letter/preview`, { headers: { company_id }, responseType: 'blob' })
}

export const generate = (oid: string) => {
  const company_id = useAuthStore.getState().user?.company?.oid
  return axios.get(`/offering-letter/${oid}`, { headers: { company_id }, responseType: 'blob' })
}
