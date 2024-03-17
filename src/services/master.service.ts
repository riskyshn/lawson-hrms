import type { GenericAbortSignal } from 'axios'

import { API_MASTER_BASE_URL } from '@/constants/base-urls'
import { createAxiosInstance } from '@/utils/axios'
import { useMasterStore } from '@/store'

const axios = createAxiosInstance({
  baseURL: API_MASTER_BASE_URL,
  withAuth: true,
})

/**
 * Area
 *
 */
export const fetchCountries = <T = any>(params: IPaginationParam, signal?: GenericAbortSignal) => {
  return axios.get<{ data: IPaginationResponse<T> }>(`/area/country`, { params, signal }).then((response) => {
    useMasterStore.getState().addArea('countries', response.data.data.content as any[])
    return response.data.data
  })
}

export const fetchProvinces = <T = any>(params: IPaginationParam & { country: string }, signal?: GenericAbortSignal) => {
  return axios.get<{ data: IPaginationResponse<T> }>(`/area/province`, { params, signal }).then((response) => {
    useMasterStore.getState().addArea('provinces', response.data.data.content as any[])
    return response.data.data
  })
}

export const fetchCities = <T = any>(params: IPaginationParam & { province?: string }, signal?: GenericAbortSignal) => {
  return axios.get<{ data: IPaginationResponse<T> }>(`/area/city`, { params, signal }).then((response) => {
    useMasterStore.getState().addArea('cities', response.data.data.content as any[])
    return response.data.data
  })
}

export const fetchDistricts = <T = any>(params: IPaginationParam & { city: string }, signal?: GenericAbortSignal) => {
  return axios.get<{ data: IPaginationResponse<T> }>(`/area/district`, { params, signal }).then((response) => {
    useMasterStore.getState().addArea('districts', response.data.data.content as any[])
    return response.data.data
  })
}

export const fetchSubDistrict = <T = any>(params: IPaginationParam & { district: string }, signal?: GenericAbortSignal) => {
  return axios.get<{ data: IPaginationResponse<T> }>(`/area/sub-district`, { params, signal }).then((response) => {
    useMasterStore.getState().addArea('subDistricts', response.data.data.content as any[])
    return response.data.data
  })
}

/**
 * Workplacement
 *
 */
export const fetchWorkplacements = <T = any>(params?: IPaginationParam, signal?: GenericAbortSignal) => {
  return axios.get<{ data: IPaginationResponse<T> }>(`/workplacement`, { params, signal }).then((response) => response.data.data)
}

/**
 * JobType
 *
 */
export const fetchJobtypes = <T = any>(params?: IPaginationParam, signal?: GenericAbortSignal) => {
  return axios.get<{ data: IPaginationResponse<T> }>(`/jobtype`, { params, signal }).then((response) => response.data.data)
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
