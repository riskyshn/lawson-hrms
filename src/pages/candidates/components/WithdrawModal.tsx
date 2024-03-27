import React, { useEffect, useState } from 'react'
import { Select, Button, useToast, Spinner } from 'jobseeker-ui'
import MainModal from '@/components/Elements/MainModal'
import { candidateService, masterService } from '@/services'

type WithdrawModalProps = {
  show: boolean
  onClose: () => void
  candidate: any
  onApplyVacancy: (data: string) => void
}

const WithdrawModal: React.FC<WithdrawModalProps> = ({ show, onClose, candidate, onApplyVacancy }) => {
  const [selectReasonId, setSelectReasonId] = useState<string | number>('')
  const toast = useToast()
  const [loading, setLoading] = useState<boolean>(false)
  const [reasonWithdraw, setReasonWithdraw] = useState<any[]>([])

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
  const handleChange = (selectedValue: string | number) => {
    setSelectReasonId(selectedValue)
  }

  const handleSelectReason = () => {
    if (!setSelectReasonId) {
      return
    }

    const selectedReason = reasonWithdraw.find((reason) => reason.oid === selectReasonId)

    const { oid, name } = selectedReason

    const payload = {
      applicantId: candidate.id,
      withdrawReasonId: oid,
      withdrawReason: name,
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
        toast(errorMessage, { color: 'error', position: 'top-right' })
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <MainModal className="max-w-xl py-12" show={show} onClose={onClose}>
      <div className="mb-8">
        <h4 className="mb-2 text-center text-2xl font-semibold">Withdraw</h4>
        <p className="text-center">Please select the reason of why this candidate is Withdraw</p>
      </div>
      <Select
        label="Select Reason"
        placeholder="Underqualified, Salary Expectation Too High"
        options={reasonWithdraw.map((reason) => ({ value: reason.oid, label: reason.name }))}
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

export default WithdrawModal
