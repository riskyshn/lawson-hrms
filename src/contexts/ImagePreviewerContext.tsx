import FullScreenModal from '@/components/Elements/FullScreenModal'
import { createContext, useCallback, useContext, useEffect, useState } from 'react'

type ImagePreviewerContextProps = {
  show: boolean
  url?: string | null
  preview: (url?: string | null) => void
}

const ImagePreviewer = createContext<ImagePreviewerContextProps>({
  show: false,
  url: null,
  preview: () => {},
})

export const ImagePreviewerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [show, setShow] = useState(false)
  const [url, setUrl] = useState<string | null>(null)

  const preview = useCallback((url?: string | null) => {
    if (url) {
      setUrl(url)
      setShow(true)
    }
  }, [])

  useEffect(() => {
    const handleChange = () => {
      setShow(false)
    }
    window.addEventListener('popstate', handleChange)
    return () => {
      window.removeEventListener('popstate', handleChange)
    }
  }, [])

  return (
    <ImagePreviewer.Provider value={{ show, url, preview }}>
      <FullScreenModal show={show} onClose={() => setShow(false)}>
        {url && <img src={url} className="block h-full w-full object-contain" />}
      </FullScreenModal>

      {children}
    </ImagePreviewer.Provider>
  )
}

export const usePreviewImage = () => useContext(ImagePreviewer).preview
