import AsyncSelect from '@/components/Elements/AsyncSelect'
import { masterService, organizationService } from '@/services'
import { useMasterStore } from '@/store'
import currencyToNumber from '@/utils/currency-to-number'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Card, CardBody, CardFooter, Input, InputCheckbox, InputCurrency, InputWrapper, Textarea } from 'jobseeker-ui'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const schema = yup.object({
  vacancyName: yup.string().required().label('Position Name'),
  departmentId: yup.string().required().label('Depantment'),
  branchId: yup.string().required().label('Branch'),
  jobLevelId: yup.string().required().label('Job Level'),
  jobTypeId: yup.string().required().label('Job Type'),
  workplacementTypeId: yup.string().optional().label('Workplacement Type'),
  cityId: yup.string().required().label('City'),
  numberOfEmployeeNeeded: yup.number().required().label('Number of Employee Needed'),
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
    .label('Miximum Salary'),
  hideRangeSalary: yup.boolean().required(),
  negotiableSalary: yup.boolean().required(),
  other: yup.string().required().label('Task, Responsibility & Others'),
})

const VacancyInformationForm: React.FC<{ defaultValue: any; handlePrev: () => void; handleSubmit: (data: any) => void }> = (props) => {
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
  const masterStore = useMasterStore()
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
          <AsyncSelect
            label="Department"
            labelRequired
            placeholder="Select Department"
            hideSearch
            fetcher={organizationService.fetchDepartments}
            converter={(data: any) => data.map((el: any) => ({ label: el.name, value: el.oid }))}
            name="departmentId"
            fetcherParams={{ size: '100' }}
            error={errors.departmentId?.message}
            value={getValues('departmentId')}
            onChange={(v) => {
              setValue('departmentId', v.toString())
              trigger('departmentId')
            }}
          />
          <AsyncSelect
            label="Branch"
            labelRequired
            placeholder="Select Branch"
            hideSearch
            fetcher={organizationService.fetchBranches}
            converter={(data: any) => data.map((el: any) => ({ label: el.name, value: el.oid }))}
            name="branchId"
            error={errors.branchId?.message}
            value={getValues('branchId')}
            onChange={(v) => {
              setValue('branchId', v.toString())
              trigger('branchId')
            }}
          />
        </div>
      </CardBody>

      <CardBody className="grid grid-cols-1 gap-2">
        <div className="pb-2">
          <h3 className="text-lg font-semibold">Job Summary</h3>
        </div>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <AsyncSelect
            label="Job Level"
            labelRequired
            placeholder="Choose Job Level"
            hideSearch
            fetcher={organizationService.fetchJobLevels}
            converter={(data: any) => data.map((el: any) => ({ label: el.name, value: el.oid }))}
            name="jobLevelId"
            error={errors.jobLevelId?.message}
            value={getValues('jobLevelId')}
            onChange={(v) => {
              setValue('jobLevelId', v.toString())
              trigger('jobLevelId')
            }}
          />
          <AsyncSelect
            label="Job Type"
            labelRequired
            placeholder="Full-time, Part-time, Internship"
            hideSearch
            fetcher={masterService.fetchJobtype}
            converter={(data: any) => data.map((el: any) => ({ label: el.name, value: el.oid }))}
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
          <AsyncSelect
            label="Work Placement Type"
            withReset
            placeholder="WFO, WFH, Hybrid"
            hideSearch
            fetcher={masterService.fetchWorkplacement}
            converter={(data: any) => data.map((el: any) => ({ label: el.name, value: el.oid }))}
            name="workplacementTypeId"
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
