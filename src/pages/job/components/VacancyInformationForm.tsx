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
  MultiSelect,
  Select,
  Textarea,
} from 'jobseeker-ui'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

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
      .array()
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

        {props.isRequisition && (
          <MultiSelect
            label="Approval Process"
            labelRequired
            placeholder="Approval Process"
            options={dummy.map((el) => ({ label: `${el.name} (${el.email})`, value: el.oid }))}
            name="approvals"
            error={errors.approvals?.message}
            value={getValues('approvals')}
            onChange={(v) => {
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

const dummy = [
  {
    oid: '65d2e8985a44ab03fb6ce39f',
    email: 'example@gmail.com',
    name: 'Jhon doe',
  },
  {
    oid: '7b3fe90a6d78c593f10a90e2',
    email: 'another@example.com',
    name: 'Jane Smith',
  },
  {
    oid: '2c1f3d7a8b9e6c4f5d9a1b2c',
    email: 'test@test.com',
    name: 'Alice Johnson',
  },
  {
    oid: '9a8b7c6d5e4f3a2b1c0d9e8f',
    email: 'someone@example.org',
    name: 'Bob Brown',
  },
  {
    oid: '1a2b3c4d5e6f7a8b9c0d1e2',
    email: 'user@example.net',
    name: 'Emily Davis',
  },
  {
    oid: '3e4f5g6h7i8j9k0l1m2n3o',
    email: 'jdoe@example.com',
    name: 'John Doe',
  },
  {
    oid: '4p5q6r7s8t9u0v1w2x3y4z',
    email: 'janesmith@example.org',
    name: 'Jane Smith',
  },
  {
    oid: '5a6b7c8d9e0f1g2h3i4j5k',
    email: 'jack@example.com',
    name: 'Jack Johnson',
  },
]
