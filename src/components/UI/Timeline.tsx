import React from 'react'
import { twMerge } from 'tailwind-merge'

export const Timeline: React.FC<React.OlHTMLAttributes<HTMLOListElement>> = ({ className, ...rest }) => {
  return <ol className={twMerge('border-l border-dashed', className)} {...rest} />
}

export const TimelineItem: React.FC<React.LiHTMLAttributes<HTMLLIElement>> = ({ className, children, ...rest }) => {
  return (
    <li className={twMerge('relative mb-5 pl-6 last:mb-0', className)} {...rest}>
      <span className="absolute left-[-0.4rem] top-1.5 flex h-3 w-3 items-center justify-center rounded-full bg-white ring-4 ring-primary-600" />
      {children}
    </li>
  )
}
