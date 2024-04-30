import type { AxiosRequestConfig, GenericAbortSignal } from 'axios'

import { API_ORGANIZATION_BASE_URL } from '@/constants/base-urls'
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
  return axios.get<{ data: ICompany }>(`/company`).then((response) => response.data.data)
}

export const updateCompany = (payload: Record<string, any>) => {
  return axios.put<{ data: ICompany }>(`/company`, payload).then((response) => response.data.data)
}

/**
 * Branches
 *
 */
export const fetchBranches = (params?: IPaginationParam & { active?: boolean }, signal?: GenericAbortSignal) => {
  return axios.get<{ data: IPaginationResponse<IBranch> }>(`/branch`, { params, signal }).then((response) => response.data.data)
}

export const createBranch = (payload: Record<string, any>) => {
  return axios.post<{ data: IBranch }>(`/branch`, payload).then((response) => response.data.data)
}

export const updateBranch = (id: string, payload: Record<string, any>) => {
  return axios.put<{ data: IBranch }>(`/branch/${id}`, payload).then((response) => response.data.data)
}

export const deleteBranch = (id: string) => {
  return axios.delete(`/branch/${id}`).then((response) => response.data.data)
}

/**
 * Department
 *
 */
export const fetchDepartments = (params?: IPaginationParam, signal?: GenericAbortSignal) => {
  return axios.get<{ data: IPaginationResponse<IDepartment> }>(`/department`, { params, signal }).then((response) => response.data.data)
}

export const createDepartment = (payload: Record<string, any>) => {
  return axios.post<{ data: IDepartment }>(`/department`, payload).then((response) => response.data.data)
}

export const updateDepartment = (id: string, payload: Record<string, any>) => {
  return axios.put<{ data: IDepartment }>(`/department/${id}`, payload).then((response) => response.data.data)
}

export const deleteDepartment = (id: string) => {
  return axios.delete(`/department/${id}`).then((response) => response.data.data)
}

/**
 * Benefits
 *
 */
export const fetchBenefits = (params?: IPaginationParam, signal?: GenericAbortSignal) => {
  return axios.get<{ data: IPaginationResponse<IBenefit> }>(`/benefit`, { params, signal }).then((response) => response.data.data)
}

export const createBenefit = (payload: Record<string, any>) => {
  return axios.post<{ data: IBenefit }>(`/benefit`, payload).then((response) => response.data.data)
}

export const updateBenefit = (id: string, payload: Record<string, any>) => {
  return axios.put<{ data: IBenefit }>(`/benefit/${id}`, payload).then((response) => response.data.data)
}

export const deleteBenefit = (id: string) => {
  return axios.delete(`/benefit/${id}`).then((response) => response.data.data)
}

/**
 * JobLevels
 *
 */
export const fetchJobLevels = (params?: IPaginationParam, signal?: GenericAbortSignal) => {
  return axios.get<{ data: IPaginationResponse<IJobLevel> }>(`/job-level`, { params, signal }).then((response) => response.data.data)
}

export const createJobLevel = (payload: Record<string, any>) => {
  return axios.post<{ data: IJobLevel }>(`/job-level`, payload).then((response) => response.data.data)
}

export const updateJobLevel = (id: string, payload: Record<string, any>) => {
  return axios.put<{ data: IJobLevel }>(`/job-level/${id}`, payload).then((response) => response.data.data)
}

export const deleteJobLevel = (id: string) => {
  return axios.delete(`/job-level/${id}`).then((response) => response.data.data)
}

/**
 * Positions
 *
 */
export const fetchPositions = (params?: IPaginationParam, signal?: GenericAbortSignal) => {
  return axios.get<{ data: IPaginationResponse<IPosition> }>(`/position`, { params, signal }).then((response) => response.data.data)
}

export const createPosition = (payload: Record<string, any>) => {
  return axios.post<{ data: IPosition }>(`/position`, payload).then((response) => response.data.data)
}

export const updatePosition = (id: string, payload: Record<string, any>) => {
  return axios.put<{ data: IPosition }>(`/position/${id}`, payload).then((response) => response.data.data)
}

export const deletePosition = (id: string) => {
  return axios.delete(`/position/${id}`).then((response) => response.data.data)
}

/**
 * Workplacements
 *
 */
export const fetchWorkplacements = (params?: IPaginationParam, signal?: GenericAbortSignal) => {
  return axios
    .get<{ data: IPaginationResponse<IWorkplacement> }>(`/workplacement`, { params, signal })
    .then((response) => response.data.data)
}

