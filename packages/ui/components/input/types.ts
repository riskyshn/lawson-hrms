export type BaseInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: string
}

export type BaseTexareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  error?: string
}

export type InputProps = BaseInputProps & {
  help?: string
  label?: string
  labelRequired?: boolean
  inputClassName?: string
  wrapperClassName?: string
  leftChild?: React.ReactNode
  rightChild?: React.ReactNode
}

export type TextareaProps = BaseTexareaProps & {
  help?: string
  label?: string
  labelRequired?: boolean
  textareaClassName?: string
  wrapperClassName?: string
}

export type RadioCheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & {
  id: string
  children?: React.ReactNode
}
