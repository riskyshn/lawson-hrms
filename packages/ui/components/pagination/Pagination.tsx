import type { PaginationProps } from './types'
import React from 'react'
import { twMerge } from 'tailwind-merge'

const Pagination: React.FC<PaginationProps> = ({ className, ...props }) => {
  return <ul className={twMerge('flex gap-1', className)} {...props} />
}

export default Pagination
