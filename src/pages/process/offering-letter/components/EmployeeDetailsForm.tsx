import { YUP_OPTION_OBJECT } from '@/constants/globals'
import { masterService, organizationService } from '@/services'
import emmbedToOptions from '@/utils/emmbed-to-options'
import { yupResolver } from '@hookform/resolvers/yup'
import { AsyncSelect, Button, Card, CardBody, CardFooter, Input, InputDate } from 'jobseeker-ui'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const schema = yup.object({
  letterNumber: yup.string().required().label('Letter Number'),
  position: YUP_OPTION_OBJECT.required().label('Position'),
  department: YUP_OPTION_OBJECT.required().label('Depantment'),
  jobLevel: YUP_OPTION_OBJECT.required().label('Job Level'),
  jobType: YUP_OPTION_OBJECT.required().label('Job Type'),
  city: YUP_OPTION_OBJECT.required().label('City'),
  joinDate: yup.date().required().label('Join Date'),
  expiryDate: yup.date().label('Expiry Date'),
})

const EmployeeDetailsForm: React.FC<{
  defaultValue: any
  handlePrev: () => void
  handleSubmit: (data: any) => void
}> = (props) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
    trigger,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: props.defaultValue as yup.InferType<typeof schema>,
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
          label="Letter Number"
          labelRequired
          placeholder="Letter Number"
          error={errors.letterNumber?.message}
          {...register('letterNumber')}
        />
        <AsyncSelect
          label="Position"
          placeholder="Select Position"
          labelRequired
          action={organizationService.fetchPositions}
          converter={emmbedToOptions}
          name="position"
          error={errors.position?.message}
          value={getValues('position')}
          onValueChange={(v) => {
            setValue('position', v)
            trigger('position')
          }}
        />
        <AsyncSelect
          label="Deparment"
          placeholder="Select Deparment"
          labelRequired
          action={organizationService.fetchDepartments}
          converter={emmbedToOptions}
          name="department"
          error={errors.department?.message}
          value={getValues('department')}
          onValueChange={(v) => {
            setValue('department', v)
            trigger('department')
          }}
        />
        <AsyncSelect
          label="Job Level"
          placeholder="Select Job Level"
          labelRequired
          action={organizationService.fetchJobLevels}
          converter={emmbedToOptions}
          name="jobLevel"
          error={errors.jobLevel?.message}
          value={getValues('jobLevel')}
          onValueChange={(v) => {
            setValue('jobLevel', v)
            trigger('jobLevel')
          }}
        />
        <AsyncSelect
          label="Employment Type"
          placeholder="Select Employment Type"
          labelRequired
          action={organizationService.fetchJobLevels}
          converter={emmbedToOptions}
          name="jobType"
          error={errors.jobType?.message}
          value={getValues('jobType')}
          onValueChange={(v) => {
            setValue('jobType', v)
            trigger('jobType')
          }}
        />
        <AsyncSelect
          label="City"
          placeholder="Select City"
          labelRequired
          searchMinCharacter={3}
          action={masterService.fetchCities}
          converter={emmbedToOptions}
          name="cityId"
          error={errors.city?.message}
          value={getValues('city')}
          onChange={(v) => {
            setValue('city', v)
            trigger('city')
          }}
        />
        <InputDate
          label="Join Date"
          placeholder="Join Date"
          labelRequired
          error={errors.joinDate?.message}
          popoverDirection="up"
          displayFormat="DD/MM/YYYY"
          value={getValues('joinDate')}
          onValueChange={(v) => {
            setValue('joinDate', v)
            trigger('joinDate')
          }}
        />
        <InputDate
          label="Expiry Date"
          placeholder="Expiry Date"
          error={errors.expiryDate?.message}
          popoverDirection="up"
          displayFormat="DD/MM/YYYY"
          value={getValues('expiryDate')}
          onValueChange={(v) => {
            setValue('expiryDate', v)
            trigger('expiryDate')
          }}
        />
      </CardBody>

      <CardFooter>
        <Button type="submit" color="primary" className="w-32">
          Next
        </Button>
      </CardFooter>
    </Card>
  )
}

export default EmployeeDetailsForm
