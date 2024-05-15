import type { IEvent } from '@/types'
import React from 'react'
import { Link } from 'react-router-dom'
import { Modal as BaseModal, Button, ModalHeader } from 'jobseeker-ui'

type ModalProps = {
  items?: IEvent | null
  onClose?: () => void
  show: boolean
}

const Modal: React.FC<ModalProps> = ({ items, onClose, show }) => {
  return (
    <BaseModal onClose={onClose} hideCloseButton show={show}>
      {items && (
        <>
          <ModalHeader onClose={onClose}>{items.title}</ModalHeader>
          {items.start && items.end && (
            <table className="mb-3 table w-full">
              <tbody>
                <tr className="odd:bg-gray-50">
                  <td className="p-3 text-sm font-semibold">Day</td>
                  <td className="p-3 text-sm">:</td>
                  <td className="p-3 text-sm">
                    {new Date(items.start).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </td>
                </tr>
                <tr className="odd:bg-gray-50">
                  <td className="p-3 text-sm font-semibold">Time</td>
                  <td className="p-3 text-sm">:</td>
                  <td className="p-3 text-sm">
                    {new Date(items.start).toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      hour12: true,
                      minute: 'numeric',
                    })}{' '}
                    -{' '}
                    {new Date(items.end).toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      hour12: true,
                      minute: 'numeric',
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
                <tr className="odd:bg-gray-50">
                  <td className="p-3 text-sm font-semibold">Link Meet</td>
                  <td className="p-3 text-sm">:</td>
                  <td className="p-3 text-sm">
                    <Link to={items.linkGmeet || ''} target="_blank" rel="noopener noreferrer">
                      <Button color="primary" variant="default" disabled={!items.linkGmeet}>
                        Link Google Meet
                      </Button>
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          )}
        </>
      )}
    </BaseModal>
  )
}

export default Modal
