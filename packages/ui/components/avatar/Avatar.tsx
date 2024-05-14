import type { AvatarProps } from './types'
import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(({ name, src, size = 40, className, ...props }, ref) => {
  let nickname: string = ''

  if (!src) {
    let initials: string = ''
    const parts = name.split(/[ -]/)
    for (let i = 0; i < parts.length; i++) {
      if (initials.length >= 2) {
        break // Maximum 2 characters
      }
      const partInitial = parts[i].charAt(0)
      initials += partInitial
    }
    nickname = initials.toUpperCase()
  }

  return (
    <span
      ref={ref}
      className={twMerge('relative flex items-center justify-center rounded-lg text-center font-semibold', className)}
      style={{ height: size, width: size }}
      {...props}
    >
      {src ? <img alt={name} height={size} width={size} src={src} className="block h-full w-full rounded" /> : nickname}
    </span>
  )
})

Avatar.displayName = 'Avatar'

export default Avatar
