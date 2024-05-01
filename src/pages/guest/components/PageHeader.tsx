import BgImage from '@/assets/hero.webp'
import Logo from '@/components/Logo/Logo'
import React, { PropsWithChildren } from 'react'

const PageHeader: React.FC<PropsWithChildren<{ subTitle?: React.ReactNode }>> = ({ children, subTitle }) => {
  return (
    <div className="relative flex animate-[position_20s_infinite] items-center justify-center overflow-hidden bg-gradient-to-r from-primary-400 to-primary-900 bg-[length:400%] py-12 text-white">
      <div className="container mx-auto">
        <h1 className="mb-3 text-center text-2xl font-semibold">{children}</h1>
        {!!subTitle && <p className="mx-auto max-w-3xl text-center text-sm">{subTitle}</p>}
      </div>
      <span
        className="absolute inset-0 block bg-cover bg-fixed bg-center bg-no-repeat opacity-10"
        style={{
          backgroundImage: `url(${BgImage})`,
        }}
      />
      <Logo className="absolute right-3 top-1/2 ml-auto h-48 w-48 -translate-y-1/2 opacity-30 md:h-72 md:w-72 [&_path]:fill-white" />
    </div>
  )
}

export default PageHeader
