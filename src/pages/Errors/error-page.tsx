import { isRouteErrorResponse, useRouteError } from 'react-router-dom'
import NotFoundPage from './NotFoundPage'

export default function ErrorPage() {
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return <NotFoundPage />
    }
    return (
      <div>
        <h1>Oops!</h1>
        <h2>{error.status}</h2>
        <p>{error.statusText}</p>
        {error.data?.message && <p>{error.data.message}</p>}
      </div>
    )
  } else {
    console.error(error)
    return <div></div>
  }
}
