import type { DropzoneProps } from './types'
import { forwardRef, useState } from 'react'
import { UploadCloudIcon } from 'lucide-react'
import { twMerge } from 'tailwind-merge'
import { Badge } from '../badge'

const Dropzone = forwardRef<HTMLInputElement, DropzoneProps>((props, ref) => {
  const { error, placeholder, className, onChange, children, ...rest } = props
  const [selectedFile, setSelectedFile] = useState<FileList | null>(null)

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const files = e.target.files
    setSelectedFile(files)
    onChange?.(e)
  }

  return (
    <label
      className={twMerge(
        'relative flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed',
        error ? 'border-error-600 bg-error-50' : 'border-gray-300 bg-gray-50',
        className,
      )}
    >
      <div className="flex flex-col items-center justify-center pb-6 pt-5">
        <UploadCloudIcon className="mb-4 h-8 w-8 text-gray-500" />

        <p className="mb-2 text-sm text-gray-500">
          {children || (
            <>
              <span className="font-semibold">Click to upload</span> or drag and drop
            </>
          )}
        </p>

        {Array.from(selectedFile || []).length == 0 && placeholder && <p className="text-xs text-gray-500">{placeholder}</p>}

        {selectedFile && Array.from(selectedFile).length > 0 && (
          <p className="flex flex-wrap justify-center gap-1 px-3 text-center text-xs">
            {Array.from(selectedFile).map((file, i) => (
              <Badge size="small" key={i} className="flex border">
                {file.name}
              </Badge>
            ))}
          </p>
        )}
      </div>
      <input aria-hidden="true" ref={ref} type="file" className="absolute inset-0 opacity-0" onChange={handleFileChange} {...rest} />
    </label>
  )
})

Dropzone.displayName = 'Dropzone'

export default Dropzone
