import type { INumberOfHired, INumberOfHiredDataTable, IPaginationParam, IPaginationResponse, IRecruitmentFunnel } from '../types'
import { GenericAbortSignal } from 'axios'
import { API_REPORT_URL } from '../constants/base-urls'
import { createAxiosInstance } from '../utils'

const axios = createAxiosInstance({
  baseURL: API_REPORT_URL,
  withAuth: true,
})

type FetchReportParams = {
  department?: any
  education?: any
  end_date?: string
  gender?: any
  province?: any
  range?: any
  start_date?: string
  type?: any
  year?: any
} & IPaginationParam

export const fetchRecruitmentFunnel = (params?: FetchReportParams, signal?: GenericAbortSignal) => {
  return axios.get<{ data: IRecruitmentFunnel }>(`/summary/recruitment-funnel`, { params, signal }).then((response) => response.data.data)
}

export const fetchNumberHired = (params?: FetchReportParams, signal?: GenericAbortSignal) => {
  return axios
    .get<{ data: IPaginationResponse<INumberOfHiredDataTable> }>(`/summary/number-of-hired/datatable`, { params, signal })
    .then((response) => response.data.data)
}

export const fetchNumberHiredChart = (params?: FetchReportParams, signal?: GenericAbortSignal) => {
  return axios.get<{ data: INumberOfHired }>(`/summary/number-of-hired/chart`, { params, signal }).then((response) => response.data.data)
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

export const fetchDepartment = (params?: FetchReportParams, signal?: GenericAbortSignal) => {
  return axios.get(`/demography/department`, { params, signal }).then((response) => response.data.data)
}
