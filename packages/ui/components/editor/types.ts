import { IAllProps } from '@tinymce/tinymce-react'

export type BaseEditorProps = IAllProps & {
  name?: string
  error?: string
  onValueChange?: (value: string) => void
}

export type EditorProps = BaseEditorProps & {
  help?: string
  label?: string
  labelRequired?: boolean
  className?: string
  wrapperClassName?: string
}
