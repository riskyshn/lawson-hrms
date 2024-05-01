import MainModal from '@/components/Elements/Modals/MainModal'
import { candidateService, masterService } from '@/services'
import { axiosErrorMessage } from '@/utils/axios'
import { Button, Select, Spinner, useToast } from 'jobseeker-ui'
import React, { useEffect, useState } from 'react'

type WithdrawModalProps = {
  applicant?: IDataTableApplicant
  onClose?: () => void
  onUpdated?: () => void
  show?: boolean
}

const WithdrawModal: React.FC<WithdrawModalProps> = ({ applicant, onClose, onUpdated, show }) => {
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
        withdrawReason: selectedReason.name,
        withdrawReasonId: selectedReason.oid,
      })
      onUpdated?.()
      onClose?.()
    } catch (e) {
      toast(axiosErrorMessage(e), { color: 'error' })
    }
    setLoading(false)
  }

  return (
    <MainModal className="max-w-xl py-12" onClose={onClose} show={!!show}>
      <div className="mb-8">
        <h4 className="mb-2 text-center text-2xl font-semibold">Candidate Withdraw</h4>
        <p className="text-center">Please select the reason of why this candidate is Withdraw</p>
      </div>

      {reasons && (
        <>
          <Select
            className="mb-3"
            label="Select Reason"
            onChange={(v) => setSelectReasonId(String(v))}
            options={reasons.map((el) => ({ label: el.name, value: el.oid }))}
            placeholder="Underqualified, Salary Expectation Too High"
            value={selectReasonId}
          />
          <Button block className="mx-auto" color="primary" disabled={loading} loading={loading} onClick={handleSelectReason}>
            Submit
          </Button>
        </>
      )}

      {!reasons && (
        <div className="flex items-center justify-center py-48">
          <Spinner className="text-primary-600" height={40} />
        </div>
      )}
    </MainModal>
  )
}

export default WithdrawModal
