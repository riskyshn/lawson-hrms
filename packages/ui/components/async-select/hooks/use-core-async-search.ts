import type { BaseAction, CoreAsyncMultiSelectProps, CoreAsyncSelectProps } from '../types'
import { useCallback, useEffect, useState } from 'react'
import { useDeepCompareEffect, useInfiniteScroll, useSearchItem } from '../../../hooks'
import { OptionProps } from '../../../types'

export default function useCoreAsyncSearch(props: CoreAsyncMultiSelectProps<BaseAction> | CoreAsyncSelectProps<BaseAction>) {
  const {
    error,
    action,
    converter,
    params,
    open,
    searchMinCharacter = 0,
    limit = 20,
    searchQueryKey = 'q',
    limitKey = 'limit',
    hideSearch,
    disableInfiniteScroll,
  } = props

  const [initialized, setInitialized] = useState(false)
  const [search, setSearch] = useState('')
  const [results, setResults] = useState<OptionProps[]>([])
  const [loading, setLoading] = useState(false)

  const [typing, setTyping] = useState<boolean>(true)
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null)
  const [hasNextPage, setHasNextPage] = useState(true)
  const [page, setPage] = useState(0)

  useEffect(() => {
    if (open) setInitialized(true)
  }, [open])

  const handleSearch = useCallback(async (query: string | null, prms: any = {}) => {
    try {
      if (query) prms = { ...prms, [searchQueryKey]: query }
      if (typeof limit === 'number') prms = { ...prms, [limitKey]: limit }
      const resp = await action(prms)
      const content = converter(resp)
      setPage(1)
      setResults(content)
      setHasNextPage(!(content.length < limit))
    } catch (e) {
      console.error('Failed to search data', e)
    } finally {
      setLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onLoadMore = async () => {
    try {
      setLoading(true)
      let prms = { ...(params || {}), page: page + 1 }
      if (search) prms = { ...prms, [searchQueryKey]: search }
      if (typeof limit === 'number') prms = { ...prms, [limitKey]: limit }
      const resp = await action(prms)
      const content = converter(resp)
      setResults((rest) => [...rest, ...content])
      setPage((prevPage) => prevPage + 1)
      setHasNextPage(!(content.length < limit))
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
    disabled: !!error,
    rootMargin: '0px 0px 0px 0px',
  })

  useEffect(() => {
    if (disableInfiniteScroll) {
      setTyping(false)
      return
    }
    if (!initialized) return
    setResults([])
    setPage(0)
    setHasNextPage(true)
    setTyping(true)
    if (typingTimeout) clearTimeout(typingTimeout)
    setTypingTimeout(setTimeout(() => setTyping(false), 1000))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, initialized, disableInfiniteScroll])

  useDeepCompareEffect(() => {
    if (!typing && search.trim().length >= searchMinCharacter) {
      setLoading(true)
      handleSearch(search, params)
    }
  }, [typing, handleSearch, params])

  const clienSideResults = useSearchItem(disableInfiniteScroll ? search.trim() : '', disableInfiniteScroll ? results : [], 'label')

  const getMessage = () => {
    const trimmedSearch = search.trim()
    const isSearchValid = trimmedSearch.length > 0
    const isSearchTooShort = trimmedSearch.length < searchMinCharacter
    const hasNoResults = isSearchValid && disableInfiniteScroll ? clienSideResults.length === 0 : results.length === 0

    if (!(loading || typing) && isSearchTooShort && !hideSearch)
      return `Please enter at least ${searchMinCharacter} characters to start searching.`
    if (!(loading || typing) && hasNoResults) return `No results found for "${trimmedSearch}".`
    if (!(loading || typing) && !disableInfiniteScroll && !hasNextPage) return `No more items.`
  }

  return {
    infiniteRef,
    rootRef,
    typing,
    search,
    setSearch,
    results: disableInfiniteScroll ? clienSideResults : results,
    message: getMessage(),
    loading: loading || typing,
    page,
  }
}
