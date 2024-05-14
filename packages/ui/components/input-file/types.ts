export type DropzoneProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  error?: string
  children?: React.ReactNode
}

export type BaseInputFileProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  error?: string
  toggleText?: string
}

export type InputFileProps = BaseInputFileProps & {
  label?: string
  labelRequired?: boolean
  inputClassName?: string
  wrapperClassName?: string
}
