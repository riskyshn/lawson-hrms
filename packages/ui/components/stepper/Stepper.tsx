import type { StepperProps } from './types'
import { forwardRef } from 'react'
import { Check } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

const Stepper = forwardRef<HTMLOListElement, StepperProps>(({ activeStep, steps, onActivateStep, className, ...props }, ref) => {
  return (
    <ol ref={ref} className={twMerge('flex w-full items-center justify-center gap-3', className)} {...props}>
      {steps.map((step, index) => (
        <li
          key={index}
          className={twMerge(
            'flex flex-1 flex-col items-center gap-3 rounded-lg border-2 bg-gray-100 p-3 text-center',
            index < activeStep && 'border-success-200 bg-success-100',
            index < activeStep && onActivateStep && 'cursor-pointer hover:bg-success-200',
            index == activeStep && 'bg-white',
          )}
          onClick={() => index < activeStep && onActivateStep?.(index)}
        >
          <span
            className={twMerge(
              'relative flex h-16 w-16 items-center justify-center rounded-full border-4 border-primary-100 text-gray-600',
              index < activeStep && 'border-success-600 bg-success-600 text-white',
              index == activeStep && 'border-primary-600 bg-white text-primary-600',
            )}
          >
            {index < activeStep ? <Check className="h-6 w-6" strokeWidth={3} /> : <span className="text-2xl font-bold">{index + 1}</span>}
          </span>
          <span className="block">
            <h3 className="font-semibold">{step.title}</h3>
            <p className="text-sm text-gray-500">{step.details}</p>
          </span>
        </li>
      ))}
    </ol>
  )
})

Stepper.displayName = 'Stepper'

export default Stepper
