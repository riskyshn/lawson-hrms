import {
  IntersectionObserverHookArgs,
  IntersectionObserverHookRefCallback as UseInfiniteScrollRefCallback,
  IntersectionObserverHookRootRefCallback as UseInfiniteScrollRootRefCallback,
} from 'react-intersection-observer-hook'

export type { UseInfiniteScrollRefCallback, UseInfiniteScrollRootRefCallback }
export type UseInfiniteScrollResult = [UseInfiniteScrollRefCallback, { rootRef: UseInfiniteScrollRootRefCallback }]

export type UseInfiniteScrollArgs = Pick<IntersectionObserverHookArgs, 'rootMargin'> & {
  loading: boolean
  hasNextPage: boolean
  onLoadMore: VoidFunction
  disabled?: boolean
  delayInMs?: number
}
