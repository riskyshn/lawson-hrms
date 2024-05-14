export type StepperProps = React.OlHTMLAttributes<HTMLOListElement> & {
  activeStep: number
  onActivateStep?: (step: number) => void
  steps: Array<{
    title: string
    details: string
  }>
}
