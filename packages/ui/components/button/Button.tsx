import type { Color, Size, Variant } from '../../types'
import type { ButtonFn, ButtonProps } from './types'
import { forwardRef } from 'react'
import { twJoin, twMerge } from 'tailwind-merge'
import { variants } from '../../utils'
import Spinner from '../spinner/Spinner'

const Button = forwardRef<any, ButtonProps>((props, ref) => {
  const {
    as: Component = 'button',
    size,
    color,
    variant,
    loading,
    block,
    className,
    disabled,
    iconOnly,
    leftChild,
    rightChild,
    children,
    ...rest
  } = props

  return (
    <Component
      ref={ref}
      disabled={disabled}
      className={twMerge(
        sizeStyles(size).btn,
        colorStyles(color)[variant || 'default'],
        disabled && 'disabled',
        loading && 'loading',
        iconOnly && 'icon-only',
        block ? 'flex w-full' : 'inline-flex',
        'relative items-center justify-center rounded-lg border text-center font-semibold transition-all disabled:opacity-80 [&.disabled]:cursor-default [&.disabled]:opacity-80',
        className,
      )}
      {...rest}
    >
      {leftChild}
      <span className={twJoin(loading && 'text-transparent')}>{children}</span>
      {rightChild}

      {loading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <Spinner className={twJoin(sizeStyles(size).spinner, 'block')} />
        </span>
      )}
    </Component>
  )
})

const colorStyles = variants<Color, Record<Variant, string>>({
  default: {
    default:
      'border-secondary-600 bg-secondary-600 text-white hover:[&:not(:disabled)]:[&:not(.disabled)]:border-secondary-700 hover:[&:not(:disabled)]:[&:not(.disabled)]:bg-secondary-700 hover:[&:not(:disabled)]:[&:not(.disabled)]:text-white',
    light:
      'border-secondary-100 bg-secondary-100 text-secondary-600 hover:[&:not(:disabled)]:[&:not(.disabled)]:border-secondary-200 hover:[&:not(:disabled)]:[&:not(.disabled)]:bg-secondary-200',
    outline:
      'border-secondary-300 text-secondary-600 hover:[&:not(:disabled)]:[&:not(.disabled)]:border-secondary-200 hover:[&:not(:disabled)]:[&:not(.disabled)]:bg-secondary-100',
  },
  primary: {
    default:
      'border-primary-600 bg-primary-600 text-white hover:[&:not(:disabled)]:[&:not(.disabled)]:border-primary-700 hover:[&:not(:disabled)]:[&:not(.disabled)]:bg-primary-700 hover:[&:not(:disabled)]:[&:not(.disabled)]:text-white',
    light:
      'border-primary-100 bg-primary-100 text-primary-600 hover:[&:not(:disabled)]:[&:not(.disabled)]:border-primary-200 hover:[&:not(:disabled)]:[&:not(.disabled)]:bg-primary-200',
    outline:
      'border-primary-300  text-primary-600 hover:[&:not(:disabled)]:[&:not(.disabled)]:border-primary-200 hover:[&:not(:disabled)]:[&:not(.disabled)]:bg-primary-100',
  },
  success: {
    default:
      'border-success-600 bg-success-600 text-white hover:[&:not(:disabled)]:[&:not(.disabled)]:border-success-700 hover:[&:not(:disabled)]:[&:not(.disabled)]:bg-success-700 hover:[&:not(:disabled)]:[&:not(.disabled)]:text-white',
    light:
      'border-success-100 bg-success-100 text-success-600 hover:[&:not(:disabled)]:[&:not(.disabled)]:border-success-200 hover:[&:not(:disabled)]:[&:not(.disabled)]:bg-success-200',
    outline:
      'border-success-300 text-success-600 hover:[&:not(:disabled)]:[&:not(.disabled)]:border-success-200 hover:[&:not(:disabled)]:[&:not(.disabled)]:bg-success-100',
  },
  warning: {
    default:
      'border-warning-600 bg-warning-600 text-white hover:[&:not(:disabled)]:[&:not(.disabled)]:border-warning-700 hover:[&:not(:disabled)]:[&:not(.disabled)]:bg-warning-700 hover:[&:not(:disabled)]:[&:not(.disabled)]:text-white',
    light:
      'border-warning-100 bg-warning-100 text-warning-600 hover:[&:not(:disabled)]:[&:not(.disabled)]:border-warning-200 hover:[&:not(:disabled)]:[&:not(.disabled)]:bg-warning-200',
    outline:
      'border-warning-300 text-warning-600 hover:[&:not(:disabled)]:[&:not(.disabled)]:border-warning-200 hover:[&:not(:disabled)]:[&:not(.disabled)]:bg-warning-100',
  },
  error: {
    default:
      'border-error-600 bg-error-600 text-white hover:[&:not(:disabled)]:[&:not(.disabled)]:border-error-700 hover:[&:not(:disabled)]:[&:not(.disabled)]:bg-error-700 hover:[&:not(:disabled)]:[&:not(.disabled)]:text-white',
    light:
      'border-error-100 bg-error-100 text-error-600 hover:[&:not(:disabled)]:[&:not(.disabled)]:border-error-200 hover:[&:not(:disabled)]:[&:not(.disabled)]:bg-error-200',
    outline:
      'border-error-300 text-error-600 hover:[&:not(:disabled)]:[&:not(.disabled)]:border-error-200 hover:[&:not(:disabled)]:[&:not(.disabled)]:bg-error-100',
  },
})

const sizeStyles = variants<Size, { btn: string; spinner: string }>({
  default: {
    btn: 'px-3 text-sm gap-1 h-10 [&.icon-only]:w-10 [&.icon-only]:px-0',
    spinner: 'h-5 w-5',
  },
  small: {
    btn: 'px-2 text-sm gap-1 h-8 [&.icon-only]:w-8 [&.icon-only]:px-0',
    spinner: 'h-4 w-4',
  },
  large: {
    btn: 'px-4 gap-2 h-12 [&.icon-only]:w-12 [&.icon-only]:px-0',
    spinner: 'h-6 w-6',
  },
})

Button.displayName = 'Button'

export default Button as typeof ButtonFn
