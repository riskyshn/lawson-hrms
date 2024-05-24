import { useSearchParams } from 'react-router-dom'

export const useAllQueryParams = (...exclude: string[]): Record<string, string> => {
  const [searchParams] = useSearchParams()
  const params: Record<string, string> = {}

  for (const [key, value] of searchParams.entries()) {
    if (!exclude.includes(key)) {
      params[key] = value
    }
  }

  return params
}

export default useAllQueryParams
