import type { CardHeaderFn, CardHeaderProps } from './types'
import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

const CardHeader = forwardRef<any, CardHeaderProps>((props, ref) => {
  const {
    as: Component = 'div',
    titleAs: TitleComponent = 'div',
    className,
    titleClassName,
    actionsWrapperClassName,
    actions,
    children,
    ...rest
  } = props

  return (
    <Component ref={ref} className={twMerge('flex items-center p-3', className)} {...rest}>
      <TitleComponent className={twMerge('flex-1', titleClassName)}>{children}</TitleComponent>
      {!!actions && <div className={twMerge('flex items-center justify-center gap-3', actionsWrapperClassName)}>{actions}</div>}
    </Component>
  )
})

CardHeader.displayName = 'CardHeader'

export default CardHeader as typeof CardHeaderFn
