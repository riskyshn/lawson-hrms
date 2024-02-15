import React from 'react'
import { Outlet } from 'react-router-dom'
import Logo from '@/components/Logo/Logo'
import BgImage from '@/assets/hero.jpg'

const AuthLayout: React.FC = () => {
  return (
    <>
      <main
        className="flex min-h-screen flex-col bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${BgImage})`,
        }}
      >
        <div className="flex flex-1 flex-col items-center justify-center bg-white/80 p-3">
          <div className="flex px-3 py-5">
            <Logo height={50} />
          </div>
          <div className="w-full max-w-sm rounded-lg border border-gray-100 bg-white shadow">
            <Outlet />
          </div>
        </div>
        <footer className="bg-pirmary-600 flex flex-col gap-3 bg-primary-600/95 px-3 py-8 text-center text-white">
          <h2 className="font-semibold">Having Issues Logging in?</h2>
          <ul className="text-sm">
            <li>Email: info@jobseeker.company</li>
            <li>Whatsapp: +62813 1881 7887</li>
          </ul>
        </footer>
      </main>
    </>
  )
}

export default AuthLayout
