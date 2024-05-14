import { useEffect, useState } from 'react'

export function useRemember<T>(item: T): T {
  const [data, setData] = useState<T>(item)
  useEffect(() => {
    if (item) setData(item)
  }, [item])

  return data
}
