import { usePreviewImage } from '@/contexts/ImagePreviewerContext'
import { s3Service } from '@/services'
import { axiosErrorMessage } from '@/utils/axios'
import formatFileSize from '@/utils/format-file-sizes'
import { AxiosRequestConfig } from 'axios'
import { Avatar, Button } from 'jobseeker-ui'
import moment from 'moment'
import React, { ChangeEvent, useRef, useState } from 'react'
import { twJoin } from 'tailwind-merge'

interface PhotoProfileFileUploadProps {
  value?: string
  nickname?: string
  onStart?: () => void
  onChange?: (value: string) => void
  onError?: (value: string) => void
  onProgress?: (data: { progress: number; estimated: number }) => void
}

const PhotoProfileFileUpload: React.FC<PhotoProfileFileUploadProps> = ({ value, nickname, onStart, onChange, onProgress, onError }) => {
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
        onProgress?.({ progress, estimated: progressEvent.estimated || 0 })
      },
      signal: controller.signal,
    }

    try {
      onStart?.()
      setUploading(true)
      setUploadProgress(0)
      setEstimatedTimeRemaining('preparing upload...')
      const data = await s3Service.upload('candidate-photo-profile', formData, config)
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
    <div className="flex w-full items-center gap-3 py-2 transition-spacing">
      <Avatar
        name={nickname || 'Avatar'}
        src={value}
        size={56}
        className={twJoin('cursor-default bg-primary-100 text-primary-600', value && 'cursor-pointer')}
        onClick={() => previewImage(value)}
      />

      <Button
        type="button"
        className="px-4"
        variant="outline"
        disabled={uploading}
        loading={uploading}
        onClick={() => inputRef.current?.click()}
      >
        Change
      </Button>

      {selectedImage && (
        <>
          <Button type="button" className="px-4" color="error" onClick={handleCancel}>
            Cancel
          </Button>

          <span className="block text-sm font-semibold">
            {formatFileSize(selectedImage.size)}
            {uploading && uploadProgress !== 100 && ` | Uploading: ${uploadProgress}% (${estimatedTimeRemaining})`}
            {uploading && uploadProgress === 100 && ` | Processing your image...`}
          </span>
        </>
      )}
      {!selectedImage && value && valueValidUrl && (
        <Button type="button" className="px-4" color="error" onClick={handleRemove}>
          Remove
        </Button>
      )}

      <input
        ref={inputRef}
        type="file"
        aria-hidden="true"
        className="hidden"
        accept="image/png, image/jpeg, image/jpg"
        onChange={handleImageChange}
      />
    </div>
  )
}

export default PhotoProfileFileUpload
