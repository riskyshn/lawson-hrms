import type { SkeletonFn, SkeletonProps } from './types'
import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

const Skeleton = forwardRef<any, SkeletonProps>((props, ref) => {
  const { as: Component = 'span', count = 1, className, ...rest } = props

  return (
    <>
      {Array.from(Array(count)).map((_, i) => (
        <Component ref={ref} key={i} className={twMerge('flex h-10 overflow-hidden rounded-lg bg-gray-500/30', className)} {...rest}>
          <span className="flex flex-1 animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-gray-500/30 to-transparent" />
        </Component>
      ))}
    </>
  )
})

Skeleton.displayName = 'Skeleton'

export default Skeleton as typeof SkeletonFn
