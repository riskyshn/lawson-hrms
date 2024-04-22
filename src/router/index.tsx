import ErrorBoundary from '@/pages/ErrorBoundary'
import NotFoundPage from '@/pages/NotFoundPage'
import { useAuthStore } from '@/store'
import { useToast } from 'jobseeker-ui'
import { useEffect } from 'react'
import { Outlet, createBrowserRouter, useNavigate } from 'react-router-dom'
import authRoutes from './auth.routes'
import guestRoutes from './guest.routes'
import mainRoutes from './main.routes'

const AuthChecker: React.FC<{ private?: boolean; guest?: boolean }> = (props) => {
  const { user } = useAuthStore()
  const navigate = useNavigate()
  const toast = useToast()

  useEffect(() => {
    if (props.private && !user) {
      toast('Please log in to access this page', { color: 'primary' })
      navigate('/auth/login')
    }
    if (props.guest && user) navigate('/')

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.private])

  if (props.private) {
    if (user) return <Outlet />
  } else {
    return <Outlet />
  }

  return null
}

const router = createBrowserRouter([
  {
    element: <AuthChecker private />,
    children: mainRoutes,
    errorElement: <ErrorBoundary />,
  },
  {
    element: <AuthChecker guest />,
    children: authRoutes,
    errorElement: <ErrorBoundary />,
  },
  {
    children: guestRoutes,
    errorElement: <ErrorBoundary />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])

export default router
