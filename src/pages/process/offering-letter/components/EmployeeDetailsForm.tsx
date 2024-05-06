import { masterService, organizationService } from '@/services'
import emmbedToOptions from '@/utils/emmbed-to-options'
import genYupOption from '@/utils/gen-yup-option'
import yupOptionError from '@/utils/yup-option-error'
import { yupResolver } from '@hookform/resolvers/yup'
import { AsyncSelect, Button, Card, CardBody, CardFooter, Input, InputDate } from 'jobseeker-ui'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const schema = yup.object({
  city: genYupOption('City').required(),
  department: genYupOption('Depantment').required(),
  expiryDate: yup.date().label('Expiry Date'),
  jobLevel: genYupOption('Job Level').required(),
  jobType: genYupOption('Job Type').required(),
  joinDate: yup.date().required().label('Join Date'),
  letterNumber: yup.string().required().label('Letter Number'),
  position: genYupOption('Position').required(),
})

const EmployeeDetailsForm: React.FC<{
  defaultValue: any
  handlePrev: () => void
  handleSubmit: (data: any) => void
}> = (props) => {
  const {
    formState: { errors },
    getValues,
    handleSubmit,
    register,
    setValue,
    trigger,
  } = useForm({
    defaultValues: props.defaultValue as yup.InferType<typeof schema>,
    resolver: yupResolver(schema),
  })
  const onSubmit = handleSubmit(props.handleSubmit)

  return (
    <Card as="form" onSubmit={onSubmit}>
      <CardBody className="grid grid-cols-1 gap-2">
        <div className="pb-2">
          <h3 className="text-lg font-semibold">Employment Details</h3>
          <p className="text-xs text-gray-500">Please fill out this form below</p>
        </div>

        <Input
          error={errors.letterNumber?.message}
          label="Letter Number"
          labelRequired
          placeholder="Letter Number"
          {...register('letterNumber')}
        />
        <AsyncSelect
          action={organizationService.fetchPositions}
          converter={emmbedToOptions}
          error={yupOptionError(errors.position)}
          label="Position"
          labelRequired
          name="position"
          onValueChange={(v) => {
            setValue('position', v)
            trigger('position')
          }}
          placeholder="Select Position"
          value={getValues('position')}
        />
        <AsyncSelect
          action={organizationService.fetchDepartments}
          converter={emmbedToOptions}
          error={yupOptionError(errors.department)}
          label="Deparment"
          labelRequired
          name="department"
          onValueChange={(v) => {
            setValue('department', v)
            trigger('department')
          }}
          placeholder="Select Deparment"
          value={getValues('department')}
        />
        <AsyncSelect
          action={organizationService.fetchJobLevels}
          converter={emmbedToOptions}
          error={yupOptionError(errors.jobLevel)}
          label="Job Level"
          labelRequired
          name="jobLevel"
          onValueChange={(v) => {
            setValue('jobLevel', v)
            trigger('jobLevel')
          }}
          placeholder="Select Job Level"
          value={getValues('jobLevel')}
        />
        <AsyncSelect
          action={organizationService.fetchJobTypes}
          converter={emmbedToOptions}
          params={{ status: 1 }}
          error={yupOptionError(errors.jobType)}
          label="Employment Type"
          labelRequired
          name="jobType"
          onValueChange={(v) => {
            setValue('jobType', v)
            trigger('jobType')
          }}
          placeholder="Select Employment Type"
          value={getValues('jobType')}
        />
        <AsyncSelect
          action={masterService.fetchCities}
          converter={emmbedToOptions}
          error={yupOptionError(errors.city)}
          label="City"
          labelRequired
          name="cityId"
          onChange={(v) => {
            setValue('city', v)
            trigger('city')
          }}
          placeholder="Select City"
          searchMinCharacter={3}
          value={getValues('city')}
        />
        <InputDate
          displayFormat="DD/MM/YYYY"
          error={errors.joinDate?.message}
          label="Join Date"
          labelRequired
          onValueChange={(v) => {
            setValue('joinDate', v)
            trigger('joinDate')
          }}
          placeholder="Join Date"
          popoverDirection="up"
          value={getValues('joinDate')}
        />
        <InputDate
          displayFormat="DD/MM/YYYY"
          error={errors.expiryDate?.message}
          label="Expiry Date"
          onValueChange={(v) => {
            setValue('expiryDate', v)
            trigger('expiryDate')
          }}
          placeholder="Expiry Date"
          popoverDirection="up"
          value={getValues('expiryDate')}
        />
      </CardBody>

      <CardFooter>
        <Button className="w-32" color="primary" type="submit">
          Next
        </Button>
      </CardFooter>
    </Card>
  )
}

export default EmployeeDetailsForm
