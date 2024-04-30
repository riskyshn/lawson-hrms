import { API_PROCESS_BASE_URL } from '@/constants/base-urls'
import { createAxiosInstance } from '@/utils/axios'
import { AxiosRequestConfig, GenericAbortSignal } from 'axios'
import { geventService } from '.'

const axios = createAxiosInstance({
  baseURL: API_PROCESS_BASE_URL,
  withAuth: true,
})

type FetchProcessParams = IPaginationParam & {
  type?: 'INTERVIEW' | 'ASSESSMENT' | 'OFFERING' | 'ONBOARDING'
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

export const updateProcess = async (payload: Record<string, any>, signal?: GenericAbortSignal) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let interviewId = ''
  for (let i = 0; i < 9; i++) {
    interviewId += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  await geventService.createCalendarEvent({ ...payload.schedule, interviewId })
  return axios.put<{ data: IApplicant }>('/process', payload, { signal }).then(({ data }) => data.data)
}

export const rescheduleProcess = async (payload: Record<string, any>, signal?: GenericAbortSignal) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let interviewId = ''
  for (let i = 0; i < 9; i++) {
    interviewId += characters.charAt(Math.floor(Math.random() * characters.length))
  }
  await geventService.createCalendarEvent({ ...payload.schedule, interviewId })
  return axios.put('/process/reschedule', payload, { signal }).then(({ data }) => data.data)
}

export const updateProcessResult = (payload: Record<string, any>, signal?: GenericAbortSignal) => {
  return axios.put('/process/result', payload, { signal }).then(({ data }) => data.data)
}

export const fetchDetailStages = (oid: string, signal?: GenericAbortSignal) => {
  return axios.get<{ data: { content: IApplicantStage[] } }>(`/process/stages/${oid}`, { signal }).then((response) => response.data.data)
}

export const moveToOfferingLetter = (oid: string) => {
  return axios.patch<{ data: IApplicant }>(`/process/offering-letter/${oid}`).then((response) => response.data.data)
}

export const previewOfferingLetter = (oid: string, config?: AxiosRequestConfig) => {
  return axios.get(`/process/offering-letter/preview/${oid}`, { ...config, responseType: 'blob' })
}

export const uploadDocumentRequest = (payload: Record<string, any>, config?: AxiosRequestConfig) => {
  return axios.put<{ data: IApplicant }>(`/process/offering-letter/documents`, payload, config).then((response) => response.data.data)
}

export const getDocumentRequest = (oid: string, config?: AxiosRequestConfig) => {
  return axios
    .get<{ data: IUploadedProcessDocument[] }>(`/process/offering-letter/documents/${oid}`, config)
    .then((response) => response.data.data)
}

export const sendReminder = (oid: string) => {
  return axios.post(`/process/${oid}/send-reminder`).then((response) => response.data.data)
}

export const createOfferingLetter = (payload: Record<string, any>) => {
  return axios.put(`/process/offering-letter/create`, payload).then((response) => response.data.data)
}

export const uploadSignedOfferingLetter = (payload: Record<string, any>, config?: AxiosRequestConfig) => {
  return axios.put<{ data: IApplicant }>(`/process/offering-letter/signed`, payload, config).then((response) => response.data.data)
}

export const setJoinDate = (payload: Record<string, any>, signal?: GenericAbortSignal) => {
  return axios.put<{ data: IApplicant }>(`/process/onboarding`, payload, { signal }).then((response) => response.data.data)
}
