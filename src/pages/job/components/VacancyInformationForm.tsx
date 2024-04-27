import { YUP_OPTION_OBJECT } from '@/constants/globals'
import { employeeService, masterService, organizationService, vacancyService } from '@/services'
import { axiosErrorMessage } from '@/utils/axios'
import currencyToNumber from '@/utils/currency-to-number'
import emmbedToOptions from '@/utils/emmbed-to-options'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  AsyncMultiSelect,
  AsyncSelect,
  Button,
  Card,
  CardBody,
  CardFooter,
  Input,
  InputCheckbox,
  InputCurrency,
  InputDate,
  InputWrapper,
  Textarea,
} from 'jobseeker-ui'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const schema = yup.object({
  vacancyName: yup.string().required().label('Position Name'),
  department: YUP_OPTION_OBJECT.required().label('Department'),
  branch: YUP_OPTION_OBJECT.required().label('Branch'),
  expiredDate: yup
    .date()
    .min(new Date())
    .when('isRequisition', {
      is: true,
      then: (s) => s.optional(),
      otherwise: (s) => s.required(),
    })
    .label('Expired Date'),
  jobLevel: YUP_OPTION_OBJECT.required().label('Job Level'),
  jobType: YUP_OPTION_OBJECT.required().label('Job Type'),
  workplacementType: YUP_OPTION_OBJECT.optional().label('Workplacement Type'),
  city: YUP_OPTION_OBJECT.required().label('City'),
  numberOfEmployeeNeeded: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .min(1)
    .required()
    .label('Number of Employee Needed'),
  minimumSalary: yup
    .string()
    .when('negotiableSalary', {
      is: false,
      then: (s) => s.required(),
      otherwise: (s) => s.optional(),
    })
    .label('Minimum Salary'),
  maximumSalary: yup
    .string()
    .when('negotiableSalary', {
      is: false,
      then: (s) => s.required(),
      otherwise: (s) => s.optional(),
    })
    .test('is-greater', '${label} must be greater than or equal minimum salary', function (value) {
      const minSalary = currencyToNumber(this.parent.minimumSalary)
      const maxSalary = currencyToNumber(value)
      return maxSalary >= minSalary
    })
    .label('Maximum Salary'),
  hideRangeSalary: yup.boolean().required(),
  negotiableSalary: yup
    .boolean()
    .transform((value) => !!value)
    .required(),
  other: yup.string().required().label('Task, Responsibility & Others'),
  approvals: yup
    .array(YUP_OPTION_OBJECT.required().label('Approval'))
    .min(1)
    .when('isRequisition', {
      is: true,
      then: (s) => s.required(),
      otherwise: (s) => s.optional(),
    })
    .label('Approval Process'),
  rrNumber: yup
    .string()
    .when('isRequisition', {
      is: true,
      then: (s) => s.required(),
      otherwise: (s) => s.optional(),
    })
    .label('RR Number'),
  isRequisition: yup.boolean().required(),
})

