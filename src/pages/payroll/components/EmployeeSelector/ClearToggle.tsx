import React, { useEffect, useRef, useState } from 'react'

type PropTypes = {
  children?: React.ReactNode
  disabled?: boolean
  onClear?: () => void
}

const ClearToggle: React.FC<PropTypes> = ({ children, disabled, onClear }) => {
  const [confirming, setConfirming] = useState(false)
  const timerRef = useRef<null | number>(null)

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
        <button className="text-error-600 disabled:text-gray-400" disabled={disabled} onClick={handleClear} type="button">
          {children}
        </button>
      ) : (
        <>
          Are you sure?
          <button className="text-error-600 mx-2" onClick={handleClear} type="button">
            Yes
          </button>
          <button onClick={handleCancel} type="button">
            No
          </button>
        </>
      )}
    </span>
  )
}

export default ClearToggle
