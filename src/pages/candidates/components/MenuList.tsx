import type { IApplicantDataTable } from '@/types'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Menu } from '@headlessui/react'
import { Button, useToast } from 'jobseeker-ui'
import {
  ArrowLeftIcon,
  BookUserIcon,
  CalendarDaysIcon,
  CopyPlusIcon,
  HistoryIcon,
  LaptopIcon,
  ListEndIcon,
  NewspaperIcon,
  PartyPopperIcon,
  RefreshCwIcon,
  SendIcon,
  SendToBackIcon,
  ShoppingBagIcon,
  UserIcon,
  UserRoundPlusIcon,
  UserXIcon,
  XCircleIcon,
} from 'lucide-react'
import { twJoin } from 'tailwind-merge'
import { BlacklistModal, MoveAnotherVacancyModal, ProcessModal, RejectModal, WithdrawModal } from '@/modules/process'
import { candidateService } from '@/services'
import SendReminderModal from '../offered/index/components/SendReminderModal'
import ApplyVacancyModal from './ApplyVacancyModal'
import ViewHistoryModal from './ViewHistoryModal'

interface MenuListProps {
  item: IApplicantDataTable
  onApplyVacancy: (data: string) => void
  options: string[]
}

const MenuList: React.FC<MenuListProps> = ({ item, onApplyVacancy, options }) => {
  const [showOptionModal, setShowOptionModal] = useState(false)
  const [modalType, setModalType] = useState('')
  const toast = useToast()
  const navigate = useNavigate()

  const handleViewDetails = (option: string) => {
    setShowOptionModal(true)

    const formattedName = encodeURIComponent(item.candidate.name || '').replace(/%20/g, '+')

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
          .unblacklist(item.candidate.oid || '')
          .then(() => {
            toast('Unblacklist successfully.', { color: 'success' })
            const newData = new Date().toISOString()
            onApplyVacancy(newData)
          })
          .catch((error: any) => {
            const errorMessage = error.response?.data?.meta?.message || error.message
            toast(errorMessage, { color: 'error' })
          })
        break

      case 'Unshortlist':
        setModalType('')
        candidateService
          .deleteShortlist({
            candidateId: item.candidate.oid,
            vacancyId: item.vacancy.oid,
          })
          .then(() => {
            toast('Unshortlist successfully.', { color: 'success' })
            const newData = new Date().toISOString()
            onApplyVacancy(newData)
          })
          .catch((error: any) => {
            const errorMessage = error.response?.data?.meta?.message || error.message
            toast(errorMessage, { color: 'error' })
          })
        break

      case 'Shortlist':
        setModalType('')
        candidateService
          .createShortlist({
            candidateId: item.candidate.oid,
            vacancyId: item.vacancy.oid,
          })
          .then(() => {
            toast('Shortlist successfully.', { color: 'success' })
            const newData = new Date().toISOString()
            onApplyVacancy(newData)
          })
          .catch((error: any) => {
            const errorMessage = error.response?.data?.meta?.message || error.message
            toast(errorMessage, { color: 'error' })
          })
        break

      case 'View Profile':
        navigate(`/candidates/profile/${item.candidate.oid}`)
        break
      case 'Go to Interview':
        navigate(`/process/interview?search=${formattedName}`)
        break
      case 'Go to Assessment':
        navigate(`/process/assessment?search=${formattedName}`)
        break
      case 'Go to Offering Letter':
        navigate(`/process/offering-letter?search=${formattedName}`)
        break
      case 'Go to Shortlist':
        navigate(`/candidates/shortlisted?search=${formattedName}`)
        break
      case 'Go to Onboarding':
        navigate(`/process/onboarding?search=${formattedName}`)
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
            applicant={{
              candidate: { email: item.candidate.email, name: item.candidate.name, oid: item.candidate.oid },
              oid: item.oid,
            }}
            onClose={() => setShowOptionModal(false)}
            show={showOptionModal}
          />
        )
      case 'View History':
        return <ViewHistoryModal item={item} onClose={() => setShowOptionModal(false)} show={showOptionModal} />
      case 'Move to Another Vacancy':
        return (
          <MoveAnotherVacancyModal
            applicantId={item.oid}
            onRefresh={() => onApplyVacancy(new Date().toISOString())}
            onClose={() => setShowOptionModal(false)}
            show={showOptionModal}
          />
        )
      case 'Send Reminder':
        return <SendReminderModal onClose={() => setShowOptionModal(false)} show={showOptionModal} />
      case 'Apply to Vacancy':
        return (
          <ApplyVacancyModal item={item} onApplyVacancy={onApplyVacancy} onClose={() => setShowOptionModal(false)} show={showOptionModal} />
        )
      case 'Blacklist':
        return (
          <BlacklistModal
            applicantId={item.oid}
            onRefresh={() => onApplyVacancy(new Date().toISOString())}
            onClose={() => setShowOptionModal(false)}
            show={showOptionModal}
          />
        )
      case 'Reject':
        return (
          <RejectModal
            applicantId={item.oid}
            onRefresh={() => onApplyVacancy(new Date().toISOString())}
            onClose={() => setShowOptionModal(false)}
            show={showOptionModal}
          />
        )
      case 'Withdraw':
        return (
          <WithdrawModal
            applicantId={item.oid}
            onRefresh={() => onApplyVacancy(new Date().toISOString())}
            onClose={() => setShowOptionModal(false)}
            show={showOptionModal}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="text-center">
      <Menu as="div" className="relative">
        <Menu.Button as={Button} block className="text-xs" color="primary" disabled={item.status === 'Locked'} size="small" variant="light">
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
                  {option === 'Unshortlist' && (
                    <ArrowLeftIcon className={twJoin('h-4 w-4', active ? 'text-primary-600' : 'text-gray-400')} />
                  )}
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
                  {option == 'Go to Interview' && (
                    <LaptopIcon className={twJoin('h-4 w-4', active ? 'text-primary-600' : 'text-gray-400')} />
                  )}
                  {option == 'Go to Assessment' && (
                    <NewspaperIcon className={twJoin('h-4 w-4', active ? 'text-primary-600' : 'text-gray-400')} />
                  )}

                  {option == 'Go to Offering Letter' && (
                    <PartyPopperIcon className={twJoin('h-4 w-4', active ? 'text-primary-600' : 'text-gray-400')} />
                  )}
                  {option == 'Go to Shortlist' && (
                    <ListEndIcon className={twJoin('h-4 w-4', active ? 'text-primary-600' : 'text-gray-400')} />
                  )}
                  {option == 'Go to Onboarding' && (
                    <LaptopIcon className={twJoin('h-4 w-4', active ? 'text-primary-600' : 'text-gray-400')} />
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
