import React from 'react'
import { Spinner } from '@jshrms/ui'
import { twMerge } from 'tailwind-merge'

type PropTypes = {
  children?: React.ReactNode
  className?: string
  show?: boolean
  spinnerClassName?: string
  spinnerSize?: number
  strokeWidth?: number
}

const LoadingScreen: React.FC<PropTypes> = ({ children, className, show, spinnerClassName, spinnerSize = 40, strokeWidth = 1.5 }) => {
  if (!show) return null

  return (
    <div className={twMerge('flex flex-col items-center justify-center py-48', className)}>
      <Spinner
        className={twMerge('text-primary-600', spinnerClassName)}
        height={spinnerSize}
        strokeWidth={strokeWidth}
        width={spinnerSize}
      />
      {children}
    </div>
  )
}

export default LoadingScreen
