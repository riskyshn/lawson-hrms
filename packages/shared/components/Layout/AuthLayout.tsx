import React from 'react'
import { Outlet } from 'react-router-dom'
import BgImage from '@/assets/hero.webp'
import Logo from '@/components/Logo/Logo'

export const Component: React.FC = () => {
  return (
    <div
      className="flex min-h-screen flex-col bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${BgImage})`,
      }}
    >
      <main className="flex flex-1 flex-col items-center bg-white/80 p-3 pt-6 md:pt-10 lg:pt-14">
        <header className="flex px-3 py-6 md:pt-10 lg:pt-14">
          <Logo height={50} />
        </header>

        <div className="w-full max-w-sm rounded-lg border border-gray-100 bg-white shadow">
          <Outlet />
        </div>
      </main>
      <footer className="bg-pirmary-600 flex flex-col gap-3 bg-primary-600/95 px-3 py-8 text-center text-white">
        <h2 className="font-semibold">Having Issues Logging in?</h2>
        <ul className="text-sm">
          <li>Email: info@jobseeker.company</li>
          <li>Whatsapp: +62813 1881 7887</li>
        </ul>
      </footer>
    </div>
  )
}

Component.displayName = 'AuthLayout'
