import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDeepCompareEffect } from '@jshrms/ui'

type ActionReturnType<T extends (...args: any[]) => any> = ReturnType<T>

export default function useAsyncSearch<T1 extends (...args: any[]) => Promise<any>>(
  action: T1,
  params?: Parameters<T1>[0],
  input: null | string = '',
  {
    pagination = true,
    paginationKey = 'page',
    searchKey = 'q',
  }: {
    pagination?: boolean
    paginationKey?: string
    searchKey?: string
  } = {},
) {
  const [searchParams] = useSearchParams()
  const [results, setResults] = useState<{ query: string; response: Awaited<ActionReturnType<T1>> } | undefined>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [typing, setTyping] = useState<boolean>(true)
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null)
  const [error, setError] = useState<any>()
  const [refresh, setRefresh] = useState<boolean>(false)
  const page = searchParams.get(paginationKey) || undefined

  if (pagination && page) {
    const n = Number(page)
    if (n > 0) {
      params = { ...(params || {}), page: n }
    }
  }

  const handleSearch = useCallback(async (query: null | string, params?: Parameters<T1>[0]) => {
    try {
      if (query) params = { ...(params || {}), [searchKey]: query }
      const response = await action(params)
      setResults({ query: query || '', response })
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
    isLoading: isLoading || typing,
    onRefresh: () => setRefresh((v) => !v),
    pageData: results?.response,
    query: results?.query,
    refresh,
    typing,
  }
}
