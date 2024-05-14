import { useState } from 'react'

export const useSteps = (totalStep: number, options?: { onNext?: () => void; onPrev?: () => void }) => {
  const [activeStep, setActiveStep] = useState(0)
  const isFirstStep = activeStep === 0
  const isLastStep = totalStep === activeStep + 1

  const handleNext = () => {
    if (!isLastStep) {
      setActiveStep((currentStep) => currentStep + 1)
      options?.onNext?.()
    }
  }

  const handlePrev = () => {
    if (!isFirstStep) {
      setActiveStep((currentStep) => currentStep - 1)
      options?.onPrev?.()
    }
  }

  return { activeStep, setActiveStep, isLastStep, isFirstStep, handleNext, handlePrev }
}

export default useSteps
