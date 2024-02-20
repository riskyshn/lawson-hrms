import AuthLayout from '@/components/Layout/AuthLayout/AuthLayout'
import ForgotPasswordPage from '@/pages/Auth/ForgotPasswordPage'
import LoginPage from '@/pages/Auth/LoginPage'
import ResetPasswordPage from '@/pages/Auth/ResetPasswordPage'
import { RouteObject, createBrowserRouter } from 'react-router-dom'
import Private from './private'
import DashboardPage from '@/pages/Main/Dashboard/DashboardPage'
import MainLayout from '@/components/Layout/MainLayout/MainLayout'
import NotFoundPage from '@/pages/Errors/NotFoundPage'
import ErrorPage from '@/pages/Errors/error-page'
import { jobRoute } from './job'
import Guest from './guest'

const defaultRoute: RouteObject[] = [
  {
    path: '/',
    element: <Private />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <MainLayout />,
        children: [
          {
            path: '',
            element: <DashboardPage />,
          },
        ],
      },
    ],
  },

  {
    path: 'auth',
    element: <Guest />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '',
        element: <AuthLayout />,
        children: [
          { path: 'login', element: <LoginPage /> },
          { path: 'forgot-password', element: <ForgotPasswordPage /> },
          { path: 'reset-password', element: <ResetPasswordPage /> },
        ],
      },
    ],
  },
]

export const routes = createBrowserRouter([
  ...defaultRoute,
  jobRoute,
  {
    path: '*',
    element: <NotFoundPage />,
  },
])
