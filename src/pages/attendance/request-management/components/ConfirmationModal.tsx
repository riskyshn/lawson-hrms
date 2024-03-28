import React, { useState } from 'react'
import MainModal from '@/components/Elements/MainModal'
import { Button, useToast } from 'jobseeker-ui'
import { axiosErrorMessage } from '@/utils/axios'
import { attendanceService } from '@/services'

type ConfirmationModalProps = {
  show: boolean
  onClose?: () => void
  onApplyVacancy: (data: string) => void
  items: any
  confirmFlag?: boolean
  rejectFlag?: boolean
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ show, onClose, onApplyVacancy, items, confirmFlag, rejectFlag }) => {
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()

  const handleConfirm = async () => {
    setIsLoading(true)

    try {
      if (confirmFlag) {
        await attendanceService.approvedRequestManagement(items.leaveType.oid)
        toast('Confirmed successfully', { color: 'success' })
      } else if (rejectFlag) {
        await attendanceService.rejectedRequestManagement(items.leaveType.oid)
        toast('Rejected successfully', { color: 'success' })
      }

      onClose?.()
      const newData = new Date().toISOString()
      onApplyVacancy(newData)
    } catch (error) {
      console.error('Error confirming/rejecting action:', error)
      toast(axiosErrorMessage(error), { color: 'error' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <MainModal className="max-w-xl" show={show} onClose={onClose}>
      <div className="text-center">
        <h3 className="text-2xl font-semibold">Are you sure you want to proceed?</h3>
        <p className="text-sm">This action cannot be undone.</p>
      </div>
      <div className="mt-8 flex justify-end gap-3">
        <Button type="button" color="error" variant="light" className="w-24" onClick={onClose} disabled={isLoading}>
          Cancel
        </Button>
        <Button type="button" color="primary" className="w-24" onClick={handleConfirm} loading={isLoading}>
          Confirm
        </Button>
      </div>
    </MainModal>
  )
}

export default ConfirmationModal
