import ProcessModal from '@/components/Modals/ProcessModal'
import ViewProcessHistoryModal from '@/components/Modals/ViewProcessHistoryModal'
import { candidateService } from '@/services'
import { Menu } from '@headlessui/react'
import { Button, useToast } from 'jobseeker-ui'
import {
  BookUserIcon,
  CalendarDaysIcon,
  CopyPlusIcon,
  HistoryIcon,
  RefreshCwIcon,
  SendIcon,
  SendToBackIcon,
  ShoppingBagIcon,
  UserIcon,
  UserRoundPlusIcon,
  UserXIcon,
  XCircleIcon,
} from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { twJoin } from 'tailwind-merge'
import SendReminderModal from '../offered/index/components/SendReminderModal'
import ApplyVacancyModal from './ApplyVacancyModal'
import BlacklistModal from './BlacklistModal'
import MoveAnotherVacancyModal from './MoveAnotherVacancyModal'
import RejectModal from './RejectModal'
import WithdrawModal from './WithdrawModal'

interface MenuListProps {
  options: string[]
  candidate?: any
  onApplyVacancy: (data: string) => void
}

const MenuList: React.FC<MenuListProps> = ({ options, candidate, onApplyVacancy }) => {
  const [showOptionModal, setShowOptionModal] = useState(false)
  const [modalType, setModalType] = useState('')
  const toast = useToast()
  const navigate = useNavigate()

  const handleViewDetails = (option: string) => {
    setShowOptionModal(true)

    let payload: any

    switch (option) {
      case 'Move to Another Vacancy':
      case 'Apply to Vacancy':
      case 'Process':
      case 'View History':
      case 'Send Reminder':
      case 'Blacklist':
      case 'Reject':
      case 'Withdraw':
        setModalType(option)
        break

      case 'Unblacklist':
        setModalType('')
        candidateService
          .unblacklist(candidate.candidateId)
          .then(() => {
            toast('unblacklist successfully.', { color: 'success' })
            const newData = new Date().toISOString()
            onApplyVacancy(newData)
          })
          .catch((error: any) => {
            const errorMessage = error.response?.data?.meta?.message || error.message
            toast(errorMessage, { color: 'error', position: 'top-right' })
          })
        break

      case 'Shortlist':
        setModalType('')
        payload = {
          candidateId: candidate.candidateId,
          vacancyId: candidate.vacancyId,
        }
        candidateService
          .createShortlist(payload)
          .then(() => {
            toast('shortlist successfully.', { color: 'success' })
            const newData = new Date().toISOString()
            onApplyVacancy(newData)
          })
          .catch((error: any) => {
            const errorMessage = error.response?.data?.meta?.message || error.message
            toast(errorMessage, { color: 'error', position: 'top-right' })
          })
        break

      case 'View Profile':
        navigate(`/candidates/profile/${candidate.candidateId || candidate.id}`)
        break
      default:
        break
    }
  }

  const renderModal = () => {
    switch (modalType) {
      case 'Process':
        return (
          <ProcessModal
            show={showOptionModal}
            onClose={() => setShowOptionModal(false)}
            applicant={{ oid: candidate.id, candidate: { oid: candidate.candidateId, email: candidate.email, name: candidate.name } }}
          />
        )
      case 'View History':
        return (
          <ViewProcessHistoryModal
            show={showOptionModal}
            onClose={() => setShowOptionModal(false)}
            applicant={{ oid: candidate.id, candidate: { oid: candidate.candidateId, email: candidate.email, name: candidate.name } }}
          />
        )
      case 'Move to Another Vacancy':
        return (
          <MoveAnotherVacancyModal
            show={showOptionModal}
            onClose={() => setShowOptionModal(false)}
            candidate={candidate}
            onApplyVacancy={onApplyVacancy}
          />
        )
      case 'Send Reminder':
        return <SendReminderModal show={showOptionModal} onClose={() => setShowOptionModal(false)} />
      case 'Apply to Vacancy':
        return (
          <ApplyVacancyModal
            show={showOptionModal}
            onClose={() => setShowOptionModal(false)}
            candidate={candidate}
            onApplyVacancy={onApplyVacancy}
          />
        )
      case 'Blacklist':
        return (
          <BlacklistModal
            show={showOptionModal}
            onClose={() => setShowOptionModal(false)}
            candidate={candidate}
            onApplyVacancy={onApplyVacancy}
          />
        )
      case 'Reject':
        return (
          <RejectModal
            show={showOptionModal}
            onClose={() => setShowOptionModal(false)}
            candidate={candidate}
            onApplyVacancy={onApplyVacancy}
          />
        )
      case 'Withdraw':
        return (
          <WithdrawModal
            show={showOptionModal}
            onClose={() => setShowOptionModal(false)}
            candidate={candidate}
            onApplyVacancy={onApplyVacancy}
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
                  className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm ${active && 'bg-primary-100'}`}
                  onClick={() => handleViewDetails(option)}
                >
                  {option === 'Process' && <RefreshCwIcon className={twJoin('h-4 w-4', active ? 'text-primary-600' : 'text-gray-400')} />}
                  {option === 'Move to Another Vacancy' && (
                    <SendToBackIcon className={twJoin('h-4 w-4', active ? 'text-primary-600' : 'text-gray-400')} />
                  )}
                  {option === 'Apply to Vacancy' && (
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
                  {option === 'View Profile' && <UserIcon className={twJoin('h-4 w-4', active ? 'text-primary-600' : 'text-gray-400')} />}
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
