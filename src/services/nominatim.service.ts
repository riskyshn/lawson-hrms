import { createAxiosInstance } from '@/utils/axios'

const axios = createAxiosInstance({
  baseURL: 'https://nominatim.openstreetmap.org',
  withoutSource: true,
})

export const search = (q: string) => {
  return axios.get<Array<INominatimPlace>>('/search', { params: { format: 'jsonv2', q } }).then(({ data }) => data)
}