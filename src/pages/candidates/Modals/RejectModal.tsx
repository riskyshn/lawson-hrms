import React, { useEffect, useState } from 'react'
import { Select, Button, useToast, Spinner } from 'jobseeker-ui'
import MainModal from '@/components/Elements/MainModal'
import { candidateService, masterService } from '@/services'

type RejectModalProps = {
  show: boolean
  onClose: () => void
  candidate: any
  onApplyVacancy: (data: string) => void
}

const RejectModal: React.FC<RejectModalProps> = ({ show, onClose, candidate, onApplyVacancy }) => {
  const [selectReasonId, setSelectReasonId] = useState<string | number>('')
  const toast = useToast()
  const [loading, setLoading] = useState<boolean>(false)
  const [reasonReject, setReasonReject] = useState<any[]>([])

  useEffect(() => {
    fetchReasonReject()
  }, [])

  const fetchReasonReject = async () => {
    const payload = {
      type: 'reject',
    }
    try {
      const data = await masterService.fetchReason(payload)
      setReasonReject(data.content)
    } catch (error) {
      console.error('Error fetching reason:', error)
    }
  }

  const handleChange = (selectedValue: string | number) => {
    setSelectReasonId(selectedValue)
  }

  const handleSelectReason = () => {
    if (!setSelectReasonId) {
      return
    }

    const selectedReason = reasonReject.find((reason) => reason.oid === selectReasonId)

    const { oid, name } = selectedReason

    const payload = {
      applicantId: candidate.id,
      rejectReasonId: oid,
      rejectReason: name,
    }

    setLoading(true)
    candidateService
      .reject(payload)
      .then(() => {
        toast('reject successfully.', { color: 'success' })
        const newData = new Date().toISOString()
        onApplyVacancy(newData)
      })
      .catch(() => {
        toast('An error occurred while reject.', { color: 'error' })
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <MainModal className="max-w-xl py-12" show={show} onClose={onClose}>
      <div className="mb-8">
        <h4 className="mb-2 text-center text-2xl font-semibold">Reject</h4>
        <p className="text-center">Please select the reason of why this candidate is Reject</p>
      </div>
      <Select
        label="Select Reason"
        placeholder="Underqualified, Salary Expectation Too High"
        options={reasonReject.map((reason) => ({ value: reason.oid, label: reason.name }))}
        className="mb-3"
        value={selectReasonId}
        onChange={handleChange}
      />
      <Button block color="primary" className="mx-auto" onClick={handleSelectReason}>
        {loading ? <Spinner height={20} className="text-white-600" /> : 'Submit'}
      </Button>
    </MainModal>
  )
}

export default RejectModal