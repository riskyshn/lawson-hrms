import { useEffect, useState } from 'react'
import { useAuthStore } from './store'
import { twJoin } from 'tailwind-merge'
import { Spinner } from 'jobseeker-ui'

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

  return (
    <>
      <div
        aria-hidden="true"
        className={twJoin(
          isLoading ? 'opacity-1' : 'pointer-events-none opacity-0',
          'fixed inset-0 z-[99999] flex items-center justify-center bg-white transition-opacity duration-[1s]',
        )}
      >
        <Spinner className="h-10 w-10 text-primary-600" />
      </div>
      {!isLoading && children}
    </>
  )
}

export default Boot