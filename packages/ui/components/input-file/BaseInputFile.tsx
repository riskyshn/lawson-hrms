import { forwardRef, useState } from 'react'
import { twJoin, twMerge } from 'tailwind-merge'
import { BaseInputFileProps } from './types'

export const BaseInputFile = forwardRef<HTMLInputElement, BaseInputFileProps>((props, ref) => {
  const { error, placeholder, id, name, className, toggleText, onChange, ...rest } = props
  const [selectedFile, setSelectedFile] = useState<FileList | null>(null)

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const files = e.target.files
    setSelectedFile(files)
    onChange?.(e)
  }

  return (
    <label
      htmlFor={id || name}
      className={twMerge(
        'relative flex h-10 w-full items-center gap-2 rounded-lg border px-2 text-sm text-gray-700 focus:outline-none disabled:bg-gray-50',
        !selectedFile && 'text-gray-400',
        error ? 'border-error-600 bg-error-50 focus:bg-white' : 'border-gray-300 bg-white focus:border-primary-600',
        className,
      )}
    >
      <span className={twJoin('flex h-full items-center border-r pr-2 text-gray-700 ', error ? 'border-error-600' : 'border-gray-300')}>
        {toggleText || 'Choose File'}
      </span>
      <span className="flex items-center">
        {selectedFile && selectedFile?.length > 0
          ? Array.from(selectedFile)
              .map((file) => file.name)
              .join(', ')
          : placeholder || 'No file chosen'}
      </span>
      <input
        aria-hidden="true"
        ref={ref}
        id={id || name}
        name={name}
        type="file"
        className="absolute inset-0 opacity-0"
        onChange={handleFileChange}
        {...rest}
      />
    </label>
  )
})

BaseInputFile.displayName = 'BaseInputFile'