export const createWorkplacement = (payload: Record<string, any>) => {
  return axios.post<{ data: IWorkplacement }>(`/workplacement`, payload).then((response) => response.data.data)
}

export const updateWorkplacement = (id: string, payload: Record<string, any>) => {
  return axios.put<{ data: IWorkplacement }>(`/workplacement/${id}`, payload).then((response) => response.data.data)
}

export const deleteWorkplacement = (id: string) => {
  return axios.delete(`/workplacement/${id}`).then((response) => response.data.data)
}

/**
 * JobTypes
 *
 */
export const fetchJobTypes = (params?: IPaginationParam & { status?: 0 | 1 | 2 }, signal?: GenericAbortSignal) => {
  return axios.get<{ data: IPaginationResponse<IJobType> }>(`/job-type`, { params, signal }).then((response) => response.data.data)
}

export const createJobType = (payload: Record<string, any>) => {
  return axios.post<{ data: IJobType }>(`/job-type`, payload).then((response) => response.data.data)
}

export const updateJobType = (id: string, payload: Record<string, any>) => {
  return axios.put<{ data: IJobType }>(`/job-type/${id}`, payload).then((response) => response.data.data)
}

export const deleteJobType = (id: string) => {
  return axios.delete(`/job-type/${id}`).then((response) => response.data.data)
}

/**
 * RecruitmentStage
 *
 */
export const fetchRecruitmentStages = (params?: IPaginationParam, config: AxiosRequestConfig = {}) => {
  return axios
    .get<{ data: IPaginationResponse<IRecruitmentStage> }>(`/recruitment-stage`, { params, ...config })
    .then((response) => response.data.data)
}

export const createRecruitmentStage = (payload: Record<string, any>) => {
  return axios.post<{ data: IRecruitmentStage }>(`/recruitment-stage`, payload).then((response) => response.data.data)
}

export const updateRecruitmentStage = (id: string, payload: Record<string, any>) => {
  return axios.put<{ data: IRecruitmentStage }>(`/recruitment-stage/${id}`, payload).then((response) => response.data.data)
}

export const deleteRecruitmentStage = (id: string) => {
  return axios.delete(`/recruitment-stage/${id}`).then((response) => response.data.data)
}

/**
 * Approval
 *
 */
export const fetchApprovals = (params?: IPaginationParam, signal?: GenericAbortSignal) => {
  return axios.get<{ data: IPaginationResponse<IApproval> }>(`/approval`, { params, signal }).then((response) => response.data.data)
}

export const fetchApproval = (oid: string) => {
  return axios.post<{ data: IApproval }>(`/approval/${oid}`).then((response) => response.data.data)
}

export const createApproval = (employeeCodes: string[]) => {
  return axios.post<{ data: { content: IApproval[] } }>(`/approval`, { employeeCodes }).then((response) => response.data.data)
}

/**
 * Document Request
 *
 */
export const fetchDocumentRequests = (params?: IPaginationParam, config?: AxiosRequestConfig) => {
  return axios
    .get<{ data: IPaginationResponse<IDocumentRequest> }>(`/document-request`, { ...config, params })
    .then((response) => response.data.data)
}

export const fetchDocumentRequest = () => {
  return axios.get<{ data: IPaginationResponse<IDocumentRequest> }>(`/document-request`).then((response) => response.data.data)
}

export const createDocumentRequest = (payload: Record<string, any>) => {
  return axios.post<{ data: IDocumentRequest }>(`/document-request`, payload).then((response) => response.data.data)
}

export const updateDocumentRequest = (id: string, payload: Record<string, any>) => {
  return axios.put<{ data: IDocumentRequest }>(`/document-request/${id}`, payload).then((response) => response.data.data)
}

export const deleteDocumentRequest = (id: string) => {
  return axios.delete(`/document-request/${id}`).then((response) => response.data.data)
}

/**
 * Offering Letter
 *
 */
export const fetchOfferingLetterSetting = () => {
  return axios.get<{ data: IOfferingLetterSetting }>(`/offering-letter`).then((response) => response.data.data)
}

export const updateOfferingLetterSetting = (payload: IOfferingLetterSetting) => {
  return axios.put<{ data: IOfferingLetterSetting }>(`/offering-letter`, payload).then((response) => response.data.data)
}
