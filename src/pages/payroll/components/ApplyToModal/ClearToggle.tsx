import React, { useEffect, useRef, useState } from 'react'

const ClearToggle: React.FC<{ onClear: () => void }> = ({ onClear }) => {
  const [confirming, setConfirming] = useState(false)
  const timerRef = useRef<number | null>(null)

  const handleClear = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
    if (confirming) {
      onClear()
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
    <span className="font-semibold">
      {!confirming ? (
        <button type="button" onClick={handleClear} className="ml-3 text-error-600">
          Clear Selection
        </button>
      ) : (
        <>
          {' '}
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
