import AuthLayout from '@/components/Layout/AuthLayout/AuthLayout'
import ForgotPasswordPage from '@/pages/Auth/ForgotPasswordPage'
import LoginPage from '@/pages/Auth/LoginPage'
import ResetPasswordPage from '@/pages/Auth/ResetPasswordPage'
import ErrorPage from '@/pages/Errors/error-page'
import { RouteObject } from 'react-router-dom'

const authRoute: RouteObject = {
  path: 'auth',
  element: <AuthLayout />,
  errorElement: <ErrorPage />,
  children: [
    { path: 'login', element: <LoginPage /> },
    { path: 'forgot-password', element: <ForgotPasswordPage /> },
    { path: 'reset-password', element: <ResetPasswordPage /> },
  ],
}

export default authRoute
