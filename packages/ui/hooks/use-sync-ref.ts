import { MutableRefObject, useEffect, useRef } from 'react'

export const useSyncRef = <T>(ref: MutableRefObject<T> | ((instance: T) => void) | null | undefined) => {
  const innerRef = useRef<T>()

  useEffect(() => {
    if (!ref) return

    if (typeof ref === 'function') {
      ref(innerRef.current!)
    } else {
      ref.current = innerRef.current!
    }
  })

  return innerRef
}
