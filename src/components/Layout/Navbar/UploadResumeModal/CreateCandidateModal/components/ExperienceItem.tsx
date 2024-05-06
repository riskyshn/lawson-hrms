import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import { Button, Input, InputDate } from 'jobseeker-ui'
import { InferType } from 'yup'
import { experiencesSchema } from './shared'

type Schema = InferType<typeof experiencesSchema>

type PropTypes = {
  form: UseFormReturn<Schema>
  hideRemoveButton?: boolean
  index: number
  onRemove: (index: number) => void
}

const ExperienceItem: React.FC<PropTypes> = ({ form, hideRemoveButton, index, onRemove }) => {
  const {
    formState: { errors },
    getValues,
    register,
    setValue,
    trigger,
  } = form

  return (
    <div className="grid grid-cols-1 gap-2 rounded-lg border p-3 shadow-sm odd:bg-gray-100">
      <Input
        error={errors.experiences?.[index]?.companyName?.message}
        label="Company Name"
        labelRequired
        placeholder="Company Name"
        {...register(`experiences.${index}.companyName`)}
      />
      <Input
        error={errors.experiences?.[index]?.positionName?.message}
        label="Position"
        labelRequired
        placeholder="Position"
        {...register(`experiences.${index}.positionName`)}
      />
      <div className="grid grid-cols-2 gap-2">
        <InputDate
          displayFormat="DD/MM/YYYY"
          error={errors.experiences?.[index]?.startDate?.message}
          label="Start Date"
          labelRequired
          onValueChange={(v) => {
            setValue(`experiences.${index}.startDate`, v)
            trigger(`experiences.${index}.startDate`)
          }}
          value={getValues(`experiences.${index}.startDate`)}
        />
        <InputDate
          displayFormat="DD/MM/YYYY"
          error={errors.experiences?.[index]?.endDate?.message}
          label="End Date"
          labelRequired
          onValueChange={(v) => {
            setValue(`experiences.${index}.endDate`, v)
            trigger(`experiences.${index}.endDate`)
          }}
          value={getValues(`experiences.${index}.endDate`)}
        />
      </div>
      {!hideRemoveButton && (
        <div className="flex justify-end">
          <Button color="error" onClick={() => onRemove(index)} size="small" type="button" variant="light">
            Remove
          </Button>
        </div>
      )}
    </div>
  )
}

export default ExperienceItem
