import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { twJoin } from 'tailwind-merge'
import { Modal, Spinner } from '../components'

type MediaType = 'image' | 'video'

type DataType = { url: string; type: MediaType }

type MediaPreviewerContextProps = {
  preview: (data: DataType) => void
  show: boolean
  url?: string
  type?: MediaType
}

const MediaPreviewer = createContext<MediaPreviewerContextProps>({
  preview: () => {},
  show: false,
})

export const MediaPreviewerProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [show, setShow] = useState(false)
  const [data, setData] = useState<DataType | null>(null)
  const [videoPlay, setVideoPlay] = useState(false)

  const preview = useCallback((data: DataType) => {
    setData(data)
    setShow(true)
    console.log(data)
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

  const onVideoPlay = () => {
    setVideoPlay(true)
  }

  return (
    <MediaPreviewer.Provider value={{ preview, show }}>
      <Modal
        className="h-screen w-screen max-w-none rounded-none bg-transparent shadow-none"
        onClose={() => {
          setShow(false)
          setVideoPlay(false)
        }}
        show={show}
        wrapperClassName="p-0 w-screen h-screen"
      >
        {data?.type === 'image' && data.url && <img className="block h-screen w-screen object-contain" src={data.url} />}
        {data?.type === 'video' && data.url && (
          <>
            <video
              className={twJoin('block h-screen w-screen object-contain transition-opacity', !videoPlay && 'pointer-events-none opacity-0')}
              controls
              autoPlay
              src={data.url}
              disablePictureInPicture
              controlsList="nodownload"
              onPlay={onVideoPlay}
            />
            <div
              className={twJoin(
                'pointer-events-none absolute inset-0 z-10 flex items-center justify-center transition-opacity',
                videoPlay && 'opacity-0',
              )}
            >
              <Spinner strokeWidth={1} className="block h-20 w-20 text-primary-600" />
            </div>
          </>
        )}
      </Modal>

      {children}
    </MediaPreviewer.Provider>
  )
}

export const usePreviewImage = () => {
  const preview = useContext(MediaPreviewer).preview
  return (url?: string | null) => {
    if (url) preview({ url, type: 'image' })
  }
}

export const usePreviewVideo = () => {
  const preview = useContext(MediaPreviewer).preview
  return (url?: string | null) => {
    if (url) preview({ url, type: 'video' })
  }
}
