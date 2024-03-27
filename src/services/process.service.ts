import { API_PROCESS_BASE_URL } from '@/constants/base-urls'
import { createAxiosInstance } from '@/utils/axios'
import { GenericAbortSignal } from 'axios'

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

type FetchProcessParams = IPaginationParam & {
  type?: 'INTERVIEW' | 'ASSESMENT' | 'OFFERING LETTER' | 'ONBOARDING'
  vacancy?: string
  stage?: string
}

export const fetchProcess = (params?: FetchProcessParams, signal?: GenericAbortSignal) => {
  return axios
    .get<{ data: IPaginationResponse<IDataTableApplicant> }>(`/process`, { params, signal })
    .then((response) => response.data.data)
}

export const fetchDetailProcess = (oid: string, signal?: GenericAbortSignal) => {
  return axios.get<{ data: IApplicant }>(`/process/${oid}`, { signal }).then((response) => response.data.data)
}

export const updateProcess = (payload: Record<string, any>, signal?: GenericAbortSignal) => {
  return axios.put<{ data: UpdateProcessResponseData }>('/process', payload, { signal }).then(({ data }) => data.data)
}

export const rescheduleProcess = (payload: Record<string, any>, signal?: GenericAbortSignal) => {
  return axios.put('/process/reschedule', payload, { signal }).then(({ data }) => data.data)
}

export const updateProcessResult = (payload: Record<string, any>, signal?: GenericAbortSignal) => {
  return axios.put('/process/result', payload, { signal }).then(({ data }) => data.data)
}
