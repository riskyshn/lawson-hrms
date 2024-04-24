import { Button, Input, InputDate } from 'jobseeker-ui'
import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import { InferType } from 'yup'
import { experiencesSchema } from './shared'

type Schema = InferType<typeof experiencesSchema>

type PropTypes = {
  index: number
  form: UseFormReturn<Schema>
  hideRemoveButton?: boolean
  onRemove: (index: number) => void
}

const ExperienceItem: React.FC<PropTypes> = ({ index, form, hideRemoveButton, onRemove }) => {
  const {
    setValue,
    getValues,
    trigger,
    register,
    formState: { errors },
  } = form

  return (
    <div className="grid grid-cols-1 gap-2 rounded-lg border p-3 shadow-sm odd:bg-gray-100">
      <Input
        label="Company Name"
        labelRequired
        placeholder="Company Name"
        error={errors.experiences?.[index]?.companyName?.message}
        {...register(`experiences.${index}.companyName`)}
      />
      <Input
        label="Position"
        labelRequired
        placeholder="Position"
        error={errors.experiences?.[index]?.positionName?.message}
        {...register(`experiences.${index}.positionName`)}
      />
      <div className="grid grid-cols-2 gap-2">
        <InputDate
          label="Start Date"
          labelRequired
          error={errors.experiences?.[index]?.startDate?.message}
          displayFormat="DD/MM/YYYY"
          value={getValues(`experiences.${index}.startDate`)}
          onValueChange={(v) => {
            setValue(`experiences.${index}.startDate`, v)
            trigger(`experiences.${index}.startDate`)
          }}
        />
        <InputDate
          label="End Date"
          labelRequired
          error={errors.experiences?.[index]?.endDate?.message}
          displayFormat="DD/MM/YYYY"
          value={getValues(`experiences.${index}.endDate`)}
          onValueChange={(v) => {
            setValue(`experiences.${index}.endDate`, v)
            trigger(`experiences.${index}.endDate`)
          }}
        />
      </div>
      {!hideRemoveButton && (
        <div className="flex justify-end">
          <Button type="button" color="error" size="small" variant="light" onClick={() => onRemove(index)}>
            Remove
          </Button>
        </div>
      )}
    </div>
  )
}

export default ExperienceItem
