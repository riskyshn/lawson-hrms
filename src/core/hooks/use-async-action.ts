import { useDeepCompareEffect } from 'jobseeker-ui'
import { useState } from 'react'

type ActionReturnType<T extends (...args: any[]) => any> = ReturnType<T>

export default function useAsyncAction<T extends (...args: any[]) => Promise<any>>(
  action: T,
  ...params: Parameters<T>
): [Awaited<ActionReturnType<T>> | undefined, boolean] {
  const [response, setResponse] = useState<any>()
  const [error, setError] = useState<any>()
  const [loading, setLoading] = useState(true)

  useDeepCompareEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const data = await action(params)
        setResponse(data)
      } catch (e) {
        setError(e)
      }
      setLoading(false)
    }

    load()
  }, [params, action])

  if (error) throw error

  return [response, loading]
}
