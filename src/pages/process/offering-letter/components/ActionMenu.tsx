import React, { useState } from 'react'
import { Menu } from '@headlessui/react'
import { Button } from 'jobseeker-ui'
import { FileEditIcon, FileTextIcon, HistoryIcon, LogOutIcon, SendIcon, UserPlus2Icon, UserXIcon, XCircleIcon } from 'lucide-react'
import { twJoin } from 'tailwind-merge'
import { useNavigate } from 'react-router-dom'
import ViewHistoryModal from '../../Modals/ViewHistoryModal'
import RejectModal from '../../Modals/RejectModal'
import BlacklistModal from '../../Modals/BlacklistModal'
import HireModal from '../../Modals/HireModal'

interface MenuListProps {
  options: string[]
  items?: any
}

const ActionMenu: React.FC<MenuListProps> = ({ options, items }) => {
  const [showOptionModal, setShowOptionModal] = useState(false)
  const [modalType, setModalType] = useState('')
  const navigate = useNavigate()

  const handleViewDetails = (option: string) => {
    switch (option) {
      case 'View History':
      case 'Reject':
      case 'Blacklist':
      case 'Hire':
        setModalType(option)
        setShowOptionModal(true)
        break
      case 'Create Offering Letter':
        navigate('/process/offering-letter/create')
        break
      case 'View Offering Letter':
        navigate('/process/offering-letter/view')
        break
      default:
        break
    }
  }

  const renderModal = () => {
    switch (modalType) {
      case 'View History':
        return <ViewHistoryModal show={showOptionModal} onClose={() => setShowOptionModal(false)} items={items} />
      case 'Reject':
        return <RejectModal show={showOptionModal} onClose={() => setShowOptionModal(false)} />
      case 'Blacklist':
        return <BlacklistModal show={showOptionModal} onClose={() => setShowOptionModal(false)} />
      case 'Hire':
        return <HireModal show={showOptionModal} onClose={() => setShowOptionModal(false)} />
      default:
        return null
    }
  }

  const iconMap: { [key: string]: JSX.Element } = {
    'Create Offering Letter': <FileTextIcon />,
    'Send Reminder': <SendIcon />,
    'View History': <HistoryIcon />,
    Blacklist: <UserXIcon />,
    Reject: <XCircleIcon />,
    Withdraw: <LogOutIcon />,
    'View Offering Letter': <FileTextIcon />,
    Hire: <UserPlus2Icon />,
    'Revise Offering Letter': <FileEditIcon />,
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
                  className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm ${active && 'bg-primary-100'}`}
                  onClick={() => handleViewDetails(option)}
                >
                  {iconMap[option] &&
                    React.cloneElement(iconMap[option], {
                      className: twJoin(
                        'h-4 w-4',
                        option === 'Reject' ? (active ? 'text-red-600' : 'text-red-400') : active ? 'text-primary-600' : 'text-gray-400',
                      ),
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
