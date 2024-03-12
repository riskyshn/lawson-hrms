import { useEffect } from 'react' // Import useEffect hook
import { Outlet, useNavigate, createBrowserRouter } from 'react-router-dom'
import { useToast } from 'jobseeker-ui'
import { useAuthStore } from '@/store'
import NotFoundPage from '@/pages/NotFoundPage'
import privateRoutes from './private.route'
import guestRoutes from './guest.route'

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

  if (props.private && user) return <Outlet />
  if (props.guest && !user) return <Outlet />
  return null
}

const router = createBrowserRouter([
  {
    element: <AuthChecker private />,
    children: privateRoutes,
  },
  {
    element: <AuthChecker guest />,
    children: guestRoutes,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])

export default router
