import type {
  IApplicantDataTable,
  ICandidate,
  ICandidateHistories,
  ICandidateToCreateEmployee,
  IPaginationParam,
  IPaginationResponse,
  IVacancy,
} from '../types'
import { AxiosRequestConfig, GenericAbortSignal } from 'axios'
import { API_APPLICANT_URL, API_CANDIDATE_URL } from '../constants/base-urls'
import { createAxiosInstance } from '../utils'

const axios = createAxiosInstance({
  baseURL: API_APPLICANT_URL,
  withAuth: true,
})

const axiosCandidate = createAxiosInstance({
  baseURL: API_CANDIDATE_URL,
  withAuth: true,
})

type FetchCandidateParams = {
  education?: string
  position?: string
  province?: string
  vacancyId?: string
} & IPaginationParam

export const fetchBlacklist = (params?: FetchCandidateParams, signal?: GenericAbortSignal) => {
  return axios
    .get<{ data: IPaginationResponse<IApplicantDataTable> }>(`/applicant/blacklist`, { params, signal })
    .then((response) => response.data.data)
}

export const unblacklist = (id: string) => {
  return axios.patch(`/applicant/blacklist/${id}`).then((response) => response.data.data)
}

export const createBlacklist = (payload: Record<string, any>) => {
  return axios.post<{ data: IApplicantDataTable }>(`/applicant/blacklist`, payload).then((response) => response.data.data)
}

export const apply = (payload: Record<string, any>) => {
  return axios.post<{ data: IApplicantDataTable }>(`/applicant/apply`, payload).then((response) => response.data.data)
}

export const offer = (payload: Record<string, any>) => {
  return axios.post<{ data: IApplicantDataTable }>(`/applicant/offer`, payload).then((response) => response.data.data)
}

export const rejectOffer = (payload: Record<string, any>) => {
  return axios.patch<{ data: IApplicantDataTable }>(`/applicant/reject-offer`, payload).then((response) => response.data.data)
}

export const fetchOffer = (params?: FetchCandidateParams, signal?: GenericAbortSignal) => {
  return axios
    .get<{ data: IPaginationResponse<IApplicantDataTable> }>(`/applicant/offer`, { params, signal })
    .then((response) => response.data.data)
}

export const fetchCandidateManagement = (params?: FetchCandidateParams, signal?: GenericAbortSignal) => {
  return axios
    .get<{ data: IPaginationResponse<IApplicantDataTable> }>(`/candidate-management`, { params, signal })
    .then((response) => response.data.data)
}

export const createShortlist = (payload: Record<string, any>) => {
  return axios.post<{ data: IApplicantDataTable }>(`/applicant/shortlist`, payload).then((response) => response.data.data)
}

export const deleteShortlist = (payload: Record<string, any>) => {
  return axios.delete('/applicant/shortlist', { data: payload }).then((response) => response.data.data)
}

export const fetchShortlist = (params?: FetchCandidateParams, signal?: GenericAbortSignal) => {
  return axios
    .get<{ data: IPaginationResponse<IApplicantDataTable> }>(`/applicant/shortlist`, { params, signal })
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
  return axios.patch<{ data: IApplicantDataTable }>(`/applicant/withdraw`, payload).then((response) => response.data.data)
}

export const reject = (payload: Record<string, any>) => {
  return axios.patch<{ data: IApplicantDataTable }>(`/applicant/reject-apply`, payload).then((response) => response.data.data)
}

export const fetchReject = (params?: FetchCandidateParams, signal?: GenericAbortSignal) => {
  return axios
    .get<{ data: IPaginationResponse<IApplicantDataTable> }>(`/applicant/reject-apply`, { params, signal })
    .then((response) => response.data.data)
}

export const fetchPool = (params?: FetchCandidateParams, signal?: GenericAbortSignal) => {
  return axiosCandidate
    .get<{ data: IPaginationResponse<ICandidate> }>(`/candidate`, { params, signal })
    .then((response) => response.data.data)
}

export const moveToAnotherVacancy = (payload: Record<string, any>) => {
  return axios.post<{ data: IApplicantDataTable }>(`/applicant/move-to-another-vacancy`, payload).then((response) => response.data.data)
}

export const applyVacancy = (payload: Record<string, any>) => {
  return axios.post<{ data: IApplicantDataTable }>(`/basic/apply`, payload).then((response) => response.data.data)
}

export const fetchCandidate = (id: string, config?: AxiosRequestConfig) => {
  return axiosCandidate.get<{ data: ICandidate }>(`/candidate/profile/${id}`, config).then((response) => response.data.data)
}

export const downloadCandidate = (payload: Record<string, any>) => {
  return axiosCandidate.post(`/candidate/export`, payload).then((response) => response.data)
}

export const fetchVacanciesCandidate = (id: string) => {
  return axios.get<{ data: IPaginationResponse<IVacancy> }>(`/vacancy/${id}`).then((response) => response.data.data)
}

export const fetchCandidateToCreateEmployeeByApplicanId = (oid: string, config?: AxiosRequestConfig) => {
  return axiosCandidate.get<{ data: ICandidateToCreateEmployee }>(`/candidate/${oid}`, config).then((response) => response.data.data)
}

export const fetchDetailCandidate = (oid?: string, signal?: GenericAbortSignal) => {
  return axiosCandidate.get<{ data: ICandidateHistories }>(`/candidate/history/${oid}`, { signal }).then((response) => response.data.data)
}
