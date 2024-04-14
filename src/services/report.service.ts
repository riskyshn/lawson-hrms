import { API_REPORT_BASE_URL } from '@/constants/base-urls'
import { createAxiosInstance } from '@/utils/axios'
import { GenericAbortSignal } from 'axios'

const axios = createAxiosInstance({
  baseURL: API_REPORT_BASE_URL,
  withAuth: true,
})

export const fetchRecruitmentFunnel = (signal?: GenericAbortSignal) => {
  return axios.get(`/summary/recruitment-funnel`, { signal }).then((response) => response.data.data)
}

export const fetchNumberHired = (signal?: GenericAbortSignal) => {
  return axios.get(`/summary/number-of-hired/datatable`, { signal }).then((response) => response.data.data)
}

export const fetchNumberHiredChart = (signal?: GenericAbortSignal) => {
  return axios.get(`/summary/number-of-hired/chart`, { signal }).then((response) => response.data.data)
}

export const fetchAge = (signal?: GenericAbortSignal) => {
  return axios.get(`/demography/age`, { signal }).then((response) => response.data.data)
}

export const fetchProvince = (signal?: GenericAbortSignal) => {
  return axios.get(`/demography/province`, { signal }).then((response) => response.data.data)
}

export const fetchEducation = (signal?: GenericAbortSignal) => {
  return axios.get(`/demography/education`, { signal }).then((response) => response.data.data)
}

export const fetchExperience = (signal?: GenericAbortSignal) => {
  return axios.get(`/demography/experience`, { signal }).then((response) => response.data.data)
}

export const fetchGender = (signal?: GenericAbortSignal) => {
  return axios.get(`/demography/gender`, { signal }).then((response) => response.data.data)
}
