interface IPaginationParam {
  limit?: number
  page?: number
  q?: string
  sortDirection?: 'ASC' | 'DESC'
  sortedField?: string
}

interface IPaginationResponse<T = any> {
  content: T[]
  limit: number
  page: number
  totalElements: number
  totalPages: number
}
