import React, { ChangeEvent, useRef, useState } from 'react'
import { AxiosRequestConfig } from 'axios'
import { Button, usePreviewImage } from 'jobseeker-ui'
import { ImageIcon, UploadCloudIcon } from 'lucide-react'
import moment from 'moment'
import { twJoin } from 'tailwind-merge'
import { s3Service } from '@/services'
import { axiosErrorMessage, formatFileSize, truncateFilename, urlToFilename } from '@/utils'

interface ImageFileUploadProps {
  error?: string
  hidePreview?: boolean
  onChange?: (value: string) => void
  onError?: (value: string) => void
  onProgress?: (data: { estimated: number; progress: number }) => void
  onStart?: () => void
  type: 'candidate-photo-profile' | 'company-logo' | 'employee-national-id'
  value?: string
}

const ImageFileUpload: React.FC<ImageFileUploadProps> = ({ error, hidePreview, onChange, onError, onProgress, onStart, type, value }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState<number>(0)
  const [estimatedTimeRemaining, setEstimatedTimeRemaining] = useState('')
  const [uploading, setUploading] = useState(false)
  const [controller, setController] = useState<AbortController | null>(null)

  const previewImage = usePreviewImage()

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const controller = new AbortController()
      setSelectedImage(event.target.files[0])
      setController(controller)
      handleUpload(event.target.files[0], controller)
    }
  }

  const handleUpload = async (image: File, controller: AbortController) => {
    const formData = new FormData()
    formData.append('file', image)

    const config: AxiosRequestConfig = {
      headers: { 'content-type': 'multipart/form-data' },
      onUploadProgress: (progressEvent) => {
        const progress = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 0))
        setUploadProgress(progress)
        const estimatedTimeRemainingFormatted = moment.duration(progressEvent.estimated || 0, 'seconds').humanize()
        setEstimatedTimeRemaining(estimatedTimeRemainingFormatted)
        onProgress?.({ estimated: progressEvent.estimated || 0, progress })
      },
      signal: controller.signal,
    }

    try {
      onStart?.()
      setUploading(true)
      setUploadProgress(0)
      setEstimatedTimeRemaining('preparing upload...')
      const data = await s3Service.upload(type, formData, config)
      onChange?.(data.link)
    } catch (e: any) {
      onError?.(axiosErrorMessage(e))
    } finally {
      setUploading(false)
    }
  }

  const handleCancel = () => {
    controller?.abort()
    onChange?.('')
    if (inputRef.current) inputRef.current.value = ''
    setSelectedImage(null)
  }

  const handleRemove = () => {
    onChange?.('')
    if (inputRef.current) inputRef.current.value = ''
    setSelectedImage(null)
  }

  const valueValidUrl = /^(ftp|http|https):\/\/[^ "]+$/.test(value || '')

  return (
    <div
      className={twJoin(
        'relative mb-1 flex h-24 w-full items-center justify-center gap-2 rounded-lg border border-dashed p-2 md:h-48',
        error ? 'border-error-600 bg-error-50' : 'border-gray-300 bg-gray-50',
      )}
    >
      {!hidePreview && (
        <div className="relative flex aspect-video h-full items-center justify-center rounded-lg bg-gray-200 text-gray-400">
          {!valueValidUrl && <ImageIcon className="block h-6 w-6 md:h-12 md:w-12" />}
          {valueValidUrl && (
            <>
              <div className="absolute inset-0 z-[2] flex items-center justify-center rounded-lg bg-black/30 opacity-0 transition-opacity hover:opacity-100">
                <Button className="border-0 bg-white" color="primary" onClick={() => previewImage(value)} type="button" variant="light">
                  Preview
                </Button>
              </div>
              <img alt={value} className="block h-full w-full rounded-lg object-contain" src={value} />
            </>
          )}
        </div>
      )}

      <div className="flex flex-1 flex-col items-center justify-center rounded-lg py-5">
        <div className="flex items-center justify-center gap-4">
          <UploadCloudIcon className="hidden h-10 w-10 text-gray-500 sm:block" />
          <div className="flex flex-col">
            <span className="block text-sm font-semibold text-gray-500">Click to upload or drag your file here</span>
            <span className="mb-2 block text-xs text-gray-500">Supported formats: JPG, JPEG or PNG</span>
          </div>
        </div>
        <div className="text-center">
          {selectedImage && (
            <>
              <span className="block text-sm font-semibold text-gray-800">{truncateFilename(selectedImage.name)}</span>
              <span className="block text-xs">
                {formatFileSize(selectedImage.size)}
                {uploading && uploadProgress !== 100 && ` | Uploading: ${uploadProgress}% (${estimatedTimeRemaining})`}
                {uploading && uploadProgress === 100 && ` | Processing your image...`}
                {' | '}
                <button className="text-error-600" onClick={handleCancel} type="button">
                  Cancel
                </button>
              </span>
            </>
          )}
          {!selectedImage && value && valueValidUrl && (
            <>
              <span className="block text-sm font-semibold text-gray-800">{truncateFilename(urlToFilename(value))}</span>
              <span className="block text-xs">
                <button className="text-error-600" onClick={handleRemove} type="button">
                  Remove
                </button>
              </span>
            </>
          )}
        </div>
      </div>

      {!selectedImage && !valueValidUrl && (
        <input
          accept="image/png, image/jpeg, image/jpg"
          aria-hidden="true"
          className="absolute inset-0 z-[3] h-full w-full opacity-0"
          onChange={handleImageChange}
          ref={inputRef}
          type="file"
        />
      )}
    </div>
  )
}

export default ImageFileUpload
