import Logo from '@/components/Logo/Logo'
import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export const Component: React.FC = () => {
  return (
    <>
      <div className="flex min-h-screen flex-col bg-gray-100">
        <header className="flex items-center justify-center bg-white py-4 shadow">
          <Link to="/">
            <Logo height={40} />
          </Link>
        </header>
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
      <footer className="border-t bg-gray-50 py-6">
        <p className="text-center text-sm text-gray-500">
          &copy; Copyright {new Date().getFullYear()} -{' '}
          <a href="https://jobseeker.company" className="text-primary-600 hover:text-primary-500">
            Jobseeker Company
          </a>
        </p>
      </footer>
    </>
  )
}

Component.displayName = 'GuestLayout'