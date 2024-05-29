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
  branch?: string
  jobLevel?: string
  jobType?: string
} & IPaginationParam

export const fetchCandidateRecruitmentFunnel = (params?: FetchReportParams, signal?: GenericAbortSignal) => {
  return axios.get<{ data: IRecruitmentFunnel }>(`/summary/recruitment-funnel`, { params, signal }).then((response) => response.data.data)
}

export const fetchCandidateNumberHired = (params?: FetchReportParams, signal?: GenericAbortSignal) => {
  return axios
    .get<{ data: IPaginationResponse<INumberOfHiredDataTable> }>(`/summary/number-of-hired/datatable`, { params, signal })
    .then((response) => response.data.data)
}

export const fetchCandidateNumberHiredChart = (params?: FetchReportParams, signal?: GenericAbortSignal) => {
  return axios.get<{ data: INumberOfHired }>(`/summary/number-of-hired/chart`, { params, signal }).then((response) => response.data.data)
}

export const fetchCandidateAge = (params?: FetchReportParams, signal?: GenericAbortSignal) => {
  return axios.get(`/demography/candidate/age`, { params, signal }).then((response) => response.data.data)
}

export const fetchCandidateProvince = (params?: FetchReportParams, signal?: GenericAbortSignal) => {
  return axios.get(`/demography/candidate/province`, { params, signal }).then((response) => response.data.data)
}

export const fetchCandidateEducation = (params?: FetchReportParams, signal?: GenericAbortSignal) => {
  return axios.get(`/demography/candidate/education`, { params, signal }).then((response) => response.data.data)
}

export const fetchCandidateExperience = (params?: FetchReportParams, signal?: GenericAbortSignal) => {
  return axios.get(`/demography/candidate/experience`, { params, signal }).then((response) => response.data.data)
}

export const fetchCandidateGender = (params?: FetchReportParams, signal?: GenericAbortSignal) => {
  return axios.get(`/demography/candidate/gender`, { params, signal }).then((response) => response.data.data)
}

export const fetchCandidateDepartment = (params?: FetchReportParams, signal?: GenericAbortSignal) => {
  return axios.get(`/demography/candidate/department`, { params, signal }).then((response) => response.data.data)
}

export const fetchEmployeePosition = (params?: FetchReportParams, signal?: GenericAbortSignal) => {
  return axios.get(`/demography/employee/position`, { params, signal }).then((response) => response.data.data)
}

export const fetchEmployeeAge = (params?: FetchReportParams, signal?: GenericAbortSignal) => {
  return axios.get(`/demography/employee/age`, { params, signal }).then((response) => response.data.data)
}

export const fetchEmployeeBranch = (params?: FetchReportParams, signal?: GenericAbortSignal) => {
  return axios.get(`/demography/employee/branch`, { params, signal }).then((response) => response.data.data)
}

export const fetchEmployeeDepartment = (params?: FetchReportParams, signal?: GenericAbortSignal) => {
  return axios.get(`/demography/employee/department`, { params, signal }).then((response) => response.data.data)
}

export const fetchEmployeeJobLevel = (params?: FetchReportParams, signal?: GenericAbortSignal) => {
  return axios.get(`/demography/employee/job-level`, { params, signal }).then((response) => response.data.data)
}

export const fetchEmployeeGender = (params?: FetchReportParams, signal?: GenericAbortSignal) => {
  return axios.get(`/demography/employee/gender`, { params, signal }).then((response) => response.data.data)
}

export const fetchEmployeeJobType = (params?: FetchReportParams, signal?: GenericAbortSignal) => {
  return axios.get(`/demography/employee/job-type`, { params, signal }).then((response) => response.data.data)
}
