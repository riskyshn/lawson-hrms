import { Button, InputRadio } from 'jobseeker-ui'
import React from 'react'

type PropTypes = {
  stages: {
    interviews: IRecruitmentStage[]
    assesments: IRecruitmentStage[]
  }
  value?: string
  onValueChange?: (value: string) => void

  onCancel?: () => void
  onNext?: () => void
}

const StagePickerForm: React.FC<PropTypes> = ({ value, stages, onValueChange, onCancel, onNext }) => {
  return (
    <>
      <div className="mb-3">
        <h6 className="mb-2 text-sm font-semibold">Interview</h6>
        {stages.interviews.map((option, index) => (
          <InputRadio
            className="mb-2"
            key={index}
            id={option.oid}
            name="stageId"
            value={option.type}
            checked={value == option.oid}
            onChange={() => onValueChange?.(option.oid)}
          >
            {option.name}
          </InputRadio>
        ))}
      </div>

      <div className="mb-3">
        <h6 className="mb-2 text-sm font-semibold">Assesment</h6>
        {stages.assesments.map((option, index) => (
          <InputRadio
            className="mb-2"
            key={index}
            id={option.oid}
            name="stageId"
            value={option.type}
            checked={value == option.oid}
            onChange={() => onValueChange?.(option.oid)}
          >
            {option.name}
          </InputRadio>
        ))}
      </div>

      <div className="mt-8 flex justify-end gap-3">
        <Button type="button" color="error" variant="light" className="w-24" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="button" color="primary" className="w-24" disabled={!value} onClick={onNext}>
          Next
        </Button>
      </div>
    </>
  )
}

export default StagePickerForm
