import type { GenericAbortSignal } from 'axios'
import type { SpringPaginationParam, SpringPaginationResponse } from '@/types/pagination'

import { API_MASTER_BASE_URL } from '@/constants/base-urls'
import { createAxiosInstance } from '@/utils/axios'
import { useMasterStore } from '@/store'

type FetchAreaParams = SpringPaginationParam & {
  q?: string
}

const axios = createAxiosInstance({
  baseURL: API_MASTER_BASE_URL,
  withAuth: true,
})

/**
 * Area
 *
 */
export const fetchCountries = <T = any>(params: FetchAreaParams, signal?: GenericAbortSignal) => {
  return axios.get<{ data: SpringPaginationResponse<T> }>(`/area/country`, { params, signal }).then((response) => {
    useMasterStore.getState().addArea('countries', response.data.data.content as any[])
    return response.data.data
  })
}

export const fetchProvinces = <T = any>(params: FetchAreaParams & { country: string }, signal?: GenericAbortSignal) => {
  return axios.get<{ data: SpringPaginationResponse<T> }>(`/area/province`, { params, signal }).then((response) => {
    useMasterStore.getState().addArea('provinces', response.data.data.content as any[])
    return response.data.data
  })
}

export const fetchCities = <T = any>(params: FetchAreaParams & { province?: string }, signal?: GenericAbortSignal) => {
  return axios.get<{ data: SpringPaginationResponse<T> }>(`/area/city`, { params, signal }).then((response) => {
    useMasterStore.getState().addArea('cities', response.data.data.content as any[])
    return response.data.data
  })
}

export const fetchDistricts = <T = any>(params: FetchAreaParams & { city: string }, signal?: GenericAbortSignal) => {
  return axios.get<{ data: SpringPaginationResponse<T> }>(`/area/district`, { params, signal }).then((response) => {
    useMasterStore.getState().addArea('districts', response.data.data.content as any[])
    return response.data.data
  })
}

export const fetchSubDistrict = <T = any>(params: FetchAreaParams & { district: string }, signal?: GenericAbortSignal) => {
  return axios.get<{ data: SpringPaginationResponse<T> }>(`/area/sub-district`, { params, signal }).then((response) => {
    useMasterStore.getState().addArea('subDistricts', response.data.data.content as any[])
    return response.data.data
  })
}

export const fetchCitiesByOids = (key: 'countries' | 'provinces' | 'cities' | 'districts' | 'subDistricts', oids: string[]) => {
  let path: string = key

  if (key == 'countries') path = 'country'
  else if (key == 'provinces') path = 'province'
  else if (key == 'cities') path = 'city'
  else if (key == 'districts') path = 'district'
  else if (key == 'subDistricts') path = 'sub-district'

  return axios.post(`/area/${path}`, { in: oids }).then((response) => response.data.data)
}

/**
 * Workplacement
 *
 */
export const fetchWorkplacement = <T = any>(params: FetchAreaParams & { district: string }, signal?: GenericAbortSignal) => {
  return axios.get<{ data: SpringPaginationResponse<T> }>(`/workplacement`, { params, signal }).then((response) => response.data.data)
}

/**
 * JobType
 *
 */
export const fetchJobtype = <T = any>(params: FetchAreaParams & { district: string }, signal?: GenericAbortSignal) => {
  return axios.get<{ data: SpringPaginationResponse<T> }>(`/jobtype`, { params, signal }).then((response) => response.data.data)
}

/**
 * Education Level
 *
 */
export const fetchEducationLevel = <T = any>(params: FetchAreaParams & { district: string }, signal?: GenericAbortSignal) => {
  return axios.get<{ data: SpringPaginationResponse<T> }>(`/education-level`, { params, signal }).then((response) => response.data.data)
}
