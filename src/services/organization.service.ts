import type { PaginationParam, PaginationResponse } from '@/types/pagination'
import type { GenericAbortSignal } from 'axios'

import { API_ORGANIZATION_BASE_URL } from '@/constants/base-urls'
import { IBenefit, IBranch, IDepartment, IJobLevel, IJobType, IPosition, IRecruitmentStage, IWorkplacement } from '@/types/oganizartion'
import { createAxiosInstance } from '@/utils/axios'

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
export const fetchBranches = (params?: PaginationParam & { active?: boolean }, signal?: GenericAbortSignal) => {
  return axios.get<{ data: PaginationResponse<IBranch> }>(`/branch`, { params, signal }).then((response) => response.data.data)
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
export const fetchDepartments = (params?: PaginationParam, signal?: GenericAbortSignal) => {
  return axios.get<{ data: PaginationResponse<IDepartment> }>(`/department`, { params, signal }).then((response) => response.data.data)
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
export const fetchBenefits = (params?: PaginationParam, signal?: GenericAbortSignal) => {
  return axios.get<{ data: PaginationResponse<IBenefit> }>(`/benefit`, { params, signal }).then((response) => response.data.data)
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
export const fetchJobLevels = (params?: PaginationParam, signal?: GenericAbortSignal) => {
  return axios.get<{ data: PaginationResponse<IJobLevel> }>(`/job-level`, { params, signal }).then((response) => response.data.data)
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
export const fetchPositions = (params?: PaginationParam, signal?: GenericAbortSignal) => {
  return axios.get<{ data: PaginationResponse<IPosition> }>(`/position`, { params, signal }).then((response) => response.data.data)
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

/**
 * Workplacements
 *
 */
export const fetchWorkplacements = (params?: PaginationParam, signal?: GenericAbortSignal) => {
  return axios
    .get<{ data: PaginationResponse<IWorkplacement> }>(`/workplacement`, { params, signal })
    .then((response) => response.data.data)
}

export const createWorkplacement = (payload: Record<string, any>) => {
  return axios.post(`/workplacement`, payload).then((response) => response.data.data)
}

export const updateWorkplacement = (id: string, payload: Record<string, any>) => {
  return axios.put(`/workplacement/${id}`, payload).then((response) => response.data.data)
}

export const deleteWorkplacement = (id: string) => {
  return axios.delete(`/workplacement/${id}`).then((response) => response.data.data)
}

/**
 * JobTypes
 *
 */
export const fetchJobTypes = (params?: PaginationParam, signal?: GenericAbortSignal) => {
  return axios.get<{ data: PaginationResponse<IJobType> }>(`/job-type`, { params, signal }).then((response) => response.data.data)
}

export const createJobTypes = (payload: Record<string, any>) => {
  return axios.post(`/job-type`, payload).then((response) => response.data.data)
}

export const updateJobTypes = (id: string, payload: Record<string, any>) => {
  return axios.put(`/job-type/${id}`, payload).then((response) => response.data.data)
}

export const deleteJobTypes = (id: string) => {
  return axios.delete(`/job-type/${id}`).then((response) => response.data.data)
}

/**
 * RecruitmentStage
 *
 */
export const fetchRecruitmentStages = (params?: PaginationParam, signal?: GenericAbortSignal) => {
  return axios
    .get<{ data: PaginationResponse<IRecruitmentStage> }>(`/recruitment-stage`, { params, signal })
    .then((response) => response.data.data)
}

export const createRecruitmentStage = (payload: Record<string, any>) => {
  return axios.post(`/recruitment-stage`, payload).then((response) => response.data.data)
}

export const updateRecruitmentStage = (id: string, payload: Record<string, any>) => {
  return axios.put(`/recruitment-stage/${id}`, payload).then((response) => response.data.data)
}

export const deleteRecruitmentStage = (id: string) => {
  return axios.delete(`/recruitment-stage/${id}`).then((response) => response.data.data)
}
