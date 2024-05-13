import type { ICandidateExplore, IPaginationParam, IPaginationResponse } from '@/types'
import { API_CANDIDATE_EXPLORE_BASE_URL } from '@/constants/base-urls'
import { createAxiosInstance } from '@/utils/axios'

type ParamsType = {
  city?: string
  educ?: string
  gender?: string
  keyword?: string
  lat: number
  lng: number
  max_age?: number
  min_age?: number
} & IPaginationParam

const axios = createAxiosInstance({
  baseURL: API_CANDIDATE_EXPLORE_BASE_URL,
  withAuth: true,
})

export const exploreCandidate = (params: ParamsType) => {
  return axios.get<{ data: IPaginationResponse<ICandidateExplore> }>(`/find/candidate`, { params }).then((response) => response.data.data)
}
