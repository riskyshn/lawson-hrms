import MainModal from '@/components/Elements/Modals/MainModal'
import { candidateService, masterService } from '@/services'
import { axiosErrorMessage } from '@/utils/axios'
import { Button, Select, Spinner, useToast } from 'jobseeker-ui'
import React, { useEffect, useState } from 'react'

type WithdrawModalProps = {
  show?: boolean
  applicant?: IDataTableApplicant
  onClose?: () => void
  onUpdated?: () => void
}

const WithdrawModal: React.FC<WithdrawModalProps> = ({ show, onClose, applicant, onUpdated }) => {
  const [selectReasonId, setSelectReasonId] = useState('')
  const [loading, setLoading] = useState(false)
  const [reasons, setReasons] = useState<IMasterReason[]>()

  const toast = useToast()

  useEffect(() => {
    const load = async () => {
      const data = await masterService.fetchReasons({ type: 'withdraw' })
      setReasons(data.content)
    }

    if (show && !reasons) load()

    if (show) setSelectReasonId('')
  }, [show, reasons])

  const handleSelectReason = async () => {
    const selectedReason = reasons?.find((reason) => reason.oid === selectReasonId)
    if (!selectedReason) return

    setLoading(true)
    try {
      await candidateService.withdraw({
        applicantId: applicant?.oid,
        withdrawReasonId: selectedReason.oid,
        withdrawReason: selectedReason.name,
      })
      onUpdated?.()
      onClose?.()
    } catch (e) {
      toast(axiosErrorMessage(e), { color: 'error' })
    }
    setLoading(false)
  }

  return (
    <MainModal className="max-w-xl py-12" show={!!show} onClose={onClose}>
      <div className="mb-8">
        <h4 className="mb-2 text-center text-2xl font-semibold">Candidate Withdraw</h4>
        <p className="text-center">Please select the reason of why this candidate is Withdraw</p>
      </div>

      {reasons && (
        <>
          <Select
            label="Select Reason"
            placeholder="Underqualified, Salary Expectation Too High"
            options={reasons.map((el) => ({ value: el.oid, label: el.name }))}
            className="mb-3"
            value={selectReasonId}
            onChange={(v) => setSelectReasonId(String(v))}
          />
          <Button block color="primary" className="mx-auto" disabled={loading} loading={loading} onClick={handleSelectReason}>
            Submit
          </Button>
        </>
      )}

      {!reasons && (
        <div className="flex items-center justify-center py-48">
          <Spinner height={40} className="text-primary-600" />
        </div>
      )}
    </MainModal>
  )
}

export default WithdrawModal
