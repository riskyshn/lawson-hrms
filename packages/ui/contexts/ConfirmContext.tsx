import type { ConfirmProps } from '../components'
import { createContext, useContext, useState } from 'react'
import { Confirm } from '../components'
import { usePubSub } from './PubSubContext'

export type ConfirmContextProps = {
  data: Omit<ConfirmProps, 'isShow' | 'onConfirm' | 'onCancel'> | null
  confirm: (data: Omit<ConfirmProps, 'isShow' | 'onConfirm' | 'onCancel'> | string) => Promise<boolean>
}

const ConfirmContext = createContext<ConfirmContextProps>({
  data: null,
  confirm: async () => true,
})

export const ConfirmProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isShow, setIsShow] = useState(false)
  const [data, setData] = useState<Omit<ConfirmProps, 'onConfirm' | 'onCancel'> | null>(null)
  const pubsub = usePubSub()

  const onConfirm = () => {
    setIsShow(false)
    pubsub.publish('confirm', true)
  }

  const onCancel = () => {
    setIsShow(false)
    pubsub.publish('confirm', false)
  }

  const confirm = async (data: Omit<ConfirmProps, 'onConfirm' | 'onCancel'> | string): Promise<boolean> => {
    if (typeof data === 'string') {
      setData({ text: data })
    } else {
      setData(data)
    }
    setIsShow(true)

    return new Promise((resolve) => {
      const unsubscribe = pubsub.subscribe('confirm', (value) => {
        unsubscribe()
        resolve(value)
      })
    })
  }

  return (
    <ConfirmContext.Provider
      value={{
        data,
        confirm,
      }}
    >
      <Confirm isShow={isShow} {...data} onConfirm={onConfirm} onCancel={onCancel} />
      {children}
    </ConfirmContext.Provider>
  )
}

export const useConfirm = () => useContext(ConfirmContext).confirm
