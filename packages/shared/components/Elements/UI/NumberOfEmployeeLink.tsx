import React from 'react'
import { Link } from 'react-router-dom'
import { UserIcon } from 'lucide-react'
import shortenNumber from '@/utils/shorten-number'

const NumberOfEmployeeLink: React.FC<{ count?: number; to: string }> = ({ count, to }) => {
  return (
    <span className="flex items-center justify-center gap-2">
      <span className="flex">
        <span className="relative flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-success-100 text-center font-semibold text-success-700 shadow-sm">
          <UserIcon size={18} />
        </span>
        <span className="relative -ml-5 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-primary-100 text-center font-semibold text-primary-700 shadow-sm">
          <UserIcon size={18} />
        </span>
        <span className="relative -ml-5 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-error-100 text-center font-semibold text-error-700 shadow-sm">
          <UserIcon size={18} />
        </span>
      </span>
      <Link className="uppercase text-primary-600 underline" title="Number of employee" to={to}>
        {shortenNumber(count || 0)}
      </Link>
    </span>
  )
}

export default NumberOfEmployeeLink
