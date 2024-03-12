export interface SpringPaginationParam {
  page?: number
  size?: number
  sortedField?: string
  sortDirection?: 'ASC' | 'DESC'
}

export interface SpringPaginationResponse<T = any> {
  content: T[]
  pageable: {
    pageNumber: number
    pageSize: number
    sort: {
      sorted: boolean
      empty: boolean
      unsorted: boolean
    }
    offset: number
    paged: boolean
    unpaged: boolean
  }
  last: boolean
  totalPages: number
  totalElements: number
  size: number
  number: number
  sort: {
    sorted: boolean
    empty: boolean
    unsorted: boolean
  }
  first: boolean
  numberOfElements: number
  empty: boolean
}

export interface PythonPaginationParam {
  start_page?: number
  page_limit?: number
}

export interface PythonPaginationResponse<T = any> {
  contents: T[]
  totalElements: number
  totalPages: number
  size: number
  page: number
}
