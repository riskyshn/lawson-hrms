interface IPaginationParam {
  page?: number
  limit?: number
  q?: string
  sortedField?: string
  sortDirection?: 'ASC' | 'DESC'
}

interface IPaginationResponse<T = any> {
  content: T[]
  totalElements: number
  totalPages: number
  page: number
  limit: number
}
