import { Spinner } from 'jobseeker-ui'
import React from 'react'
import { twMerge } from 'tailwind-merge'

const LoadingScreen: React.FC<{ show?: boolean; spinnerSize?: number; className?: string; spinnerClassName?: string }> = ({
  show,
  className,
  spinnerClassName,
  spinnerSize = 40,
}) => {
  if (!show) return null

  return (
    <div className={twMerge('flex items-center justify-center py-48', className)}>
      <Spinner height={spinnerSize} width={spinnerSize} className={twMerge('text-primary-600', spinnerClassName)} />
    </div>
  )
}

export default LoadingScreen
