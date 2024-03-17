import AsyncSelect from '@/components/Elements/AsyncSelect'
import { masterService } from '@/services'
import { useMasterStore, useOrganizationStore } from '@/store'
import currencyToNumber from '@/utils/currency-to-number'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Input,
  InputCheckbox,
  InputCurrency,
  InputDate,
  InputWrapper,
  Select,
  Textarea,
} from 'jobseeker-ui'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import InputApprovalProcess from './InputApprovalProcess'

const VacancyInformationForm: React.FC<{
  isRequisition?: boolean
  defaultValue: any
  handlePrev: () => void
  handleSubmit: (data: any) => void
}> = (props) => {
  const schema = yup.object({
    vacancyName: yup.string().required().label('Position Name'),
    departmentId: yup.string().required().label('Depantment'),
    branchId: yup.string().required().label('Branch'),
    expiredDate: yup.date().min(new Date()).required().label('Expired Date'),
    jobLevelId: yup.string().required().label('Job Level'),
    jobTypeId: yup.string().required().label('Job Type'),
    workplacementTypeId: yup.string().optional().label('Workplacement Type'),
    cityId: yup.string().required().label('City'),
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
    negotiableSalary: yup.boolean().required(),
    other: yup.string().required().label('Task, Responsibility & Others'),
    approvals: yup
      .array(yup.string().required())
      .min(1)
      .when('isRequisition', {
        is: true,
        then: (s) => s.required(),
        otherwise: (s) => s.optional(),
      })
      .label('Approval Process'),
    isRequisition: yup.boolean().required(),
  })

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
    trigger,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { ...props.defaultValue, isRequisition: !!props.isRequisition } as yup.InferType<typeof schema>,
  })

  const onSubmit = handleSubmit(props.handleSubmit)
  const masterStore = useMasterStore()
  const organizationoStore = useOrganizationStore()
  const initialCity = masterStore.area.cities.find((el) => el.oid === getValues('cityId'))

  useEffect(() => {
    if (initialCity || !props.defaultValue?.cityId) return
    masterService.fetchCities({ limit: 1, q: props.defaultValue.cityId })
  }, [props.defaultValue?.cityId, initialCity])

  return (
    <Card as="form" onSubmit={onSubmit}>
      <CardBody className="grid grid-cols-1 gap-2">
        <div className="pb-2">
          <h3 className="text-lg font-semibold">Vacancy Information</h3>
          <p className="text-xs text-gray-500">Please fill out this form below</p>
        </div>

        <Input label="Position Name" labelRequired error={errors.vacancyName?.message} {...register('vacancyName')} />
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <Select
            label="Department"
            labelRequired
            placeholder="Select Department"
            hideSearch
            options={organizationoStore.master.departments.map((el) => ({ label: `${el.name}`, value: el.oid }))}
            name="departmentId"
            error={errors.departmentId?.message}
            value={getValues('departmentId')}
            onChange={(v) => {
              setValue('departmentId', v.toString())
              trigger('departmentId')
            }}
          />
          <Select
            label="Branch"
            labelRequired
            placeholder="Select Branch"
            hideSearch
            options={organizationoStore.master.branches.map((el) => ({ label: `${el.name}`, value: el.oid }))}
            name="branchId"
            error={errors.branchId?.message}
            value={getValues('branchId')}
            onChange={(v) => {
              setValue('branchId', v.toString())
              trigger('branchId')
            }}
          />
        </div>
        <InputDate
          label="Expired at"
          labelRequired
          error={errors.expiredDate?.message}
          asSingle
          displayFormat="DD/MM/YYYY"
          value={{ startDate: getValues('expiredDate'), endDate: getValues('expiredDate') }}
          onChange={(v) => {
            // @ts-expect-error
            setValue('expiredDate', v?.startDate || v?.endDate)
            trigger('expiredDate')
          }}
        />
      </CardBody>

      {props.isRequisition && (
        <CardBody className="grid grid-cols-1 gap-2">
          <div className="pb-2">
            <h3 className="text-lg font-semibold">Approval Process</h3>
          </div>
          <InputApprovalProcess
            error={errors.approvals?.message || errors.approvals?.map?.((el) => el?.message)}
            value={getValues('approvals')}
            onChange={(value) => {
              setValue('approvals', value)
              trigger('approvals')
            }}
          />
        </CardBody>
      )}

      <CardBody className="grid grid-cols-1 gap-2">
        <div className="pb-2">
          <h3 className="text-lg font-semibold">Job Summary</h3>
        </div>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <Select
            label="Job Level"
            labelRequired
            placeholder="Choose Job Level"
            hideSearch
            options={organizationoStore.master.jobLevels.map((el) => ({ label: `${el.name}`, value: el.oid }))}
            name="jobLevelId"
            error={errors.jobLevelId?.message}
            value={getValues('jobLevelId')}
            onChange={(v) => {
              setValue('jobLevelId', v.toString())
              trigger('jobLevelId')
            }}
          />
          <Select
            label="Job Type"
            labelRequired
            placeholder="Full-time, Part-time, Internship"
            hideSearch
            options={organizationoStore.master.jobTypes.map((el) => ({ label: `${el.name}`, value: el.oid }))}
            name="jobTypeId"
            error={errors.jobTypeId?.message}
            value={getValues('jobTypeId')}
            onChange={(v) => {
              setValue('jobTypeId', v.toString())
              trigger('jobTypeId')
            }}
          />
        </div>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <Select
            label="Work Placement Type"
            withReset
            placeholder="WFO, WFH, Hybrid"
            hideSearch
            name="workplacementTypeId"
            options={organizationoStore.master.workplacements.map((el) => ({ label: `${el.name}`, value: el.oid }))}
            error={errors.workplacementTypeId?.message}
            value={getValues('workplacementTypeId')}
            onChange={(v) => {
              setValue('workplacementTypeId', v.toString())
              trigger('workplacementTypeId')
            }}
          />
          <AsyncSelect
            label="City"
            labelRequired
            placeholder="Choose City"
            fetcher={masterService.fetchCities}
            converter={(data: any) => data.map((el: any) => ({ label: `${el.name}, ${el.province}`, value: el.oid }))}
            name="cityId"
            error={errors.cityId?.message}
            value={getValues('cityId')}
            initialOptions={initialCity ? [{ label: `${initialCity.name}, ${initialCity.province}`, value: initialCity.oid }] : []}
            onChange={(v) => {
              setValue('cityId', v.toString())
              trigger('cityId')
            }}
          />
        </div>

        <Input
          label="Number of Employee Needed"
          labelRequired
          type="number"
          error={errors.numberOfEmployeeNeeded?.message}
          {...register('numberOfEmployeeNeeded')}
        />

        <div>
          <InputWrapper label="Range Salary" labelRequired={!getValues('negotiableSalary')} className="mb-2">
            <div className="grid grid-cols-2 gap-3">
              <InputCurrency placeholder="Minimum" prefix="Rp " error={errors.minimumSalary?.message} {...register('minimumSalary')} />
              <InputCurrency placeholder="Maximum" prefix="Rp " error={errors.maximumSalary?.message} {...register('maximumSalary')} />
            </div>
          </InputWrapper>
          <div className="flex gap-3 pb-2">
            <InputCheckbox id="negotiable-salary" {...register('negotiableSalary', {})}>
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