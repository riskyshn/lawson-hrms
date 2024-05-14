import type { ICandidate, IMasterReason } from '@jshrms/shared/types'
import React, { useEffect, useState } from 'react'
import MainModal from '@jshrms/shared/components/Elements/Modals/MainModal'
import { candidateService, masterService } from '@jshrms/shared/services'
import { Button, Select, Spinner, useToast } from '@jshrms/ui'

type RejectModalProps = {
  candidate: ICandidate
  onApplyVacancy: (data: string) => void
  onClose: () => void
  show: boolean
}

const RejectModal: React.FC<RejectModalProps> = ({ candidate, onApplyVacancy, onClose, show }) => {
  const [selectReasonId, setSelectReasonId] = useState('')
  const toast = useToast()
  const [loading, setLoading] = useState<boolean>(false)
  const [reasonReject, setReasonReject] = useState<IMasterReason[]>([])

  useEffect(() => {
    fetchReasonReject()
  }, [])

  const fetchReasonReject = async () => {
    try {
      const data = await masterService.fetchReasons({ type: 'reject' })
      setReasonReject(data.content)
    } catch (error) {
      console.error('Error fetching reason:', error)
    }
  }

  const handleChange = (selectedValue: string) => {
    setSelectReasonId(selectedValue)
  }

  const handleSelectReason = () => {
    if (!setSelectReasonId) {
      return
    }

    const selectedReason = reasonReject.find((reason) => reason.oid === selectReasonId)

    const payload = {
      applicantId: candidate.id,
      rejectReason: selectedReason?.name,
      rejectReasonId: selectedReason?.oid,
    }

    setLoading(true)
    candidateService
      .reject(payload)
      .then(() => {
        toast('reject successfully.', { color: 'success' })
        const newData = new Date().toISOString()
        onApplyVacancy(newData)
      })
      .catch((error: any) => {
        const errorMessage = error.response?.data?.meta?.message || error.message
        toast(errorMessage, { color: 'error' })
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <MainModal className="max-w-xl py-12" onClose={onClose} show={show}>
      <div className="mb-8">
        <h4 className="mb-2 text-center text-2xl font-semibold">Reject</h4>
        <p className="text-center">Please select the reason of why this candidate is Reject</p>
      </div>
      <Select
        className="mb-3"
        label="Select Reason"
        onChange={handleChange}
        options={reasonReject.map((reason) => ({ label: reason.name, value: reason.oid }))}
        placeholder="Underqualified, Salary Expectation Too High"
        value={selectReasonId}
      />
      <Button block className="mx-auto" color="primary" onClick={handleSelectReason}>
        {loading ? <Spinner className="text-white-600" height={20} /> : 'Submit'}
      </Button>
    </MainModal>
  )
}

export default RejectModal
