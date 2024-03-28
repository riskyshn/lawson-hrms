import { useState } from 'react'
import { Menu } from '@headlessui/react'
import { Button } from 'jobseeker-ui'
import { CheckCircleIcon, EyeIcon, XCircleIcon } from 'lucide-react'
import { twJoin } from 'tailwind-merge'
import ConfirmationModal from './ConfirmationModal'

interface ActionMenuProps {
  options: string[]
  items?: any
  onApplyVacancy: (data: string) => void
}

const ActionMenu: React.FC<ActionMenuProps> = ({ options, items, onApplyVacancy }) => {
  const [showOptionModal, setShowOptionModal] = useState(false)
  const [modalType, setModalType] = useState('')

  const handleViewDetails = async (option: string) => {
    setShowOptionModal(true)

    switch (option) {
      case 'View Details':
      case 'Approve':
      case 'Reject':
        setModalType(option)
        break
      default:
        break
    }
  }

  const renderModal = () => {
    switch (modalType) {
      case 'View Details':
        return
      case 'Approve':
        return (
          <ConfirmationModal
            show={showOptionModal}
            onClose={() => setShowOptionModal(false)}
            onApplyVacancy={onApplyVacancy}
            items={items}
            confirmFlag
          />
        )
      case 'Reject':
        return (
          <ConfirmationModal
            show={showOptionModal}
            onClose={() => setShowOptionModal(false)}
            onApplyVacancy={onApplyVacancy}
            items={items}
            rejectFlag
          />
        )
      default:
        return null
    }
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
                  className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm ${
                    active ? 'bg-primary-100' : ''
                  }`}
                  onClick={() => handleViewDetails(option)}
                >
                  {option === 'View Details' && <EyeIcon className={twJoin('h-4 w-4', active ? 'text-primary-600' : 'text-gray-400')} />}
                  {option === 'Approve' && <CheckCircleIcon className={twJoin('h-4 w-4', active ? 'text-green-600' : 'text-green-400')} />}
                  {option === 'Reject' && <XCircleIcon className={twJoin('h-4 w-4', active ? 'text-red-600' : 'text-red-400')} />}
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
