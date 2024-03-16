import type { PaginationParam, PaginationResponse } from '@/types/pagination'
import type { GenericAbortSignal } from 'axios'

import { API_EMPLOYEE_BASE_URL } from '@/constants/base-urls'
import { createAxiosInstance } from '@/utils/axios'

const axios = createAxiosInstance({
  baseURL: API_EMPLOYEE_BASE_URL,
  withAuth: true,
})

/**
 * Employee
 *
 */
export const fetchEmployees = (params?: PaginationParam, signal?: GenericAbortSignal) => {
  return axios.get<{ data: PaginationResponse<IEmployee> }>(`/employee`, { params, signal }).then((response) => response.data.data)
}
