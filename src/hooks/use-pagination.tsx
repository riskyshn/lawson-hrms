import { Pagination, PaginationItem } from 'jobseeker-ui'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'

type PaginationOptions = {
  totalPage: number
  pathname: string
  totalRender?: number
  queryKey?: string
  params?: Record<string, string>
}

export default function usePagination({ totalPage, pathname, params, totalRender = 5, queryKey = 'page' }: PaginationOptions) {
  const [searchParams] = useSearchParams()
  const currentPage = Number(searchParams.get(queryKey) || 1)

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

    return { startPage, endPage }
  }

  const render = () => {
    if (totalPage <= 1) return null

    const { startPage, endPage } = calculateStartAndEndPages()
    const pageButtons: React.ReactNode[] = []

    const routeParams = new URLSearchParams(params)

    for (let i = startPage; i <= endPage; i++) {
      routeParams.set(queryKey, String(i))
      pageButtons.push(
        <PaginationItem key={i} as={Link} to={{ pathname, search: routeParams.toString() }} active={i === currentPage}>
          {i}
        </PaginationItem>,
      )
    }

    return (
      <Pagination>
        <PaginationItem
          as={Link}
          to={{
            pathname,
            search: new URLSearchParams({
              ...params,
              [queryKey]: String(Math.max(currentPage - 1, 1)),
            }).toString(),
          }}
          disabled={currentPage === 1}
        >
          <ChevronLeftIcon />
        </PaginationItem>
        {pageButtons}
        <PaginationItem
          as={Link}
          to={{
            pathname,
            search: new URLSearchParams({
              ...params,
              [queryKey]: String(Math.min(currentPage + 1, totalPage)),
            }).toString(),
          }}
          disabled={currentPage === totalPage}
        >
          <ChevronRightIcon />
        </PaginationItem>
      </Pagination>
    )
  }

  return { currentPage, render }
}
