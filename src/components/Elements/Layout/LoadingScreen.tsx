import { Spinner } from 'jobseeker-ui'
import React from 'react'
import { twMerge } from 'tailwind-merge'

type PropTypes = {
  show?: boolean
  spinnerSize?: number
  className?: string
  spinnerClassName?: string
  children?: React.ReactNode
}

const LoadingScreen: React.FC<PropTypes> = ({ show, className, spinnerClassName, spinnerSize = 40, children }) => {
  if (!show) return null

  return (
    <div className={twMerge('flex flex-col items-center justify-center py-48', className)}>
      <Spinner height={spinnerSize} width={spinnerSize} className={twMerge('text-primary-600', spinnerClassName)} />
      {children}
    </div>
  )
}

export default LoadingScreen
