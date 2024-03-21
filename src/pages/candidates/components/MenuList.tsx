import { useState } from 'react'
import ProcessModal from '../Modals/ProcessModal'
import ViewHistoryModal from '../Modals/ViewHistoryModal'
import { Menu } from '@headlessui/react'
import { Button } from 'jobseeker-ui'
import {
  BookUserIcon,
  CalendarDaysIcon,
  CopyPlusIcon,
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
import { candidateService } from '@/services'
import ApplyVacancyModal from '../Modals/ApplyVacancyModal'

interface MenuListProps {
  options: string[]
  candidate?: any
}

const MenuList: React.FC<MenuListProps> = ({ options, candidate }) => {
  const [showOptionModal, setShowOptionModal] = useState(false)
  const [modalType, setModalType] = useState('')

  const handleViewDetails = (option: string) => {
    setShowOptionModal(true)

    let payload: any

    switch (option) {
      case 'Move to Another Vacancy':
      case 'Apply Vacancy':
      case 'Process':
      case 'View History':
      case 'Send Reminder':
        setModalType(option)
        break

      case 'Unblacklist':
        candidateService
          .unblacklist(candidate.candidateId)
          .then(() => {
            // Optionally, you can handle success here (e.g., show a success message)
          })
          .catch((error) => {
            // Handle error here (e.g., show an error message)
            console.error('Error unblacklisting:', error)
          })
        break

      case 'Shortlist':
        payload = {
          candidateId: candidate.candidateId,
          vacancyId: candidate.id,
        }
        candidateService
          .createShortlist(payload)
          .then(() => {
            // Optionally, you can handle success here (e.g., show a success message)
          })
          .catch((error) => {
            // Handle error here (e.g., show an error message)
            console.error('Error shortlisting:', error)
          })
        break

      case 'Blacklist':
        payload = {
          applicantId: candidate.applicantId,
          blacklistReasonId: candidate.blacklistReasonId,
          blacklistReason: candidate.blacklistReason,
        }
        candidateService
          .createBlacklist(payload)
          .then(() => {
            // Optionally, you can handle success here (e.g., show a success message)
          })
          .catch((error) => {
            // Handle error here (e.g., show an error message)
            console.error('Error blacklisting:', error)
          })
        break

      case 'Reject':
        payload = {
          rejectReasonId: candidate.rejectReasonId,
          rejectReason: candidate.rejectReason,
          applicantId: candidate.id,
        }
        candidateService
          .reject(payload)
          .then(() => {
            // Optionally, you can handle success here (e.g., show a success message)
          })
          .catch((error) => {
            // Handle error here (e.g., show an error message)
            console.error('Error rejecting:', error)
          })
        break

      default:
        break
    }
  }

  const renderModal = () => {
    switch (modalType) {
      case 'Process':
        return <ProcessModal show={showOptionModal} onClose={() => setShowOptionModal(false)} candidate={candidate} />
      case 'View History':
        return <ViewHistoryModal show={showOptionModal} onClose={() => setShowOptionModal(false)} candidate={candidate} />
      case 'Move to Another Vacancy':
        return <MoveAnotherVacancyModal show={showOptionModal} onClose={() => setShowOptionModal(false)} candidate={candidate} />
      case 'Send Reminder':
        return <SendReminderModal show={showOptionModal} onClose={() => setShowOptionModal(false)} />
      case 'Apply Vacancy':
        return <ApplyVacancyModal show={showOptionModal} onClose={() => setShowOptionModal(false)} candidate={candidate} />
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
                  {option === 'Apply Vacancy' && (
                    <CopyPlusIcon className={twJoin('h-4 w-4', active ? 'text-primary-600' : 'text-gray-400')} />
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
