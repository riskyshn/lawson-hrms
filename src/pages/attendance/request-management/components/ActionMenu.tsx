import React, { useState } from 'react'
import { Menu } from '@headlessui/react'
import { Button, useConfirm, useToast } from 'jobseeker-ui'
import { CheckCircleIcon, EyeIcon, XCircleIcon } from 'lucide-react'
import { twJoin } from 'tailwind-merge'
import { attendanceService } from '@/services'
import ViewModal from './ViewModal'
// import ConfirmationModal from './ConfirmationModal'

interface ActionMenuProps {
  options: string[]
  items?: any
  onApplyVacancy: (data: string) => void
}

const ActionMenu: React.FC<ActionMenuProps> = ({ options, items, onApplyVacancy }) => {
  const [showOptionModal, setShowOptionModal] = useState(false)
  const [modalType, setModalType] = useState('')
  const confirm = useConfirm()
  const toast = useToast()
  // const [isLoading, setIsLoading] = useState(false)

  const handleViewDetails = async (modalType: string) => {
    setModalType(modalType)
    setShowOptionModal(true)
    if (modalType === 'Reject' || modalType === 'Approve') {
      await handleAction(modalType)
    } else {
      setShowOptionModal(true)
    }
  }

  // const handleViewDetails = (type: string) => {
  //   setShowOptionModal(true)
  //   setModalType(type)
  // }

  const handleConfirmation = async (modalType: string) => {
    let confirmed = false
    switch (modalType) {
      case 'Approve':
      case 'Reject':
        confirmed = await confirm({
          text: `Are you sure you want to reject this request?`,
          confirmBtnColor: 'primary',
          cancelBtnColor: 'error',
        })
        break
      default:
        break
    }
    return confirmed
  }

  const handleAction = async (modalType: string) => {
    const confirmed = await handleConfirmation(modalType)
    if (confirmed) {
      try {
        if (modalType === 'Approve') {
          await attendanceService.approvedRequestManagement(items.oid)
          toast('Approve successfully', { color: 'success' })
        } else if (modalType === 'Reject') {
          await attendanceService.rejectedRequestManagement(items.oid)
          toast('Reject successfully', { color: 'success' })
        }
        const newData = new Date().toISOString()
        onApplyVacancy(newData)
        setShowOptionModal(false)
        setModalType('')
      } catch (e: any) {
        toast(e.response?.data?.meta?.message || e.message, { color: 'error', position: 'top-right' })
      }
    }
    setShowOptionModal(false)
  }

  // const openConfirmation = async (type: string, reason: string) => {
  //   try {
  //     setIsLoading(true)
  //     const payload = {
  //       oid: items.oid,
  //       status: type,
  //       rejectedReason: reason || '',
  //     }

  //     if (type === 'Approve') {
  //       // await attendanceService.approvedRequestManagement(payload)
  //       toast('Attendance approved successfully', { color: 'success' })
  //       const newData = new Date().toISOString()
  //       onApplyVacancy(newData)
  //     } else if (type === 'Reject') {
  //       // await attendanceService.approvedRequestManagement(payload)
  //       toast('Attendance rejected successfully', { color: 'success' })
  //       const newData = new Date().toISOString()
  //       onApplyVacancy(newData)
  //     }
  //     setShowOptionModal(false)
  //     setIsLoading(false)
  //   } catch (e: any) {
  //     toast(e.response?.data?.meta?.message || e.message, { color: 'error' })
  //   }
  // }

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
      {showOptionModal && modalType === 'View Details' && (
        <ViewModal show={showOptionModal} onClose={() => setShowOptionModal(false)} items={items} />
      )}
      {/* {showOptionModal && (
        <ConfirmationModal
          show={showOptionModal}
          onClose={() => setShowOptionModal(false)}
          isLoading={isLoading}
          handleAction={(reason) => {
            openConfirmation(modalType, reason)
          }}
          type={modalType}
        />
      )} */}
    </div>
  )
}

export default ActionMenu
