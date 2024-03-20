/* eslint-disable @typescript-eslint/no-unused-vars */
import { Menu } from '@headlessui/react'
import { Button } from 'jobseeker-ui'
import { UserXIcon } from 'lucide-react'
import React, { useState } from 'react'
import { twJoin } from 'tailwind-merge'
import BlacklistModal from './BlacklistModal'

type Employee = {
  name: string
  email?: string
  lastDay?: string
  status?: string
  reason?: string
}

type ActionMenuProps = {
  options: string[]
  items: Employee
}

const ActionMenu: React.FC<ActionMenuProps> = ({ options }) => {
  const [showOptionModal, setShowOptionModal] = useState(false)
  const [modalType, setModalType] = useState('')

  const handleViewDetails = (option: string) => {
    switch (option) {
      default:
        setModalType(option)
        break
    }
    setShowOptionModal(true)
  }

  const renderModal = () => {
    switch (modalType) {
      case 'Blacklist':
        return <BlacklistModal show={showOptionModal} onClose={() => setShowOptionModal(false)} />
      default:
        return null
    }
  }

  const iconMap: { [key: string]: JSX.Element } = {
    Blacklist: <UserXIcon />,
  }

  return (
    <div className="text-center">
      <Menu as="div" className="relative">
        <Menu.Button as={Button} color="primary" variant="light" size="small" block className="text-xs">
          Action
        </Menu.Button>
        <Menu.Items className="absolute right-0 z-20 w-56 overflow-hidden rounded-lg border-gray-100 bg-white p-1 shadow-lg ring-[1px] ring-gray-100 focus:outline-none">
          {options.map((option, index) => (
            <Menu.Item key={index}>
              {({ active }) => (
                <button
                  className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm ${active && 'bg-primary-100'}`}
                  onClick={() => handleViewDetails(option)}
                >
                  {iconMap[option] &&
                    React.cloneElement(iconMap[option], {
                      className: twJoin('h-4 w-4', active ? 'text-primary-600' : 'text-gray-400'),
                    })}
                  {option}
                </button>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Menu>
      {showOptionModal && renderModal()}
    </div>
  )
}

export default ActionMenu
