export interface PaginationParam {
  page?: number
  limit?: number
  q?: string
  sortedField?: string
  sortDirection?: 'ASC' | 'DESC'
}

export interface PaginationResponse<T = any> {
  content: T[]
  totalElements: number
  totalPages: number
  page: number
  limit: number
}
