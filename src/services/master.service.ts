import type { GenericAbortSignal } from 'axios'
import type { SpringPaginationParam, SpringPaginationResponse } from '@/types/pagination'

import { API_MASTER_BASE_URL } from '@/constants/base-urls'
import { createAxiosInstance } from '@/utils/axios'

type PaginationParamsWithSearch = SpringPaginationParam & {
  q?: string
}

type AreaType = 'country' | 'province' | 'city' | 'district' | 'sub-district'

const axios = createAxiosInstance({
  baseURL: API_MASTER_BASE_URL,
  withAuth: true,
})

export const fetchArea = <T = any>(type: AreaType, params: PaginationParamsWithSearch, signal?: GenericAbortSignal) => {
  return axios.get<SpringPaginationResponse<T>>(`/area/${type}`, { params, signal }).then((response) => response.data)
}
