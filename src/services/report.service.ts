import { API_REPORT_BASE_URL } from '@/constants/base-urls'
import { createAxiosInstance } from '@/utils/axios'
import { GenericAbortSignal } from 'axios'

const axios = createAxiosInstance({
  baseURL: API_REPORT_BASE_URL,
  withAuth: true,
})

type FetchReportParams = IPaginationParam & {
  start_date?: string
  end_date?: string
  province?: any
  education?: any
  gender?: any
  range?: any
}

export const fetchRecruitmentFunnel = (params?: FetchReportParams, signal?: GenericAbortSignal) => {
  return axios.get(`/summary/recruitment-funnel`, { params, signal }).then((response) => response.data.data)
}

export const fetchNumberHired = (signal?: GenericAbortSignal) => {
  return axios.get(`/summary/number-of-hired/datatable`, { signal }).then((response) => response.data.data)
}

export const fetchNumberHiredChart = (signal?: GenericAbortSignal) => {
  return axios.get(`/summary/number-of-hired/chart`, { signal }).then((response) => response.data.data)
}

export const fetchAge = (params?: FetchReportParams, signal?: GenericAbortSignal) => {
  return axios.get(`/demography/age`, { params, signal }).then((response) => response.data.data)
}

export const fetchProvince = (params?: FetchReportParams, signal?: GenericAbortSignal) => {
  return axios.get(`/demography/province`, { params, signal }).then((response) => response.data.data)
}

export const fetchEducation = (params?: FetchReportParams, signal?: GenericAbortSignal) => {
  return axios.get(`/demography/education`, { params, signal }).then((response) => response.data.data)
}

export const fetchExperience = (params?: FetchReportParams, signal?: GenericAbortSignal) => {
  return axios.get(`/demography/experience`, { params, signal }).then((response) => response.data.data)
}

export const fetchGender = (params?: FetchReportParams, signal?: GenericAbortSignal) => {
  return axios.get(`/demography/gender`, { params, signal }).then((response) => response.data.data)
}
