import { useEffect, useState } from 'react'
import { useAuthStore } from './store'

const Boot: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const { refreshAuth } = useAuthStore()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await refreshAuth()
      } catch {
        //
      }
    }

    Promise.all([checkAuth()]).finally(() => {
      setIsLoading(false)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isLoading) {
    return <h1>Render Boot Loading Screen Here</h1>
  }

  return <>{children}</>
}

export default Boot
