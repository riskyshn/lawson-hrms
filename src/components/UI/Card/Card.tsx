import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

const Card = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, children, ...props }, ref) => {
  return (
    <div ref={ref} className={twMerge('flex flex-col rounded-lg border bg-white', className)} {...props}>
      {children}
    </div>
  )
})

export default Card
