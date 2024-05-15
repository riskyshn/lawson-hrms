import type { ICandidate, IMasterReason } from '@/types'
import React, { useEffect, useState } from 'react'
import { Button, Select, Spinner, useToast } from 'jobseeker-ui'
import MainModal from '@/components/Modals/MainModal'
import { candidateService, masterService } from '@/services'

type WithdrawModalProps = {
  candidate: ICandidate
  onApplyVacancy: (data: string) => void
  onClose: () => void
  show: boolean
}

const WithdrawModal: React.FC<WithdrawModalProps> = ({ candidate, onApplyVacancy, onClose, show }) => {
  const [selectReasonId, setSelectReasonId] = useState('')
  const toast = useToast()
  const [loading, setLoading] = useState<boolean>(false)
  const [reasonWithdraw, setReasonWithdraw] = useState<IMasterReason[]>([])

  useEffect(() => {
    fetchReasonWithdraw()
  }, [])

  const fetchReasonWithdraw = async () => {
    try {
      const data = await masterService.fetchReasons({ type: 'withdraw' })
      setReasonWithdraw(data.content)
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

    const selectedReason = reasonWithdraw.find((reason) => reason.oid === selectReasonId)

    const payload = {
      applicantId: candidate.id,
      withdrawReason: selectedReason?.name,
      withdrawReasonId: selectedReason?.oid,
    }

    setLoading(true)
    candidateService
      .withdraw(payload)
      .then(() => {
        toast('withdraw successfully.', { color: 'success' })
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
        <h4 className="mb-2 text-center text-2xl font-semibold">Withdraw</h4>
        <p className="text-center">Please select the reason of why this candidate is Withdraw</p>
      </div>
      <Select
        className="mb-3"
        label="Select Reason"
        onChange={handleChange}
        options={reasonWithdraw.map((reason) => ({ label: reason.name, value: reason.oid }))}
        placeholder="Underqualified, Salary Expectation Too High"
        value={selectReasonId}
      />
      <Button block className="mx-auto" color="primary" onClick={handleSelectReason}>
        {loading ? <Spinner className="text-white-600" height={20} /> : 'Submit'}
      </Button>
    </MainModal>
  )
}

export default WithdrawModal
