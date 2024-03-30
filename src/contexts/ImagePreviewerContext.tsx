import { Modal } from 'jobseeker-ui'
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
      <Modal
        wrapperClassName="p-0 w-screen h-screen"
        className="h-screen w-screen max-w-none rounded-none bg-transparent shadow-none"
        show={show}
        onClose={() => setShow(false)}
      >
        {url && <img src={url} className="block h-screen w-screen object-contain" />}
      </Modal>

      {children}
    </ImagePreviewer.Provider>
  )
}

export const usePreviewImage = () => useContext(ImagePreviewer).preview
