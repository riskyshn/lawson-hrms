/* eslint-disable @typescript-eslint/no-unused-vars */
import { Menu } from '@headlessui/react'
import { Button } from 'jobseeker-ui'
import { EditIcon, XCircleIcon } from 'lucide-react'
import { useState } from 'react'
import { twJoin } from 'tailwind-merge'

type Employee = {
  name: string
  email?: string
  lastDay?: string
  status?: string
  reason?: string
}

type ActionMenuProps = {
  items: Employee
}

const ActionMenu: React.FC<ActionMenuProps> = () => {
  const [modalType, setModalType] = useState('')
  const [_showModal, setShowModal] = useState(false)

  const openModal = (type: string = '') => {
    if (type == 'Resign/Terminate') {
      setModalType(type)
      setShowModal(true)
    }
  }

  const renderModal = () => {
    switch (modalType) {
      case 'Resign/Terminate':
        return null
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
          {['Edit Employee', 'Resign/Terminate'].map((option, i) => (
            <Menu.Item key={i}>
              {({ active }) => (
                <button
                  className={twJoin('group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm', active && 'bg-primary-100')}
                  onClick={() => openModal(option)}
                >
                  {i === 0 && <EditIcon className={twJoin('h-4 w-4', active ? 'text-primary-600' : 'text-gray-400')} />}
                  {i === 1 && <XCircleIcon className={twJoin('h-4 w-4', active ? 'text-red-600' : 'text-red-400')} />}
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