const VacancyInformationForm: React.FC<{
  isRequisition?: boolean
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
    watch,
    setError,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { ...props.defaultValue, isRequisition: !!props.isRequisition } as yup.InferType<typeof schema>,
  })

  const onSubmit = handleSubmit(props.handleSubmit)

  useEffect(() => {
    const loadRrNumber = async () => {
      try {
        const rrNumber = await vacancyService.fetchVacancyRRNumber()
        setValue('rrNumber', rrNumber)
      } catch (e) {
        setError('rrNumber', axiosErrorMessage(e))
      }
      trigger('rrNumber')
    }
    if (props.isRequisition && !getValues('rrNumber') && !props.defaultValue.rrNumber) loadRrNumber()
  }, [getValues, props.defaultValue.rrNumber, props.isRequisition, setError, setValue, trigger])

  return (
    <Card as="form" onSubmit={onSubmit}>
      <CardBody className="grid grid-cols-1 gap-2">
        <div className="pb-2">
          <h3 className="text-lg font-semibold">Vacancy Information</h3>
          <p className="text-xs text-gray-500">Please fill out this form below</p>
        </div>

        <Input label="Position Name" labelRequired error={errors.vacancyName?.message} {...register('vacancyName')} />

        {props.isRequisition && (
          <Input label="RR Number" labelRequired error={errors.rrNumber?.message} name="rrNumber" value={watch('rrNumber')} disabled />
        )}

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <AsyncSelect
            label="Department"
            placeholder="Department"
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
            label="Branch"
            placeholder="Branch"
            labelRequired
            action={organizationService.fetchBranches}
            converter={emmbedToOptions}
            name="branch"
            error={errors.branch?.message}
            value={getValues('branch')}
            onValueChange={(v) => {
              setValue('branch', v)
              trigger('branch')
            }}
          />
        </div>
        {!props.isRequisition && (
          <InputDate
            label="Expired at"
            labelRequired
            error={errors.expiredDate?.message}
            minDate={new Date()}
            displayFormat="DD/MM/YYYY"
            value={getValues('expiredDate')}
            onValueChange={(v) => {
              setValue('expiredDate', v)
              trigger('expiredDate')
            }}
          />
        )}
        {props.isRequisition && (
          <AsyncMultiSelect
            label="Approvals"
            labelRequired
            placeholder="Approvals"
            action={employeeService.fetchEmployees}
            converter={emmbedToOptions}
            name="approvals"
            error={errors.approvals?.message}
            value={getValues('approvals')}
            onValueChange={(v) => {
              setValue('approvals', v)
              trigger('approvals')
            }}
          />
        )}
      </CardBody>

      <CardBody className="grid grid-cols-1 gap-2">
        <div className="pb-2">
          <h3 className="text-lg font-semibold">Job Summary</h3>
        </div>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <AsyncSelect
            label="Job Level"
            placeholder="Job Level"
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
            label="Job Type"
            placeholder="Job Type"
            labelRequired
            action={organizationService.fetchJobTypes}
            converter={emmbedToOptions}
            name="jobType"
            error={errors.jobType?.message}
            value={getValues('jobType')}
            onValueChange={(v) => {
              setValue('jobType', v)
              trigger('jobType')
            }}
          />
        </div>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <AsyncSelect
            label="Work Placement Type"
            placeholder="Work Placement Type"
            labelRequired
            action={organizationService.fetchWorkplacements}
            converter={emmbedToOptions}
            name="workplacementType"
            error={errors.workplacementType?.message}
            value={getValues('workplacementType')}
            onValueChange={(v) => {
              setValue('workplacementType', v)
              trigger('workplacementType')
            }}
          />
          <AsyncSelect
            label="City"
            labelRequired
            placeholder="Choose City"
            action={masterService.fetchCities}
            converter={emmbedToOptions}
            searchMinCharacter={3}
            name="city"
            error={errors.city?.message}
            value={getValues('city')}
            onChange={(v) => {
              setValue('city', v)
              trigger('city')
            }}
          />
        </div>

        <Input
          label="Number of Employee Needed"
          labelRequired
          placeholder="5"
          type="number"
          error={errors.numberOfEmployeeNeeded?.message}
          {...register('numberOfEmployeeNeeded')}
        />

        <div>
          <InputWrapper label="Range Salary" labelRequired={!getValues('negotiableSalary')} className="mb-2">
            <div className="grid grid-cols-2 gap-3">
              <InputCurrency
                placeholder="Minimum"
                prefix="Rp "
                error={errors.minimumSalary?.message}
                name="minimumSalary"
                value={getValues('minimumSalary')}
                onValueChange={(v) => {
                  setValue('minimumSalary', v || '')
                  trigger('minimumSalary')
                }}
              />
              <InputCurrency
                placeholder="Maximum"
                prefix="Rp "
                error={errors.maximumSalary?.message}
                name="maximumSalary"
                value={getValues('maximumSalary')}
                onValueChange={(v) => {
                  setValue('maximumSalary', v || '')
                  trigger('maximumSalary')
                }}
              />
            </div>
          </InputWrapper>
          <div className="flex gap-3 pb-2">
            <InputCheckbox id="negotiable-salary" {...register('negotiableSalary')}>
              Negotiable Salary
            </InputCheckbox>
            <InputCheckbox id="hide-range-of-salary" {...register('hideRangeSalary')}>
              Hide Range of Salary
            </InputCheckbox>
          </div>
        </div>

        <Textarea
          label="Task, Responsibility & Others"
          labelRequired
          placeholder="Add description here"
          rows={6}
          error={errors.other?.message}
          {...register('other')}
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

export default VacancyInformationForm
