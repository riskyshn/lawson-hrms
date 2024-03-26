import { API_APPLICANT_BASE_URL, API_CANDIDATE_BASE_URL } from '@/constants/base-urls'
import { createAxiosInstance } from '@/utils/axios'
import { GenericAbortSignal } from 'axios'

const axios = createAxiosInstance({
  baseURL: API_APPLICANT_BASE_URL,
  withAuth: true,
})

const axiosCandidate = createAxiosInstance({
  baseURL: API_CANDIDATE_BASE_URL,
  withAuth: true,
})

type FetchCandidateParams = IPaginationParam & {
  position?: string
  province?: string
  education?: string
  vacancyId?: string
}

export const fetchBlacklist = (params?: FetchCandidateParams, signal?: GenericAbortSignal) => {
  return axios
    .get<{ data: IPaginationResponse<ICandidate> }>(`/applicant/blacklist`, { params, signal })
    .then((response) => response.data.data)
}

export const unblacklist = (id: string) => {
  return axios.patch(`/applicant/blacklist/${id}`).then((response) => response.data.data)
}

export const createBlacklist = (payload: Record<string, any>) => {
  return axios.post<{ data: ICandidate }>(`/applicant/blacklist`, payload).then((response) => response.data.data)
}

export const apply = (payload: Record<string, any>) => {
  return axios.post<{ data: ICandidate }>(`/applicant/apply`, payload).then((response) => response.data.data)
}

export const offer = (payload: Record<string, any>) => {
  return axios.post<{ data: ICandidate }>(`/applicant/offer`, payload).then((response) => response.data.data)
}

export const rejectOffer = (payload: Record<string, any>) => {
  return axios.patch<{ data: ICandidate }>(`/applicant/reject-offer`, payload).then((response) => response.data.data)
}

export const fetchOffer = (params?: FetchCandidateParams, signal?: GenericAbortSignal) => {
  return axios.get<{ data: IPaginationResponse<ICandidate> }>(`/applicant/offer`, { params, signal }).then((response) => response.data.data)
}

export const fetchCandidateManagement = (params?: FetchCandidateParams, signal?: GenericAbortSignal) => {
  return axios
    .get<{ data: IPaginationResponse<ICandidate> }>(`/candidate-management`, { params, signal })
    .then((response) => response.data.data)
}

export const createShortlist = (payload: Record<string, any>) => {
  return axios.post<{ data: ICandidate }>(`/applicant/shortlist`, payload).then((response) => response.data.data)
}

export const deleteShortlist = (id: string) => {
  return axios.delete(`/applicant/shortlist/${id}`).then((response) => response.data.data)
}

export const fetchShortlist = (params?: FetchCandidateParams, signal?: GenericAbortSignal) => {
  return axios
    .get<{ data: IPaginationResponse<ICandidate> }>(`/applicant/shortlist`, { params, signal })
    .then((response) => response.data.data)
}

export const fetchWithdraw = (params?: FetchCandidateParams, signal?: GenericAbortSignal) => {
  return axios
    .get(`/applicant/withdraw`, {
      params,
      signal,
    })
    .then((response) => response.data.data)
}

export const withdraw = (payload: Record<string, any>) => {
  return axios.patch<{ data: ICandidate }>(`/applicant/withdraw`, payload).then((response) => response.data.data)
}

export const reject = (payload: Record<string, any>) => {
  return axios.patch<{ data: ICandidate }>(`/applicant/reject-apply`, payload).then((response) => response.data.data)
}

export const fetchReject = (params?: FetchCandidateParams, signal?: GenericAbortSignal) => {
  return axios
    .get<{ data: IPaginationResponse<ICandidate> }>(`/applicant/reject-apply`, { params, signal })
    .then((response) => response.data.data)
}

export const fetchPool = (params?: FetchCandidateParams, signal?: GenericAbortSignal) => {
  return axiosCandidate
    .get<{ data: IPaginationResponse<ICandidate> }>(`/candidate`, { params, signal })
    .then((response) => response.data.data)
}

export const moveToAnotherVacancy = (payload: Record<string, any>) => {
  return axios.post<{ data: ICandidate }>(`/applicant/move-to-another-vacancy`, payload).then((response) => response.data.data)
}

export const applyVacancy = (payload: Record<string, any>) => {
  return axios.post<{ data: ICandidate }>(`/basic/apply`, payload).then((response) => response.data.data)
}

export const fetchCandidate = (id: string) => {
  return axiosCandidate.get<{ data: ICandidate }>(`/candidate/profile/${id}`).then((response) => response.data.data)
}

export const downloadCandidate = (payload: Record<string, any>) => {
  return axiosCandidate.get(`/candidate/export`, payload).then((response) => response.data)
}
