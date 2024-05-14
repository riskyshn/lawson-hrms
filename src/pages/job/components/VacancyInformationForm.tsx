import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
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
} from '@jshrms/ui'
import * as yup from 'yup'
import { employeeService, masterService, organizationService, vacancyService } from '@/services'
import { axiosErrorMessage } from '@/utils/axios'
import currencyToNumber from '@/utils/currency-to-number'
import emmbedToOptions from '@/utils/emmbed-to-options'
import genYupOption from '@/utils/gen-yup-option'
import yupOptionError from '@/utils/yup-option-error'

const schema = yup.object({
  approvals: yup
    .array(genYupOption('Approval').required())
    .min(1)
    .when('isRequisition', {
      is: true,
      otherwise: (s) => s.optional(),
      then: (s) => s.required(),
    })
    .label('Approval Process'),
  branch: genYupOption('Branch').required(),
  city: genYupOption('City').required(),
  department: genYupOption('Department').required(),
  expiredDate: yup
    .date()
    .min(new Date())
    .when('isRequisition', {
      is: true,
      otherwise: (s) => s.required(),
      then: (s) => s.optional(),
    })
    .label('Expired Date'),
  hideRangeSalary: yup.boolean().required(),
  isRequisition: yup.boolean().required(),
  jobLevel: genYupOption('Job Level').required(),
  jobType: genYupOption('Job Type').required(),
  maximumSalary: yup
    .string()
    .when('negotiableSalary', {
      is: false,
      otherwise: (s) => s.optional(),
      then: (s) => s.required(),
    })
    .test('is-greater', '${label} must be greater than or equal minimum salary', function (value) {
      const minSalary = currencyToNumber(this.parent.minimumSalary)
      const maxSalary = currencyToNumber(value)
      return maxSalary >= minSalary
    })
    .label('Maximum Salary'),
  minimumSalary: yup
    .string()
    .when('negotiableSalary', {
      is: false,
      otherwise: (s) => s.optional(),
      then: (s) => s.required(),
    })
    .label('Minimum Salary'),
  negotiableSalary: yup
    .boolean()
    .transform((value) => !!value)
    .required(),
  numberOfEmployeeNeeded: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .min(1)
    .required()
    .label('Number of Employee Needed'),
  other: yup.string().required().label('Task, Responsibility & Others'),
  rrNumber: yup
    .string()
    .when('isRequisition', {
      is: true,
      otherwise: (s) => s.optional(),
      then: (s) => s.required(),
    })
    .label('RR Number'),
  vacancyName: yup.string().required().label('Position Name'),
  workplacementType: genYupOption('Workplacement Type').optional(),
})

const VacancyInformationForm: React.FC<{
  defaultValue: any
  handlePrev: () => void
  handleSubmit: (data: any) => void
  isRequisition?: boolean
}> = (props) => {
  const {
    formState: { errors },
    getValues,
    handleSubmit,
    register,
    setError,
    setValue,
    trigger,
    watch,
  } = useForm({
    defaultValues: { ...props.defaultValue, isRequisition: !!props.isRequisition } as yup.InferType<typeof schema>,
    resolver: yupResolver(schema),
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

        <Input error={errors.vacancyName?.message} label="Position Name" labelRequired {...register('vacancyName')} />

        {props.isRequisition && (
          <Input
            defaultValue={watch('rrNumber')}
            disabled
            error={errors.rrNumber?.message}
            label="RR Number"
            labelRequired
            name="rrNumber"
          />
        )}

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <AsyncSelect
            action={organizationService.fetchDepartments}
            converter={emmbedToOptions}
            error={yupOptionError(errors.department)}
            label="Department"
            labelRequired
            name="department"
            onValueChange={(v) => {
              setValue('department', v)
              trigger('department')
            }}
            placeholder="Department"
            value={getValues('department')}
          />
          <AsyncSelect
            action={organizationService.fetchBranches}
            converter={emmbedToOptions}
            error={yupOptionError(errors.branch)}
            label="Branch"
            labelRequired
            name="branch"
            onValueChange={(v) => {
              setValue('branch', v)
              trigger('branch')
            }}
            placeholder="Branch"
            value={getValues('branch')}
          />
        </div>
        {!props.isRequisition && (
          <InputDate
            displayFormat="DD/MM/YYYY"
            error={errors.expiredDate?.message}
            label="Expired at"
            labelRequired
            minDate={new Date()}
            onValueChange={(v) => {
              setValue('expiredDate', v)
              trigger('expiredDate')
            }}
            value={getValues('expiredDate')}
          />
        )}
        {props.isRequisition && (
          <AsyncMultiSelect
            action={employeeService.fetchEmployees}
            converter={emmbedToOptions}
            error={errors.approvals?.message}
            label="Approvals"
            labelRequired
            name="approvals"
            onValueChange={(v) => {
              setValue('approvals', v)
              trigger('approvals')
            }}
            placeholder="Approvals"
            value={getValues('approvals')}
            withReset
          />
        )}
      </CardBody>

      <CardBody className="grid grid-cols-1 gap-2">
        <div className="pb-2">
          <h3 className="text-lg font-semibold">Job Summary</h3>
        </div>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
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
            placeholder="Job Level"
            value={getValues('jobLevel')}
          />

          <AsyncSelect
            action={organizationService.fetchJobTypes}
            converter={emmbedToOptions}
            error={yupOptionError(errors.jobType)}
            label="Job Type"
            labelRequired
            name="jobType"
            onValueChange={(v) => {
              setValue('jobType', v)
              trigger('jobType')
            }}
            placeholder="Job Type"
            value={getValues('jobType')}
          />
        </div>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <AsyncSelect
            action={organizationService.fetchWorkplacements}
            converter={emmbedToOptions}
            error={yupOptionError(errors.workplacementType)}
            label="Work Placement Type"
            labelRequired
            name="workplacementType"
            onValueChange={(v) => {
              setValue('workplacementType', v)
              trigger('workplacementType')
            }}
            placeholder="Work Placement Type"
            value={getValues('workplacementType')}
          />
          <AsyncSelect
            action={masterService.fetchCities}
            converter={emmbedToOptions}
            error={yupOptionError(errors.city)}
            label="City"
            labelRequired
            name="city"
            onChange={(v) => {
              setValue('city', v)
              trigger('city')
            }}
            placeholder="Choose City"
            searchMinCharacter={3}
            value={getValues('city')}
          />
        </div>

        <Input
          error={errors.numberOfEmployeeNeeded?.message}
          label="Number of Employee Needed"
          labelRequired
          placeholder="5"
          type="number"
          {...register('numberOfEmployeeNeeded')}
        />

        <div>
          <InputWrapper className="mb-2" label="Range Salary" labelRequired={!getValues('negotiableSalary')}>
            <div className="grid grid-cols-2 gap-3">
              <InputCurrency
                error={errors.minimumSalary?.message}
                name="minimumSalary"
                onValueChange={(v) => {
                  setValue('minimumSalary', v || '')
                  trigger('minimumSalary')
                }}
                placeholder="Minimum"
                prefix="Rp "
                value={getValues('minimumSalary')}
              />
              <InputCurrency
                error={errors.maximumSalary?.message}
                name="maximumSalary"
                onValueChange={(v) => {
                  setValue('maximumSalary', v || '')
                  trigger('maximumSalary')
                }}
                placeholder="Maximum"
                prefix="Rp "
                value={getValues('maximumSalary')}
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
          error={errors.other?.message}
          label="Task, Responsibility & Others"
          labelRequired
          placeholder="Add description here"
          rows={6}
          {...register('other')}
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

export default VacancyInformationForm
