import { Button } from 'jobseeker-ui'
import { Link } from 'react-router-dom'

type PropTypes = {
  code: 404 | 500
  message?: string
}

const ErrorScreen: React.FC<PropTypes> = ({ code, message }) => {
  const errorStatus = code === 404 ? 'Page Not Found' : 'Something Went Wrong'
  const errorMessage = message || (code === 404 ? 'The page you requested was not found.' : 'An error occurred.')

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
              <Button onClick={window.location.reload} color="primary" className="px-6">
                Refresh
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ErrorScreen
