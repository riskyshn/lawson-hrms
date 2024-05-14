import type { ILeave } from '@/types'
import React, { useState } from 'react'
import { Menu } from '@headlessui/react'
import { Button, useToast } from '@jshrms/ui'
import { CheckCircleIcon, EyeIcon, XCircleIcon } from 'lucide-react'
import { twJoin } from 'tailwind-merge'
import { attendanceService } from '@/services'
import ConfirmationModal from './ConfirmationModal'
import ViewModal from './ViewModal'

interface ActionMenuProps {
  items?: ILeave
  onApplyVacancy: (data: string) => void
  options: string[]
}

const ActionMenu: React.FC<ActionMenuProps> = ({ items, onApplyVacancy, options }) => {
  const [showOptionModal, setShowOptionModal] = useState(false)
  const [modalType, setModalType] = useState('')
  const toast = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const handleViewDetails = (type: string) => {
    setShowOptionModal(true)
    setModalType(type)
  }

  const openConfirmation = async (type: string, reason: string) => {
    try {
      setIsLoading(true)
      const payload = {
        oid: items?.oid,
        rejectedReason: reason || '',
        status: type === 'Approve' ? 'approved' : 'rejected',
      }

      if (type === 'Approve') {
        await attendanceService.updateRequest(payload)
        toast('Attendance approved successfully', { color: 'success' })
        const newData = new Date().toISOString()
        onApplyVacancy(newData)
      } else if (type === 'Reject') {
        await attendanceService.updateRequest(payload)
        toast('Attendance rejected successfully', { color: 'success' })
        const newData = new Date().toISOString()
        onApplyVacancy(newData)
      }
      setShowOptionModal(false)
      setIsLoading(false)
    } catch (e: any) {
      toast(e.response?.data?.meta?.message || e.message, { color: 'error' })
    }
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
      {showOptionModal && modalType === 'View Details' && (
        <ViewModal items={items} onClose={() => setShowOptionModal(false)} show={showOptionModal} />
      )}
      {showOptionModal && (modalType === 'Approve' || modalType === 'Reject') && (
        <ConfirmationModal
          handleAction={(reason) => {
            openConfirmation(modalType, reason)
          }}
          isLoading={isLoading}
          onClose={() => setShowOptionModal(false)}
          show={showOptionModal}
          type={modalType}
        />
      )}
    </div>
  )
}

export default ActionMenu
