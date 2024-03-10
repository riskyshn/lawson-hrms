import type { GenericAbortSignal } from 'axios'
import type { SpringPaginationParam, SpringPaginationResponse } from '@/types/pagination'

import { API_ORGANIZATION_BASE_URL } from '@/constants/base-urls'
import { createAxiosInstance } from '@/utils/axios'
import { IDepartment } from '@/types/oganizartion'

const axios = createAxiosInstance({
  baseURL: API_ORGANIZATION_BASE_URL,
  withAuth: true,
})

/**
 * Company
 *
 */
export const fetchCompany = () => {
  return axios.get(`/company`).then((response) => response.data.data)
}

export const updateCompany = (payload: Record<string, any>) => {
  return axios.put(`/company`, payload).then((response) => response.data.data)
}

/**
 * Branches
 *
 */
export const fetchBranches = <T = any>(params: SpringPaginationParam & { active?: boolean }, signal?: GenericAbortSignal) => {
  return axios.get<{ data: SpringPaginationResponse<T> }>(`/branch`, { params, signal }).then((response) => response.data.data)
}

export const createBranch = (payload: Record<string, any>) => {
  return axios.post(`/branch`, payload).then((response) => response.data.data)
}

export const updateBranch = (id: string, payload: Record<string, any>) => {
  return axios.put(`/branch/${id}`, payload).then((response) => response.data.data)
}

export const deleteBranch = (id: string) => {
  return axios.delete(`/branch/${id}`).then((response) => response.data.data)
}

/**
 * Department
 *
 */
export const fetchDepartments = (params: SpringPaginationParam, signal?: GenericAbortSignal) => {
  return axios
    .get<{ data: SpringPaginationResponse<IDepartment> }>(`/department`, { params, signal })
    .then((response) => response.data.data)
}

export const createDepartment = (payload: Record<string, any>) => {
  return axios.post(`/department`, payload).then((response) => response.data.data)
}

export const updateDepartment = (id: string, payload: Record<string, any>) => {
  return axios.put(`/department/${id}`, payload).then((response) => response.data.data)
}

export const deleteDepartment = (id: string) => {
  return axios.delete(`/department/${id}`).then((response) => response.data.data)
}

/**
 * Benefits
 *
 */
export const fetchBenefits = <T = any>(params: SpringPaginationParam, signal?: GenericAbortSignal) => {
  return axios.get<{ data: SpringPaginationResponse<T> }>(`/benefit`, { params, signal }).then((response) => response.data.data)
}

export const createBenefit = (payload: Record<string, any>) => {
  return axios.post(`/benefit`, payload).then((response) => response.data.data)
}

export const updateBenefit = (id: string, payload: Record<string, any>) => {
  return axios.put(`/benefit/${id}`, payload).then((response) => response.data.data)
}

export const deleteBenefit = (id: string) => {
  return axios.delete(`/benefit/${id}`).then((response) => response.data.data)
}

/**
 * JobLevels
 *
 */
export const fetchJobLevels = <T = any>(params: SpringPaginationParam, signal?: GenericAbortSignal) => {
  return axios.get<{ data: SpringPaginationResponse<T> }>(`/job-level`, { params, signal }).then((response) => response.data.data)
}

export const createJobLevel = (payload: Record<string, any>) => {
  return axios.post(`/job-level`, payload).then((response) => response.data.data)
}

export const updateJobLevel = (id: string, payload: Record<string, any>) => {
  return axios.put(`/job-level/${id}`, payload).then((response) => response.data.data)
}

export const deleteJobLevel = (id: string) => {
  return axios.delete(`/job-level/${id}`).then((response) => response.data.data)
}

/**
 * Positions
 *
 */
export const fetchPositions = <T = any>(params: SpringPaginationParam, signal?: GenericAbortSignal) => {
  return axios.get<{ data: SpringPaginationResponse<T> }>(`/position`, { params, signal }).then((response) => response.data.data)
}

export const createPosition = (payload: Record<string, any>) => {
  return axios.post(`/position`, payload).then((response) => response.data.data)
}

export const updatePosition = (id: string, payload: Record<string, any>) => {
  return axios.put(`/position/${id}`, payload).then((response) => response.data.data)
}

export const deletePosition = (id: string) => {
  return axios.delete(`/position/${id}`).then((response) => response.data.data)
}
