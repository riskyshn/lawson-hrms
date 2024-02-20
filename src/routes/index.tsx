import AuthLayout from '@/components/Layout/AuthLayout/AuthLayout'
import ForgotPasswordPage from '@/pages/Auth/ForgotPasswordPage'
import LoginPage from '@/pages/Auth/LoginPage'
import ResetPasswordPage from '@/pages/Auth/ResetPasswordPage'
import { createBrowserRouter } from 'react-router-dom'
import Private from './private'
import DashboardPage from '@/pages/Main/Dashboard/DashboardPage'
import MainLayout from '@/components/Layout/MainLayout/MainLayout'
import NotFoundPage from '@/pages/Errors/NotFoundPage'
import ErrorPage from '@/pages/Errors/error-page'
import { jobRoute } from './job'
import authRoute from './auth'

const defaultRoute = [
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
]

export const routes = createBrowserRouter([
  ...defaultRoute,
  authRoute,
  jobRoute,
  {
    path: '*',
    element: <NotFoundPage />,
  },
])
