import type { ToastColor, ToastPosition } from '../components'
import React, { useState } from 'react'
import { Toast } from '../components'

export type ToastContextProps = {
  toasts: Array<{ id: number; color: ToastColor; message: string; position: ToastPosition; createdAt: Date }>
  toast: (message: string, options?: { color?: ToastColor; position?: ToastPosition }) => void
}

const ToastContext = React.createContext<ToastContextProps>({
  toasts: [],
  toast: () => {},
})

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Array<{ id: number; color: ToastColor; message: string; position: ToastPosition; createdAt: Date }>>(
    [],
  )

  const toast = (message: string, options?: { color?: ToastColor; position?: ToastPosition }) => {
    const { color = 'primary', position = 'top-right' } = options || {}
    const newToast = { id: Date.now(), color, message, position, createdAt: new Date() }
    setToasts((prevToasts) => [...prevToasts, newToast])
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== newToast.id))
    }, 3000)
  }

  const closeToast = (toastId: number) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== toastId))
  }

  const group = {
    'top-left': [...toasts.filter((t) => t.position === 'top-left')],
    'top-right': [...toasts.filter((t) => t.position === 'top-right')],
    'top-center': [...toasts.filter((t) => t.position === 'top-center')],
    'bottom-left': [...toasts.filter((t) => t.position === 'bottom-left')],
    'bottom-right': [...toasts.filter((t) => t.position === 'bottom-right')],
    'bottom-center': [...toasts.filter((t) => t.position === 'bottom-center')],
  }

  return (
    <ToastContext.Provider
      value={{
        toasts,
        toast,
      }}
    >
      {!!group['top-left'].length && (
        <div className="fixed left-3 top-3 z-[999999] flex flex-col gap-3">
          {group['top-left'].reverse().map((toast) => (
            <Toast key={toast.id} color={toast.color} handleClose={() => closeToast(toast.id)}>
              {toast.message}
            </Toast>
          ))}
        </div>
      )}

      {!!group['top-right'].length && (
        <div className="fixed right-3 top-3 z-[999999] flex flex-col gap-3">
          {group['top-right'].reverse().map((toast) => (
            <Toast key={toast.id} color={toast.color} handleClose={() => closeToast(toast.id)}>
              {toast.message}
            </Toast>
          ))}
        </div>
      )}

      {!!group['top-center'].length && (
        <div className="fixed left-1/2 top-3 z-[999999] flex -translate-x-1/2 transform flex-col gap-3">
          {group['top-center'].reverse().map((toast) => (
            <Toast key={toast.id} color={toast.color} handleClose={() => closeToast(toast.id)}>
              {toast.message}
            </Toast>
          ))}
        </div>
      )}

      {!!group['bottom-left'].length && (
        <div className="fixed bottom-3 left-3 z-[999999] flex flex-col gap-3">
          {group['bottom-left'].map((toast) => (
            <Toast key={toast.id} color={toast.color} handleClose={() => closeToast(toast.id)}>
              {toast.message}
            </Toast>
          ))}
        </div>
      )}

      {!!group['bottom-right'].length && (
        <div className="fixed bottom-3 right-3 z-[999999] flex flex-col gap-3">
          {group['bottom-right'].map((toast) => (
            <Toast key={toast.id} color={toast.color} handleClose={() => closeToast(toast.id)}>
              {toast.message}
            </Toast>
          ))}
        </div>
      )}

      {!!group['bottom-center'].length && (
        <div className="fixed bottom-3 left-1/2 z-[999999] flex -translate-x-1/2 transform flex-col gap-3">
          {group['bottom-center'].map((toast) => (
            <Toast key={toast.id} color={toast.color} handleClose={() => closeToast(toast.id)}>
              {toast.message}
            </Toast>
          ))}
        </div>
      )}

      {children}
    </ToastContext.Provider>
  )
}

export const useToast = () => React.useContext(ToastContext).toast
