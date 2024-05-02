import { usePreviewImage } from '@/contexts/MediaPreviewerContext'
import { s3Service } from '@/services'
import { axiosErrorMessage } from '@/utils/axios'
import formatFileSize from '@/utils/format-file-sizes'
import { AxiosRequestConfig } from 'axios'
import { Avatar, Button } from 'jobseeker-ui'
import moment from 'moment'
import React, { ChangeEvent, useRef, useState } from 'react'
import { twJoin } from 'tailwind-merge'

interface PhotoProfileFileUploadProps {
  nickname?: string
  onChange?: (value: string) => void
  onError?: (value: string) => void
  onProgress?: (data: { estimated: number; progress: number }) => void
  onStart?: () => void
  value?: string
}

const PhotoProfileFileUpload: React.FC<PhotoProfileFileUploadProps> = ({ nickname, onChange, onError, onProgress, onStart, value }) => {
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
        className={twJoin('cursor-default bg-primary-100 text-primary-600', value && 'cursor-pointer')}
        name={nickname || 'Avatar'}
        onClick={() => previewImage(value)}
        size={56}
        src={value}
      />

      <Button
        className="px-4"
        disabled={uploading}
        loading={uploading}
        onClick={() => inputRef.current?.click()}
        type="button"
        variant="outline"
      >
        Change
      </Button>

      {selectedImage && (
        <>
          <Button className="px-4" color="error" onClick={handleCancel} type="button">
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
        <Button className="px-4" color="error" onClick={handleRemove} type="button">
          Remove
        </Button>
      )}

      <input
        accept="image/png, image/jpeg, image/jpg"
        aria-hidden="true"
        className="hidden"
        onChange={handleImageChange}
        ref={inputRef}
        type="file"
      />
    </div>
  )
}

export default PhotoProfileFileUpload
