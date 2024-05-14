import { useEffect, useState } from 'react'

export const useTimeout = (delay: number, callback?: () => void) => {
  const [isTimeoutActive, setIsTimeoutActive] = useState<boolean>(true)
  const [timeLeft, setTimeLeft] = useState<number>(delay / 1000) // Convert milliseconds to seconds

  useEffect(() => {
    if (isTimeoutActive && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1)
      }, 1000) // Update timeLeft every second

      return () => clearTimeout(timer)
    } else if (timeLeft === 0) {
      callback?.()
      setIsTimeoutActive(false)
    }
  }, [callback, delay, isTimeoutActive, timeLeft])

  const resetTimeout = () => {
    setTimeLeft(delay / 1000)
    setIsTimeoutActive(true)
  }

  return { timeLeft, resetTimeout }
}
