import React, { useState } from 'react'
import { Menu } from '@headlessui/react'
import { Button } from 'jobseeker-ui'
import {
  CalendarDaysIcon,
  FileTextIcon,
  HistoryIcon,
  RefreshCwIcon,
  SendToBackIcon,
  UserPlus2Icon,
  UserXIcon,
  XCircleIcon,
} from 'lucide-react'
import { twJoin } from 'tailwind-merge'
import { useNavigate } from 'react-router-dom'
import ViewHistoryModal from '../../Modals/ViewHistoryModal'
import MoveAnotherVacancyModal from '../../Modals/MoveAnotherVacancyModal'
import UpdateResultModal from '../../Modals/UpdateResultModal'
import RejectModal from '../../Modals/RejectModal'
import BlacklistModal from '../../Modals/BlacklistModal'

interface MenuListProps {
  options: string[]
  items?: any
}

const ActionMenu: React.FC<MenuListProps> = ({ options, items }) => {
  const [showOptionModal, setShowOptionModal] = useState(false)
  const [modalType, setModalType] = useState('')
  const navigate = useNavigate()

  const handleViewDetails = (option: string) => {
    setModalType(option)
    setShowOptionModal(true)
    if (option === 'Offering Letter') {
      navigate('/process/offering-letter')
    }
  }

  const renderModal = () => {
    switch (modalType) {
      case 'View History':
        return <ViewHistoryModal show={showOptionModal} onClose={() => setShowOptionModal(false)} items={items} />
      case 'Move to Another Vacancy':
        return <MoveAnotherVacancyModal show={showOptionModal} onClose={() => setShowOptionModal(false)} />
      case 'Update Result':
        return <UpdateResultModal show={showOptionModal} onClose={() => setShowOptionModal(false)} />
      case 'Reject':
        return <RejectModal show={showOptionModal} onClose={() => setShowOptionModal(false)} />
      case 'Blacklist':
        return <BlacklistModal show={showOptionModal} onClose={() => setShowOptionModal(false)} />
      default:
        return null
    }
  }

  const iconMap: { [key: string]: JSX.Element } = {
    Process: <RefreshCwIcon />,
    'Offering Letter': <FileTextIcon />,
    'Move to Another Vacancy': <SendToBackIcon />,
    'View History': <HistoryIcon />,
    'View in Interview': <CalendarDaysIcon />,
    Blacklist: <UserXIcon />,
    Reject: <XCircleIcon />,
    'Update Result': <UserPlus2Icon />,
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
