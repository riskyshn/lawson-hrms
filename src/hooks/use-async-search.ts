import { useCallback, useEffect, useState } from 'react'
import useDeepCompareEffect from './use-deep-compare-effect'

type PropType<T, Params extends object, A extends (params: Params) => Promise<IPaginationResponse<T>>> = {
  action: A
  input: string
  params: Params
  refresh?: boolean
  paginationKey?: string
}

const useAsyncSearch = <
  T = any,
  Params extends object = Record<string, unknown>,
  A extends (params: Params) => Promise<IPaginationResponse<T>> = (params: Params) => Promise<IPaginationResponse<T>>,
>({
  action,
  input,
  params,
  refresh,
}: PropType<T, Params, A>) => {
  const [results, setResults] = useState<{ response: IPaginationResponse<T>; query: string }>()
  const [isLoading, setIsLoading] = useState(false)
  const [typing, setTyping] = useState(true)
  const [typingTimeout, setTypingTimeout] = useState<number | null>(null)
  const [error, setError] = useState<any>()

  const handleSearch = useCallback(
    async (query: string, params?: Params) => {
      try {
        const response = await action({ ...params, q: query } as Params)
        setResults({ response, query })
      } catch (e) {
        setError(e)
      } finally {
        setIsLoading(false)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

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
  }
}

export default useAsyncSearch
