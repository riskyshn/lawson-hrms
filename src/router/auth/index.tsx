import type { RouteObject } from 'react-router-dom'

import AuthLayout from '@/components/Layout/AuthLayout/AuthLayout'
import ForgotPasswordPage from '@/pages/Auth/ForgotPasswordPage'
import LoginPage from '@/pages/Auth/LoginPage'
import ResetPasswordPage from '@/pages/Auth/ResetPasswordPage'

const authRoute: RouteObject = {
  path: 'auth',
  element: <AuthLayout />,
  children: [
    { path: 'login', element: <LoginPage /> },
    { path: 'forgot-password', element: <ForgotPasswordPage /> },
    { path: 'reset-password', element: <ResetPasswordPage /> },
  ],
}

export default authRoute
