export interface PaginationParam {
  page?: number
  size?: number
  sortedField?: string
  sortDirection?: 'ASC' | 'DESC'
}

export interface PaginationResponse<T = any> {
  content: T[]
  totalElements: number
  totalPages: number
  size: number
  page: number
}
