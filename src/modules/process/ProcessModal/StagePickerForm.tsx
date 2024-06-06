import type { IApplicantStage } from '@/types'
import React from 'react'
import { Button, CardFooter, InputRadio } from 'jobseeker-ui'
import { twJoin } from 'tailwind-merge'

type PropTypes = {
  onCancel?: () => void
  onNext?: () => void
  onValueChange?: (value: string) => void

  stages: {
    assessments: IApplicantStage[]
    interviews: IApplicantStage[]
  }
  value?: string
}

const StagePickerForm: React.FC<PropTypes> = ({ onCancel, onNext, onValueChange, stages, value }) => {
  return (
    <>
      <div className="flex flex-col gap-3 p-3">
        {stages.interviews.length > 0 && (
          <div>
            <h6 className="mb-3 text-sm font-semibold">Interview</h6>
            {stages.interviews.map((option, index) => (
              <InputRadio
                checked={value == option.oid}
                className={twJoin('mb-3', !option.isAvailable ? 'pointer-events-none opacity-70' : 'text-gray-900')}
                id={option.oid}
                key={index}
                name="stageId"
                onChange={() => onValueChange?.(option.oid)}
                value={option.type}
              >
                {option.name}
              </InputRadio>
            ))}
          </div>
        )}

        {stages.assessments.length > 0 && (
          <div>
            <h6 className="mb-3 text-sm font-semibold">SELECTION</h6>
            {stages.assessments.map((option, index) => (
              <InputRadio
                checked={value == option.oid}
                className={twJoin('mb-3', !option.isAvailable ? 'pointer-events-none opacity-70' : 'text-gray-900')}
                disabled={!option.isAvailable}
                id={option.oid}
                key={index}
                name="stageId"
                onChange={() => onValueChange?.(option.oid)}
                value={option.type}
              >
                {option.name}
              </InputRadio>
            ))}
          </div>
        )}
      </div>

      <CardFooter className="gap-3">
        <Button className="w-24" color="error" onClick={onCancel} type="button" variant="light">
          Cancel
        </Button>
        <Button className="w-24" color="primary" disabled={!value} onClick={onNext} type="button">
          Next
        </Button>
      </CardFooter>
    </>
  )
}

export default StagePickerForm
