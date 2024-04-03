import { axiosErrorMessage } from '@/utils/axios'
import { Button } from 'jobseeker-ui'
import { Link, useRouteError } from 'react-router-dom'

const ErrorBoundary: React.FC = () => {
  const error: any = useRouteError()

  const code = error.response?.status || 500

  const errorStatus = code === 404 ? 'Page Not Found' : 'Something Went Wrong'
  // const errorMessage = code === 404 ? 'The page you requested was not found.' : 'An error occurred.'
  const errorMessage = axiosErrorMessage(error) || 'An error occurred.'

  console.log('Error Boundary :', error)

  return (
    <section className="flex h-[calc(100vh-64px)]">
      <div className="container flex items-center justify-center">
        <div className="text-center">
          <h1 className="mb-2 text-[100px] font-bold leading-none tracking-wide md:text-[150px]">
            {code === 404 ? (
              <>
                <span className="text-primary-600">4</span>
                <span>0</span>
                <span className="text-primary-600">4</span>
              </>
            ) : (
              <>
                <span className="text-primary-600">5</span>
                <span>0</span>
                <span className="text-primary-600">0</span>
              </>
            )}
          </h1>
          <h2 className="text-2xl font-light tracking-wide text-gray-800 md:text-4xl">Oops! {errorStatus}</h2>
          <p className="mb-5 text-sm md:text-base">{errorMessage}</p>
          <div className="flex justify-center">
            {code === 404 ? (
              <Button as={Link} to="/" color="primary" className="px-6">
                Back To Home
              </Button>
            ) : (
              <div className="flex gap-3">
                <Button as={Link} to="/" color="primary" className="w-24">
                  Home
                </Button>
                <Button onClick={() => window.location.reload()} color="primary" className="w-24">
                  Refresh
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ErrorBoundary
