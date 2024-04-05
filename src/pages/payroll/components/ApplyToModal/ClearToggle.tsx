import React, { useEffect, useRef, useState } from 'react'

type PropTypes = {
  disabled?: boolean
  children?: React.ReactNode
  onClear?: () => void
}

const ClearToggle: React.FC<PropTypes> = ({ children, disabled, onClear }) => {
  const [confirming, setConfirming] = useState(false)
  const timerRef = useRef<number | null>(null)

  const handleClear = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
    if (confirming) {
      onClear?.()
      setConfirming(false)
    } else {
      setConfirming(true)
      timerRef.current = window.setTimeout(() => {
        setConfirming(false)
      }, 3000)
    }
  }

  const handleCancel = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
    setConfirming(false)
  }

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [])

  return (
    <span className="block text-sm">
      {!confirming ? (
        <button type="button" disabled={disabled} onClick={handleClear} className="text-error-600 disabled:text-gray-400">
          {children}
        </button>
      ) : (
        <>
          Are you sure?
          <button type="button" onClick={handleClear} className="mx-2 text-error-600">
            Yes
          </button>
          <button type="button" onClick={handleCancel}>
            No
          </button>
        </>
      )}
    </span>
  )
}

export default ClearToggle
