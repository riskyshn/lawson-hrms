import React, { useEffect, useState } from 'react'
import FullScreenModal from './FullScreenModal'

type ImagePreviewerProps = {
  url?: string | null
  onClose: () => void
}

const ImagePreviewer: React.FC<ImagePreviewerProps> = ({ url, onClose }) => {
  const [data, setData] = useState<string>()

  useEffect(() => {
    if (url) {
      setData(url)
    }
  }, [url])

  if (!data) return null

  return (
    <FullScreenModal show={!!url} onClose={() => onClose?.()}>
      <img src={data || ''} className="block h-full w-full object-contain" />
    </FullScreenModal>
  )
}

export default ImagePreviewer
