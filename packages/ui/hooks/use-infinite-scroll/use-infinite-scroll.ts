import type { UseInfiniteScrollArgs, UseInfiniteScrollResult } from './types'
import { useEffect } from 'react'
import { useTrackVisibility } from 'react-intersection-observer-hook'

const DEFAULT_DELAY_IN_MS = 100

export function useInfiniteScroll({
  loading,
  hasNextPage,
  onLoadMore,
  rootMargin,
  disabled,
  delayInMs = DEFAULT_DELAY_IN_MS,
}: UseInfiniteScrollArgs): UseInfiniteScrollResult {
  const [ref, { rootRef, isVisible }] = useTrackVisibility({ rootMargin })
  const shouldLoadMore = !disabled && !loading && isVisible && hasNextPage

  useEffect(() => {
    if (shouldLoadMore) {
      const timer = setTimeout(() => {
        onLoadMore()
      }, delayInMs)
      return () => {
        clearTimeout(timer)
      }
    }
  }, [onLoadMore, shouldLoadMore, delayInMs])

  return [ref, { rootRef }]
}

export default useInfiniteScroll
