import MainModal from '@/components/Elements/Modals/MainModal'
import React from 'react'

type ModalProps = {
  show: boolean
  onClose?: () => void
  items?: {
    title: string
    start?: string
    end?: string
    guest?: string[]
    description?: string
    location?: string
    timezone?: string
  } | null
}

const Modal: React.FC<ModalProps> = ({ show, onClose, items }) => {
  return (
    <MainModal className="max-w-xl" show={show} onClose={onClose}>
      {items && (
        <div className="p-4">
          <h2 className="mb-4 text-2xl font-semibold">{items.title}</h2>

          {items.start && items.end && (
            <table className="mb-4 table w-full">
              <tbody>
                <tr className="odd:bg-gray-50">
                  <td className="p-3 text-sm font-semibold">Day</td>
                  <td className="p-3 text-sm">:</td>
                  <td className="p-3 text-sm">
                    {new Date(items.start).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </td>
                </tr>
                <tr className="odd:bg-gray-50">
                  <td className="p-3 text-sm font-semibold">Time</td>
                  <td className="p-3 text-sm">:</td>
                  <td className="p-3 text-sm">
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
                <tr className="odd:bg-gray-50">
                  <td className="p-3 text-sm font-semibold">Guest</td>
                  <td className="p-3 text-sm">:</td>
                  <td className="p-3 text-sm">{items?.guest?.join(', ')}</td>
                </tr>
                <tr className="odd:bg-gray-50">
                  <td className="p-3 text-sm font-semibold">Description</td>
                  <td className="p-3 text-sm">:</td>
                  <td className="whitespace-normal p-3 text-sm">{items.description}</td>
                </tr>
                <tr className="odd:bg-gray-50">
                  <td className="p-3 text-sm font-semibold">Location</td>
                  <td className="p-3 text-sm">:</td>
                  <td className="p-3 text-sm">{items.location}</td>
                </tr>
                <tr className="odd:bg-gray-50">
                  <td className="p-3 text-sm font-semibold">Timezone</td>
                  <td className="p-3 text-sm">:</td>
                  <td className="p-3 text-sm">{items.timezone}</td>
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
