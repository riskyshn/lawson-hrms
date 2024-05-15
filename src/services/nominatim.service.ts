import type { INominatimPlace } from '../types'
import { createAxiosInstance } from '../utils'

const axios = createAxiosInstance({
  baseURL: 'https://nominatim.openstreetmap.org',
  withoutSource: true,
})

export const search = (q: string) => {
  return axios.get<Array<INominatimPlace>>('/search', { params: { format: 'jsonv2', q } }).then(({ data }) => data)
}
