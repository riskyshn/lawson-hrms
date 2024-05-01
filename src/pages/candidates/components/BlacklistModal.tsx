import MainModal from '@/components/Elements/Modals/MainModal'
import { candidateService, masterService } from '@/services'
import { Button, Select, Spinner, useToast } from 'jobseeker-ui'
import React, { useEffect, useState } from 'react'

type BlacklistModalProps = {
  candidate: any
  onApplyVacancy: (data: string) => void
  onClose: () => void
  show: boolean
}

const BlacklistModal: React.FC<BlacklistModalProps> = ({ candidate, onApplyVacancy, onClose, show }) => {
  const [selectReasonId, setSelectReasonId] = useState<string>('')
  const [reasonBlacklist, setReasonBlacklist] = useState<any[]>([])
  const toast = useToast()
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    fetchReasonBlacklist()
  }, [])

  const fetchReasonBlacklist = async () => {
    try {
      const data = await masterService.fetchReasons({ type: 'blacklist' })
      setReasonBlacklist(data.content)
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

    const selectedReason = reasonBlacklist.find((reason) => reason.oid === selectReasonId)

    const { name, oid } = selectedReason

    const payload = {
      applicantId: candidate.id,
      blacklistReason: name,
      blacklistReasonId: oid,
    }

    setLoading(true)
    candidateService
      .createBlacklist(payload)
      .then(() => {
        toast('blacklist successfully.', { color: 'success' })
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
        <h4 className="mb-2 text-center text-2xl font-semibold">Blacklist</h4>
        <p className="text-center">Please select the reason of why this candidate is Blacklist</p>
      </div>
      <Select
        className="mb-3"
        label="Select Reason"
        onChange={handleChange}
        options={reasonBlacklist.map((reason) => ({ label: reason.name, value: reason.oid }))}
        placeholder="Underqualified, Salary Expectation Too High"
        value={selectReasonId}
      />
      <Button block className="mx-auto" color="primary" onClick={handleSelectReason}>
        {loading ? <Spinner className="text-white-600" height={20} /> : 'Submit'}
      </Button>
    </MainModal>
  )
}

export default BlacklistModal
