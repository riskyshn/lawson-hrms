import React from 'react'
import { Route, Routes } from 'react-router-dom'

// Layouts
import MainLayout from './components/Layout/MainLayout/MainLayout'
import AuthLayout from './components/Layout/AuthLayout/AuthLayout'

// Errors Pages
import NotFoundPage from './pages/Errors/NotFoundPage'

// Auth Pages
import LoginPage from './pages/Auth/LoginPage'
import ForgotPasswordPage from './pages/Auth/ForgotPasswordPage'
import ResetPasswordPage from './pages/Auth/ResetPasswordPage'

// Main Pages
import DashboardPage from './pages/Main/Dashboard/DashboardPage'

const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
      </Route>

      <Route path="/" element={<MainLayout />}>
        <Route index element={<DashboardPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default Router
