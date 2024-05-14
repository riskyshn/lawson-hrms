export type InputWrapperProps = React.HTMLAttributes<HTMLDivElement> & {
  label?: string
  labelRequired?: boolean
  help?: React.ReactNode
  htmlFor?: string
  error?: string
  wrapperClassName?: string
  onLabelClick?: React.MouseEventHandler<HTMLLabelElement>
}
