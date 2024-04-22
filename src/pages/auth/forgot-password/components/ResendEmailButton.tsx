import useTimeout from '@/hooks/use-timeout'
import { authService } from '@/services'
import { axiosErrorMessage } from '@/utils/axios'
import { useToast } from 'jobseeker-ui'
import React, { useState } from 'react'
import { twJoin } from 'tailwind-merge'

const formatTime = (seconds: number) => {
  if (seconds === 0) return '00:00'

  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60

  const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes
  const paddedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds

  return `${paddedMinutes}:${paddedSeconds}`
}

const ResendEmailButton: React.FC<{ email: string; minutes?: number }> = ({ email, minutes = 3 }) => {
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()

  const { timeLeft, resetTimeout } = useTimeout(minutes * 60 * 1000)

  const handleResendEmail = async () => {
    setIsLoading(true)
    try {
      await authService.forgotPasswordRequest({ email })
      resetTimeout()
      toast('Email resent successfully', { color: 'success' })
    } catch (e) {
      toast(axiosErrorMessage(e), { color: 'error' })
    }
    setIsLoading(false)
  }

  return (
    <button
      onClick={handleResendEmail}
      disabled={timeLeft > 0 || isLoading}
      className={twJoin('ml-2 font-semibold underline', (timeLeft > 0 || isLoading) && 'cursor-not-allowed opacity-50')}
    >
      {isLoading ? 'Resending...' : timeLeft > 0 ? `Resend email in ${formatTime(Math.ceil(timeLeft))}` : 'Resend email'}
    </button>
  )
}

export default ResendEmailButton
