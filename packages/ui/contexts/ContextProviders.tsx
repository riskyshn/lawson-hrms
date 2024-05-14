import { ConfirmProvider } from './ConfirmContext'
import { LayoutProvider } from './LayoutContext'
import { MediaPreviewerProvider } from './MediaPreviewerContext'
import { PubSubProvider } from './PubSubContext'
import { ToastProvider } from './ToastContext'

export const ContextProviders: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <PubSubProvider>
      <MediaPreviewerProvider>
        <LayoutProvider>
          <ToastProvider>
            <ConfirmProvider>{children}</ConfirmProvider>
          </ToastProvider>
        </LayoutProvider>
      </MediaPreviewerProvider>
    </PubSubProvider>
  )
}

export default ContextProviders
