import MainModal from '@/components/Elements/Modals/MainModal'
import React from 'react'

type ModalProps = {
  show: boolean
  onClose?: () => void
  items?: {
    title: string
    start?: string
    end?: string
  } | null
}

const Modal: React.FC<ModalProps> = ({ show, onClose, items }) => {
  return (
    <MainModal className="max-w-xl" show={show} onClose={onClose}>
      {items && (
        <div className="p-4">
          <h2 className="mb-4 text-2xl font-semibold">{items.title}</h2>

          {items.start && items.end && (
            <table className="mb-4 w-full">
              <tbody>
                <tr className="odd:bg-gray-50">
                  <td className="text-sm font-semibold">Day</td>
                  <td className="p-3 text-sm">:</td>
                  <td className="text-sm">
                    {new Date(items.start).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </td>
                </tr>
                <tr className="odd:bg-gray-50">
                  <td className="text-sm font-semibold">Time</td>
                  <td className="p-3 text-sm">:</td>
                  <td className="text-sm">
                    {new Date(items.start).toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: 'numeric',
                      hour12: true,
                    })}{' '}
                    -{' '}
                    {new Date(items.end).toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: 'numeric',
                      hour12: true,
                    })}
                  </td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      )}
    </MainModal>
  )
}

export default Modal
