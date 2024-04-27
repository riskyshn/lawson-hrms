import type { GenericAbortSignal } from 'axios'

import { API_MASTER_BASE_URL } from '@/constants/base-urls'
import { createAxiosInstance } from '@/utils/axios'

const axios = createAxiosInstance({
  baseURL: API_MASTER_BASE_URL,
  withAuth: true,
})

/**
 * Area
 *
 */
export const fetchCountries = (params: IPaginationParam, signal?: GenericAbortSignal) => {
  return axios.get<{ data: IPaginationResponse<IMasterCountry> }>(`/area/country`, { params, signal }).then(({ data }) => data.data)
}

export const fetchProvinces = (params: IPaginationParam & { country: string }, signal?: GenericAbortSignal) => {
  return axios.get<{ data: IPaginationResponse<IMasterProvince> }>(`/area/province`, { params, signal }).then(({ data }) => data.data)
}

export const fetchCities = (params: IPaginationParam & { province?: string }, signal?: GenericAbortSignal) => {
  return axios.get<{ data: IPaginationResponse<IMasterCity> }>(`/area/city`, { params, signal }).then(({ data }) => data.data)
}

export const fetchDistricts = (params: IPaginationParam & { city: string }, signal?: GenericAbortSignal) => {
  return axios.get<{ data: IPaginationResponse<IMasterDistrict> }>(`/area/district`, { params, signal }).then(({ data }) => data.data)
}

export const fetchSubDistrict = (params: IPaginationParam & { district: string }, signal?: GenericAbortSignal) => {
  return axios
    .get<{ data: IPaginationResponse<IMasterSubDistrict> }>(`/area/sub-district`, { params, signal })
    .then(({ data }) => data.data)
}

/**
 * Education Level
 *
 */
export const fetchEducationLevel = (params?: IPaginationParam, signal?: GenericAbortSignal) => {
  return axios
    .get<{ data: IPaginationResponse<IMasterEducationLevel> }>(`/education-level`, { params, signal })
    .then((response) => response.data.data)
}

/**
 * Genders
 *
 */
export const fetchGenders = () => {
  return axios.get<{ data: { content: Array<IMasterGender> } }>(`/gender`).then((response) => response.data.data)
}

/**
 * Religions
 *
 */
export const fetchReligions = () => {
  return axios.get<{ data: { content: Array<IMasterReligion> } }>(`/religion`).then((response) => response.data.data)
}

/**
 * Marital Status
 *
 */
export const fetchMaritalStatus = () => {
  return axios.get<{ data: { content: Array<IMasterMaritalStatus> } }>(`/marital-status`).then((response) => response.data.data)
}

/**
 * File Types
 *
 */
export const fetchFileTypes = () => {
  return axios.get<{ data: { content: Array<IMasterFileType> } }>(`/filetype`).then((response) => response.data.data)
}

/**
 * Reasons
 *
 */
export const fetchReasons = (params: IPaginationParam & { type: 'reject' | 'blacklist' | 'withdraw' }, signal?: GenericAbortSignal) => {
  return axios.get<{ data: { content: Array<IMasterReason> } }>(`/reason`, { params, signal }).then((response) => response.data.data)
}
