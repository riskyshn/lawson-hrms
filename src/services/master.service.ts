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
export const fetchCountries = (params: IPaginationParam, signal?: GenericAbortSignal) => {
  return axios.get<{ data: IPaginationResponse<IMasterCountry> }>(`/area/country`, { params, signal }).then((response) => {
    useMasterStore.getState().addArea('countries', response.data.data.content as any[])
    return response.data.data
  })
}

export const fetchProvinces = (params: IPaginationParam & { country: string }, signal?: GenericAbortSignal) => {
  return axios.get<{ data: IPaginationResponse<IMasterProvince> }>(`/area/province`, { params, signal }).then((response) => {
    useMasterStore.getState().addArea('provinces', response.data.data.content as any[])
    return response.data.data
  })
}

export const fetchCities = (params: IPaginationParam & { province?: string }, signal?: GenericAbortSignal) => {
  return axios.get<{ data: IPaginationResponse<IMasterCity> }>(`/area/city`, { params, signal }).then((response) => {
    useMasterStore.getState().addArea('cities', response.data.data.content as any[])
    return response.data.data
  })
}

export const fetchDistricts = (params: IPaginationParam & { city: string }, signal?: GenericAbortSignal) => {
  return axios.get<{ data: IPaginationResponse<IMasterDistrict> }>(`/area/district`, { params, signal }).then((response) => {
    useMasterStore.getState().addArea('districts', response.data.data.content as any[])
    return response.data.data
  })
}

export const fetchSubDistrict = (params: IPaginationParam & { district: string }, signal?: GenericAbortSignal) => {
  return axios.get<{ data: IPaginationResponse<IMasterSubDistrict> }>(`/area/sub-district`, { params, signal }).then((response) => {
    useMasterStore.getState().addArea('subDistricts', response.data.data.content as any[])
    return response.data.data
  })
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
