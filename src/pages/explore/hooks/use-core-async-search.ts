import { candidateExploreService } from '@/services'
import { useDeepCompareEffect, useInfiniteScroll } from 'jobseeker-ui'
import { useCallback, useEffect, useState } from 'react'

type OptionParams = {
  city?: string
  educ?: string
  gender?: string
  max_age?: number
  min_age?: number
}

type ParamsType = {
  keyword?: string
  lat: number
  lng: number
} & OptionParams &
  IPaginationParam

const limit = 20

export default function useCoreAsyncSearch(search: string, params: OptionParams) {
  const [query, setQuery] = useState('')
  const [total, setTotal] = useState(0)
  const [results, setResults] = useState<ICandidateExplore[]>([])
  const [loading, setLoading] = useState(false)

  const [typing, setTyping] = useState<boolean>(true)
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null)
  const [hasNextPage, setHasNextPage] = useState(true)
  const [page, setPage] = useState(1)
  const [latlong, setLatlong] = useState<{ lat: number; lng: number }>()

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          setLatlong({ lat: coords.latitude, lng: coords.longitude })
        },
        (error) => {
          setLatlong({ lat: -8.4095167, lng: 115.188915 })
          console.error('Error getting geolocation:', error)
        },
      )
    } else {
      console.error('Geolocation is not supported by this browser.')
    }
  }, [])

  const handleSearch = useCallback(
    async (query: string | null, params: OptionParams) => {
      if (!latlong) return

      try {
        const prms: ParamsType = { ...latlong, ...params, limit }
        if (query) prms.keyword = query

        const { content, totalElements } = await candidateExploreService.exploreCandidate(prms)
        setPage(1)
        setQuery(query ? query : '')
        setResults(content)
        setTotal(totalElements)
        setHasNextPage(content.length === limit)
      } catch (e) {
        console.error('Failed to search data', e)
      } finally {
        setLoading(false)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [latlong],
  )

  const onLoadMore = async () => {
    if (!latlong) return

    try {
      setLoading(true)

      const prms: ParamsType = { ...latlong, ...params, limit, page: page + 1 }
      if (search) prms.keyword = search
      const { content, totalElements } = await candidateExploreService.exploreCandidate(prms)
      setResults((rest) => [...rest, ...content])
      setTotal(totalElements)
      setPage((prevPage) => prevPage + 1)
      setHasNextPage(content.length === limit)
    } catch (e) {
      console.error('Failed to search data', e)
    } finally {
      setLoading(false)
    }
  }

  const [infiniteRef, { rootRef }] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore,
    rootMargin: '0px 0px 0px 0px',
  })

  useEffect(() => {
    setResults([])
    setPage(1)
    setHasNextPage(true)
    setTyping(true)
    if (typingTimeout) clearTimeout(typingTimeout)
    setTypingTimeout(setTimeout(() => setTyping(false), 1000))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  useDeepCompareEffect(() => {
    if (!typing) {
      setLoading(true)
      handleSearch(search, params)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typing, handleSearch, params])

  const getMessage = () => {
    const trimmedSearch = search.trim()
    const isSearchValid = trimmedSearch.length > 0
    const hasNoResults = isSearchValid ? results.length === 0 : false

    if (!(loading || typing) && hasNoResults) return `No results found for "${trimmedSearch}".`
    if (!(loading || typing) && !hasNextPage) return `No more items.`
  }

  return {
    infiniteRef,
    rootRef,
    typing,
    query,
    results,
    message: getMessage(),
    loading: loading || typing,
    total,
    page,
    hasNextPage,
  }
}
