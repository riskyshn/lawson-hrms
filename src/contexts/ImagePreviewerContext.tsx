import { Modal } from 'jobseeker-ui'
import { createContext, useCallback, useContext, useEffect, useState } from 'react'

type ImagePreviewerContextProps = {
  preview: (url?: null | string) => void
  show: boolean
  url?: null | string
}

const ImagePreviewer = createContext<ImagePreviewerContextProps>({
  preview: () => {},
  show: false,
  url: null,
})

export const ImagePreviewerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [show, setShow] = useState(false)
  const [url, setUrl] = useState<null | string>(null)

  const preview = useCallback((url?: null | string) => {
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
    <ImagePreviewer.Provider value={{ preview, show, url }}>
      <Modal
        className="h-screen w-screen max-w-none rounded-none bg-transparent shadow-none"
        onClose={() => setShow(false)}
        show={show}
        wrapperClassName="p-0 w-screen h-screen"
      >
        {url && <img className="block h-screen w-screen object-contain" src={url} />}
      </Modal>

      {children}
    </ImagePreviewer.Provider>
  )
}

export const usePreviewImage = () => useContext(ImagePreviewer).preview
