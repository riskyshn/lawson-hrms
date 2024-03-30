import { Button, CardFooter, InputRadio } from 'jobseeker-ui'
import React from 'react'
import { twJoin } from 'tailwind-merge'

type PropTypes = {
  stages: {
    interviews: IApplicantStage[]
    assesments: IApplicantStage[]
  }
  value?: string
  onValueChange?: (value: string) => void

  onCancel?: () => void
  onNext?: () => void
}

const StagePickerForm: React.FC<PropTypes> = ({ value, stages, onValueChange, onCancel, onNext }) => {
  return (
    <>
      <div className="flex flex-col gap-3 p-3">
        {stages.interviews.length > 0 && (
          <div>
            <h6 className="mb-3 text-sm font-semibold">Interview</h6>
            {stages.interviews.map((option, index) => (
              <InputRadio
                className={twJoin('mb-3', !option.isAvailable ? 'pointer-events-none opacity-70' : 'text-gray-900')}
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
        )}

        {stages.assesments.length > 0 && (
          <div>
            <h6 className="mb-3 text-sm font-semibold">Assesment</h6>
            {stages.assesments.map((option, index) => (
              <InputRadio
                className={twJoin('mb-3', !option.isAvailable ? 'pointer-events-none opacity-70' : 'text-gray-900')}
                key={index}
                id={option.oid}
                name="stageId"
                value={option.type}
                checked={value == option.oid}
                onChange={() => onValueChange?.(option.oid)}
                disabled={!option.isAvailable}
              >
                {option.name}
              </InputRadio>
            ))}
          </div>
        )}
      </div>

      <CardFooter className="gap-3">
        <Button type="button" color="error" variant="light" className="w-24" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="button" color="primary" className="w-24" disabled={!value} onClick={onNext}>
          Next
        </Button>
      </CardFooter>
    </>
  )
}

export default StagePickerForm
