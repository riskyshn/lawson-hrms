import { AxiosRequestConfig, GenericAbortSignal } from 'axios'
import { API_PROCESS_BASE_URL } from '@/constants/base-urls'
import { createAxiosInstance } from '@/utils/axios'

const axios = createAxiosInstance({
  baseURL: API_PROCESS_BASE_URL,
  withAuth: true,
})

type FetchProcessParams = {
  stageName?: string
  type?: 'ASSESSMENT' | 'INTERVIEW' | 'OFFERING' | 'ONBOARDING'
  vacancyId?: string
} & IPaginationParam

export const fetchProcess = (params?: FetchProcessParams, signal?: GenericAbortSignal) => {
  return axios
    .get<{ data: IPaginationResponse<IDataTableApplicant> }>(`/process`, { params, signal })
    .then((response) => response.data.data)
}

export const fetchDetailProcess = (oid: string, signal?: GenericAbortSignal) => {
  return axios.get<{ data: IApplicant }>(`/process/${oid}`, { signal }).then((response) => response.data.data)
}

export const updateProcess = async (payload: Record<string, any>, signal?: GenericAbortSignal) => {
  return axios.put<{ data: IApplicant }>('/process', payload, { signal }).then(({ data }) => data.data)
}

export const rescheduleProcess = async (payload: Record<string, any>, signal?: GenericAbortSignal) => {
  return axios.put('/process/reschedule', payload, { signal }).then(({ data }) => data.data)
}

export const fetchScheduleProcess = async (oid: string, signal?: GenericAbortSignal) => {
  return axios.get<{ data: IProcessSchedule }>(`/process/${oid}/schedule`, { signal }).then(({ data }) => data.data)
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

export const previewOfferingLetterPlain = (config?: AxiosRequestConfig) => {
  return axios.get(`/process/offering-letter/preview`, { ...config, responseType: 'blob' })
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
  return axios.post(`/process/send-reminder/${oid}`).then((response) => response.data.data)
}

export const createOfferingLetter = (payload: Record<string, any>) => {
  return axios.put(`/process/offering-letter`, payload).then((response) => response.data.data)
}
export const getOfferingLetter = (oid: string) => {
  return axios.get<{ data: IOfferingLetter }>(`/process/offering-letter/${oid}`).then((response) => response.data.data)
}

export const uploadSignedOfferingLetter = (payload: Record<string, any>, config?: AxiosRequestConfig) => {
  return axios.put<{ data: IApplicant }>(`/process/offering-letter/signed`, payload, config).then((response) => response.data.data)
}

export const getSignedOfferingLetter = (oid: string, config?: AxiosRequestConfig) => {
  return axios.get<{ data: { link: string } }>(`/process/offering-letter/signed/${oid}`, config).then((response) => response.data.data)
}

export const setJoinDate = (payload: Record<string, any>, signal?: GenericAbortSignal) => {
  return axios.put<{ data: IApplicant }>(`/process/onboarding`, payload, { signal }).then((response) => response.data.data)
}
