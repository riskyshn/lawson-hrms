import { Link, useSearchParams } from 'react-router-dom'
import { Pagination, PaginationItem } from 'jobseeker-ui'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'

export type UsePaginationOptions = {
  params?: Record<string, any>
  pathname: string
  queryKey?: string
  totalPage?: null | number
  totalRender?: number
}

export function usePagination({ params, pathname, queryKey = 'page', totalPage: _totalPage, totalRender = 5 }: UsePaginationOptions) {
  const [searchParams] = useSearchParams()
  const currentPage = Number(searchParams.get(queryKey) || 1)
  const totalPage = _totalPage || 0

  const calculateStartAndEndPages = () => {
    let startPage = 1
    let endPage = totalPage

    if (totalPage > totalRender) {
      if (currentPage <= Math.floor(totalRender / 2) + 1) {
        endPage = totalRender
      } else if (currentPage >= totalPage - Math.floor(totalRender / 2)) {
        startPage = totalPage - totalRender + 1
      } else {
        startPage = currentPage - Math.floor(totalRender / 2)
        endPage = currentPage + Math.floor(totalRender / 2)
      }
    }

    return { endPage, startPage }
  }

  const render = () => {
    if (totalPage <= 1) return null

    const { endPage, startPage } = calculateStartAndEndPages()
    const pageButtons: React.ReactNode[] = []

    for (const key in params) {
      if (!params[key]) delete params[key]
    }
    const routeParams = new URLSearchParams(params)

    for (let i = startPage; i <= endPage; i++) {
      routeParams.set(queryKey, String(i))
      pageButtons.push(
        <PaginationItem active={i === currentPage} as={Link} key={i} to={{ pathname, search: routeParams.toString() }}>
          {i}
        </PaginationItem>,
      )
    }

    return (
      <Pagination>
        <PaginationItem
          as={Link}
          disabled={currentPage === 1}
          to={{
            pathname,
            search: new URLSearchParams({
              ...params,
              [queryKey]: String(Math.max(currentPage - 1, 1)),
            }).toString(),
          }}
        >
          <ChevronLeftIcon />
        </PaginationItem>
        {pageButtons}
        <PaginationItem
          as={Link}
          disabled={currentPage === totalPage}
          to={{
            pathname,
            search: new URLSearchParams({
              ...params,
              [queryKey]: String(Math.min(currentPage + 1, totalPage)),
            }).toString(),
          }}
        >
          <ChevronRightIcon />
        </PaginationItem>
      </Pagination>
    )
  }

  return { currentPage, render }
}
