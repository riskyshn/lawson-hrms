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
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { twJoin } from 'tailwind-merge'

import BlacklistModal from '../../Modals/BlacklistModal'
import MoveAnotherVacancyModal from '../../Modals/MoveAnotherVacancyModal'
import ProcessModal from '../../Modals/ProcessModal'
import RejectModal from '../../Modals/RejectModal'
import UpdateResultModal from '../../Modals/UpdateResultModal'
import ViewHistoryModal from '../../Modals/ViewHistoryModal'

interface MenuListProps {
  candidate?: any
  items?: { id: number }
  options: string[]
}

const ActionMenu: React.FC<MenuListProps> = ({ candidate, items, options }) => {
  const [showOptionModal, setShowOptionModal] = useState(false)
  const [modalType, setModalType] = useState('')
  const navigate = useNavigate()

  const handleViewDetails = (option: string) => {
    switch (option) {
      case 'Offering Letter':
        navigate(`/process/offering-letter`)
        break
      default:
        setModalType(option)
        break
    }
    setShowOptionModal(true)
  }

  const renderModal = () => {
    switch (modalType) {
      case 'View History':
        return <ViewHistoryModal items={items} onClose={() => setShowOptionModal(false)} show={showOptionModal} />
      case 'Move to Another Vacancy':
        return <MoveAnotherVacancyModal onClose={() => setShowOptionModal(false)} show={showOptionModal} />
      case 'Update Result':
        return <UpdateResultModal onClose={() => setShowOptionModal(false)} show={showOptionModal} />
      case 'Reject':
        return <RejectModal onClose={() => setShowOptionModal(false)} show={showOptionModal} />
      case 'Blacklist':
        return <BlacklistModal onClose={() => setShowOptionModal(false)} show={showOptionModal} />
      case 'Process':
        return <ProcessModal candidate={candidate} onClose={() => setShowOptionModal(false)} show={showOptionModal} />
      default:
        return null
    }
  }

  const iconMap: { [key: string]: JSX.Element } = {
    Blacklist: <UserXIcon />,
    'Move to Another Vacancy': <SendToBackIcon />,
    'Offering Letter': <FileTextIcon />,
    Process: <RefreshCwIcon />,
    Reject: <XCircleIcon />,
    'Update Result': <UserPlus2Icon />,
    'View History': <HistoryIcon />,
    'View in Interview': <CalendarDaysIcon />,
  }

  return (
    <div className="text-center">
      <Menu as="div" className="relative">
        <Menu.Button as={Button} block className="text-xs" color="primary" size="small" variant="light">
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
