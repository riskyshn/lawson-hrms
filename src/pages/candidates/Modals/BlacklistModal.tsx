import React, { useState } from 'react'
import { Select, Button, useToast } from 'jobseeker-ui'
import MainModal from '@/components/Elements/MainModal'
import { candidateService } from '@/services'

type BlacklistModalProps = {
  show: boolean
  onClose: () => void
  candidate: any
  onApplyVacancy: (data: string) => void
}

const BlacklistModal: React.FC<BlacklistModalProps> = ({ show, onClose, candidate, onApplyVacancy }) => {
  const [selectReasonId, setSelectReasonId] = useState<string | number>('')
  const toast = useToast()

  const handleChange = (selectedValue: string | number) => {
    setSelectReasonId(selectedValue)
  }

  const handleSelectReason = () => {
    if (!setSelectReasonId) {
      return
    }

    const payload = {
      applicantId: candidate.id,
      blacklistReasonId: candidate.blacklistReasonId,
      blacklistReason: candidate.blacklistReason,
    }

    candidateService
      .createBlacklist(payload)
      .then(() => {
        toast('blacklist successfully.', { color: 'success' })
        const newData = new Date().toISOString()
        onApplyVacancy(newData)
      })
      .catch(() => {
        toast('An error occurred while blacklist.', { color: 'error' })
      })
  }

  return (
    <MainModal className="max-w-xl py-12" show={show} onClose={onClose}>
      <div className="mb-8">
        <h4 className="mb-2 text-center text-2xl font-semibold">Blacklist</h4>
        <p className="text-center">Please select the reason of why this candidate is Blacklist</p>
      </div>
      <Select
        label="Select Reason"
        placeholder="Underqualified, Salary Expectation Too High"
        options={[]}
        className="mb-3"
        value={selectReasonId}
        onChange={handleChange}
      />
      <Button block color="primary" className="mx-auto" onClick={handleSelectReason}>
        Submit
      </Button>
    </MainModal>
  )
}

export default BlacklistModal
