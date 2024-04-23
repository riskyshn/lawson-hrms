import { API_CANDIDATE_EXPLORE_BASE_URL } from '@/constants/base-urls'
import { createAxiosInstance } from '@/utils/axios'

type ParamsType = IPaginationParam & {
  keyword?: string
  city?: string
  educ?: string
  min_age?: number
  max_age?: number
  gender?: 'male' | 'female'
  lng: number
  lat: number
}

const axios = createAxiosInstance({
  baseURL: API_CANDIDATE_EXPLORE_BASE_URL,
  withAuth: true,
})

export const exploreCandidate = (params: ParamsType) => {
  return axios.get<{ data: IPaginationResponse<ICandidateExplore> }>(`/find/candidate`, { params }).then((response) => response.data.data)
}
