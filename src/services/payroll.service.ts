import { API_PAYROLL_BASE_URL } from '@/constants/base-urls'
import { createAxiosInstance } from '@/utils/axios'
import { GenericAbortSignal } from 'axios'

const axios = createAxiosInstance({
  baseURL: API_PAYROLL_BASE_URL,
  withAuth: true,
})

/**
 * Master Data
 */
export const fetchPPH21 = () => {
  return axios.get<{ data: { content: { name: string; category: string }[] } }>(`/pph21-category`).then((response) => response.data.data)
}

/**
 * BPJS Component
 *
 */
export const fetchBpjsComponent = (signal?: GenericAbortSignal) => {
  return axios.get<{ data: IBPJSComponent }>(`/bpjs-component`, { signal }).then((response) => response.data.data)
}

export const updateBpjsComponent = (payload: Record<string, any>, signal?: GenericAbortSignal) => {
  return axios.put<{ data: IBPJSComponent }>('/bpjs-component', payload, { signal }).then(({ data }) => data.data)
}

/**
 * Benefit Components
 */
export const fetchBenefitComponents = (params?: IPaginationParam, signal?: GenericAbortSignal) => {
  return axios
    .get<{ data: IPaginationResponse<IBenefitComponent> }>(`/benefit-component`, { params, signal })
    .then((response) => response.data.data)
}

export const fetchBenefitComponent = (oid: string, signal?: GenericAbortSignal) => {
  return axios.get<{ data: IBenefitComponent }>(`/benefit-component/${oid}`, { signal }).then((response) => response.data.data)
}

export const createBenefitComponent = (payload: Record<string, any>, signal?: GenericAbortSignal) => {
  return axios.post<{ data: IBenefitComponent }>('/benefit-component', payload, { signal }).then(({ data }) => data.data)
}

export const updateBenefitComponent = (oid: string, payload: Record<string, any>, signal?: GenericAbortSignal) => {
  return axios.put<{ data: IBenefitComponent }>(`/benefit-component/${oid}`, payload, { signal }).then(({ data }) => data.data)
}

export const deleteBenefitComponent = (oid: string, signal?: GenericAbortSignal) => {
  return axios.delete(`/benefit-component/${oid}`, { signal }).then(({ data }) => data.data)
}

export const applyBenefitToEmployees = (payload: { employeeIds: string[]; componentId: string }, signal?: GenericAbortSignal) => {
  return axios.post('/benefit-component/apply-to-employees', payload, { signal }).then(({ data }) => data.data)
}

export const removeBenefitFromEmployees = (payload: { employeeIds: string[]; componentId: string }, signal?: GenericAbortSignal) => {
  return axios.post('/benefit-component/remove-from-employees', payload, { signal }).then(({ data }) => data.data)
}

/**
 * Deduction Components
 */
export const fetchDeductionComponents = (params?: IPaginationParam, signal?: GenericAbortSignal) => {
  return axios
    .get<{ data: IPaginationResponse<IDeductionComponent> }>(`/deduction-component`, { params, signal })
    .then((response) => response.data.data)
}

export const fetchDeductionComponent = (oid: string, signal?: GenericAbortSignal) => {
  return axios.get<{ data: IDeductionComponent }>(`/deduction-component/${oid}`, { signal }).then((response) => response.data.data)
}

export const createDeductionComponent = (payload: Record<string, any>, signal?: GenericAbortSignal) => {
  return axios.post<{ data: IDeductionComponent }>('/deduction-component', payload, { signal }).then(({ data }) => data.data)
}

export const updateDeductionComponent = (oid: string, payload: Record<string, any>, signal?: GenericAbortSignal) => {
  return axios.put<{ data: IDeductionComponent }>(`/deduction-component/${oid}`, payload, { signal }).then(({ data }) => data.data)
}

export const deleteDeductionComponent = (oid: string, signal?: GenericAbortSignal) => {
  return axios.delete(`/deduction-component/${oid}`, { signal }).then(({ data }) => data.data)
}

export const applyDeductionToEmployees = (payload: { employeeIds: string[]; componentId: string }, signal?: GenericAbortSignal) => {
  return axios.post('/deduction-component/apply-to-employees', payload, { signal }).then(({ data }) => data.data)
}

export const removeDeductionFromEmployees = (payload: { employeeIds: string[]; componentId: string }, signal?: GenericAbortSignal) => {
  return axios.post('/deduction-component/remove-from-employees', payload, { signal }).then(({ data }) => data.data)
}

/**
 * Payroll
 */
export const fetchPayrollRequests = (params?: IPaginationParam & { statusRunner?: 'WAITING' | 'ON_PROCESS' | 'COMPLETED' | 'FAILED' }) => {
  return axios.get<{ data: IPaginationResponse<IPayrollRequest> }>('/payroll', { params }).then(({ data }) => data.data)
}

export const fetchPayrollRequest = (oid: string) => {
  return axios.get<{ data: IPayrollRequest }>(`/payroll/${oid}`).then(({ data }) => data.data)
}

export const updatePayrollRequestStatus = (oid: string, payload: Record<string, any>) => {
  return axios.patch<{ data: IPayrollRequest }>(`/payroll/status/${oid}`, payload).then(({ data }) => data.data)
}

export const createPayrollRequest = (payload: Record<string, any>) => {
  return axios.post<{ data: IPayrollRequest }>('/payroll', payload).then(({ data }) => data.data)
}

export const fetchPayrollRequestResults = (oid: string, params?: IPaginationParam) => {
  return axios
    .get<{ data: IPaginationResponse<IEmployeePayrollResult> }>(`/employee-payroll?payrollRequestId=${oid}`, { params })
    .then(({ data }) => data.data)
}

export const fetchPayrollRequestDetail = (oid: string) => {
  return axios.get<{ data: IEmployeePayrollDetail }>(`/employee-payroll/${oid}`).then(({ data }) => data.data)
}

export const updatePayrollComponentDetail = (oid: string, payload: Record<string, any>) => {
  return axios.put(`/employee-payroll/${oid}/component`, payload)
}
