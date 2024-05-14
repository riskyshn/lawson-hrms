import { useEffect } from 'react'
import { createBrowserRouter, Outlet, useNavigate } from 'react-router-dom'
import { useToast } from '@jshrms/ui'
import ErrorBoundary from '@/pages/ErrorBoundary'
import NotFoundPage from '@/pages/NotFoundPage'
import { useAuthStore } from '@/store'
import authRoutes from './auth.routes'
import guestRoutes from './guest.routes'
import mainRoutes from './main.routes'

const AuthChecker: React.FC<{ guest?: boolean; private?: boolean }> = (props) => {
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
    children: mainRoutes,
    element: <AuthChecker private />,
    errorElement: <ErrorBoundary />,
  },
  {
    children: authRoutes,
    element: <AuthChecker guest />,
    errorElement: <ErrorBoundary />,
  },
  {
    children: guestRoutes,
    errorElement: <ErrorBoundary />,
  },
  {
    element: <NotFoundPage />,
    path: '*',
  },
])

export default router
