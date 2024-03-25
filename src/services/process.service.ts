import { API_PROCESS_BASE_URL } from '@/constants/base-urls'
import { createAxiosInstance } from '@/utils/axios'
import { AxiosRequestConfig } from 'axios'

const axios = createAxiosInstance({
  baseURL: API_PROCESS_BASE_URL,
  withAuth: true,
})

type UpdateProcessResponseData = {
  applyProcess: string
  status: string
  type: 'INTERVIEW' | 'ASSESMENT'
  from: string
  interviewDate?: string
  createdAt: string
  updatedAt?: string
  oid: '6600e551bcbda62fbcc985bf'
}

export const updateProcess = (payload: Record<string, any>, config?: AxiosRequestConfig<FormData>) => {
  return axios.put<{ data: UpdateProcessResponseData }>('/process', payload, config).then(({ data }) => data.data)
}
