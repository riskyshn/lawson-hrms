import React from 'react'
import { Button, InputRadio, Dropzone, Textarea } from 'jobseeker-ui'
import MainModal from '@/components/Elements/MainModal'

type UpdateResultModalProps = {
  show: boolean
  onClose: () => void
}

const UpdateResultModal: React.FC<UpdateResultModalProps> = ({ show, onClose }) => {
  return (
    <MainModal className="max-w-xl py-12" show={show} onClose={onClose}>
      <div className="mb-8">
        <h4 className="mb-2 text-center text-2xl font-semibold">Candidate Result</h4>
      </div>
      <div className="mb-4">
        <p className="mb-2 text-xs">Update Candidate’s Result</p>
        <div className="flex gap-4">
          <InputRadio className="text-green-600" id={'passed'} name={'status'} value={'passed'}>
            Passed
          </InputRadio>
          <InputRadio className="text-red-600" id={'failed'} name={'status'} value={'failed'}>
            Failed
          </InputRadio>
        </div>
      </div>
      <Textarea className="mb-4" label="Notes" rows={4} />
      <div>
        <p className="mb-2 text-xs">Upload file</p>
        <Dropzone />
      </div>

      <div className="mt-8 flex justify-between">
        <Button onClick={onClose} color="primary" variant="light" className="mr-2 w-1/2">
          Cancel
        </Button>
        <Button color="primary" className="ml-2 w-1/2">
          Submit
        </Button>
      </div>
    </MainModal>
  )
}

export default UpdateResultModal
