import { useState } from 'react'
import ProcessModal from '../Modals/ProcessModal'
import ViewHistoryModal from '../Modals/ViewHistoryModal'
import { Menu } from '@headlessui/react'
import { Button } from 'jobseeker-ui'
import {
  BookUserIcon,
  CalendarDaysIcon,
  HistoryIcon,
  RefreshCwIcon,
  SendIcon,
  SendToBackIcon,
  ShoppingBagIcon,
  UserRoundPlusIcon,
  UserXIcon,
  XCircleIcon,
} from 'lucide-react'
import { twJoin } from 'tailwind-merge'
import MoveAnotherVacancyModal from '../Modals/MoveAnotherVacancyModal'
import SendReminderModal from '../offered/index/components/SendReminderModal'

interface MenuListProps {
  options: string[]
  candidate: any
}

const MenuList: React.FC<MenuListProps> = ({ options, candidate }) => {
  const [showOptionModal, setShowOptionModal] = useState(false)
  const [modalType, setModalType] = useState('')

  const handleViewDetails = (option: string) => {
    if (option === 'Move to Another Vacancy') {
      setModalType('MoveAnotherVacancy')
      setShowOptionModal(true)
    }
    if (option === 'Process') {
      setModalType('Process')
      setShowOptionModal(true)
    }
    if (option === 'View History') {
      setModalType('ViewHistory')
      setShowOptionModal(true)
    }
    if (option === 'Send Reminder') {
      setModalType('SendReminder')
      setShowOptionModal(true)
    }
  }

  const renderModal = () => {
    switch (modalType) {
      case 'Process':
        return <ProcessModal show={showOptionModal} onClose={() => setShowOptionModal(false)} candidate={candidate} />
      case 'ViewHistory':
        return <ViewHistoryModal show={showOptionModal} onClose={() => setShowOptionModal(false)} candidate={candidate} />
      case 'MoveAnotherVacancy':
        return <MoveAnotherVacancyModal show={showOptionModal} onClose={() => setShowOptionModal(false)} candidate={candidate} />
      case 'SendReminder':
        return <SendReminderModal show={showOptionModal} onClose={() => setShowOptionModal(false)} />
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
                  className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm ${active && 'bg-primary-100'}`}
                  onClick={() => handleViewDetails(option)}
                >
                  {option === 'Process' && <RefreshCwIcon className={twJoin('h-4 w-4', active ? 'text-primary-600' : 'text-gray-400')} />}
                  {option === 'Move to Another Vacancy' && (
                    <SendToBackIcon className={twJoin('h-4 w-4', active ? 'text-primary-600' : 'text-gray-400')} />
                  )}
                  {option === 'Shortlist' && <BookUserIcon className={twJoin('h-4 w-4', active ? 'text-primary-600' : 'text-gray-400')} />}
                  {option === 'View History' && (
                    <HistoryIcon className={twJoin('h-4 w-4', active ? 'text-primary-600' : 'text-gray-400')} />
                  )}
                  {option === 'Blacklist' && <UserXIcon className={twJoin('h-4 w-4', active ? 'text-primary-600' : 'text-gray-400')} />}
                  {option === 'Reject' && <XCircleIcon className={twJoin('h-4 w-4', active ? 'text-red-600' : 'text-red-400')} />}
                  {option === 'Send Reminder' && <SendIcon className={twJoin('h-4 w-4', active ? 'text-primary-600' : 'text-gray-400')} />}
                  {option === 'Unblacklist' && (
                    <UserRoundPlusIcon className={twJoin('h-4 w-4', active ? 'text-primary-600' : 'text-gray-400')} />
                  )}
                  {option === 'View in Interview' && (
                    <CalendarDaysIcon className={twJoin('h-4 w-4', active ? 'text-primary-600' : 'text-gray-400')} />
                  )}
                  {option === 'View in Onboarding' && (
                    <ShoppingBagIcon className={twJoin('h-4 w-4', active ? 'text-primary-600' : 'text-gray-400')} />
                  )}
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

export default MenuList
