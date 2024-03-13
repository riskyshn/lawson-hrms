import { Menu } from '@headlessui/react'
import { Button } from 'jobseeker-ui'
import { EditIcon, EyeIcon, TrashIcon } from 'lucide-react'
import React, { useState } from 'react'
import { twJoin } from 'tailwind-merge'
import Modal from './Modal'
import { IJobLevel } from '@/types/oganizartion'

const ActionMenu: React.FC<{ items: IJobLevel; onSubmitSuccess: () => void }> = ({ items, onSubmitSuccess }) => {
  const [modalType, setModalType] = useState('')
  const [showModal, setShowModal] = useState(false)

  const openModal = (type: string = '') => {
    setModalType(type)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
  }

  const renderModal = () => {
    switch (modalType) {
      case 'Edit':
        return <Modal show={showModal} onClose={closeModal} jobLevel={items} onSubmitSuccess={onSubmitSuccess} />
      default:
        return null
    }
  }

  return (
    <div className="text-center">
      {renderModal()}
      <Menu as="div" className="relative">
        <Menu.Button as={Button} color="primary" variant="light" size="small" block className="text-xs">
          Action
        </Menu.Button>
        <Menu.Items className="absolute right-0 z-20 w-56 overflow-hidden rounded-lg border-gray-100 bg-white p-1 shadow-lg ring-[1px] ring-gray-100 focus:outline-none">
          {['Edit', 'View Employees', 'Delete'].map((option, i) => (
            <Menu.Item key={i}>
              {({ active }) => (
                <button
                  className={twJoin('group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm', active && 'bg-primary-100')}
                  onClick={() => openModal(option)}
                >
                  {i === 0 && <EditIcon className={twJoin('h-4 w-4', active ? 'text-primary-600' : 'text-gray-400')} />}
                  {i === 1 && <EyeIcon className={twJoin('h-4 w-4', active ? 'text-primary-600' : 'text-gray-400')} />}
                  {i === 2 && <TrashIcon className={twJoin('h-4 w-4', active ? 'text-red-600' : 'text-red-400')} />}
                  {option}
                </button>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Menu>
    </div>
  )
}

export default ActionMenu
