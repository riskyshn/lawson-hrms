import { useCallback, useEffect, useState } from 'react'
import useDeepCompareEffect from './use-deep-compare-effect'
import { useSearchParams } from 'react-router-dom'

type ActionReturnType<T extends (...args: any[]) => any> = ReturnType<T>

export default function useAsyncSearch<T1 extends (...args: any[]) => Promise<any>>(
  action: T1,
  params?: Parameters<T1>[0],
  input: string | null = '',
  {
    pagination = true,
    paginationKey = 'page',
  }: {
    pagination?: boolean
    paginationKey?: string
  } = {},
) {
  const [searchParams] = useSearchParams()
  const [results, setResults] = useState<{ response: Awaited<ActionReturnType<T1>>; query: string } | undefined>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [typing, setTyping] = useState<boolean>(true)
  const [typingTimeout, setTypingTimeout] = useState<number | null>(null)
  const [error, setError] = useState<any>()
  const [refresh, setRefresh] = useState<boolean>(false)
  const page = searchParams.get(paginationKey) || undefined

  if (pagination && page) {
    const n = Number(page)
    if (n > 0) {
      params = { ...(params || {}), page: n }
    }
  }

  const handleSearch = useCallback(async (query: string | null, params?: Parameters<T1>[0]) => {
    try {
      if (query) params = { ...(params || {}), q: query }
      const response = await action(params)
      setResults({ response, query: query || '' })
    } catch (e) {
      setError(e)
    } finally {
      setIsLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setTyping(true)
    if (typingTimeout) clearTimeout(typingTimeout)
    setTypingTimeout(setTimeout(() => setTyping(false), 1000))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input])

  useDeepCompareEffect(() => {
    setIsLoading(true)
    if (!typing) handleSearch(input, params)
  }, [typing, handleSearch, params, refresh])

  if (error) throw error

  return {
    pageData: results?.response,
    query: results?.query,
    isLoading: isLoading || typing,
    typing,
    refresh,
    onRefresh: () => setRefresh((v) => !v),
  }
}
