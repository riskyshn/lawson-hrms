import AsyncSelect from '@/components/Elements/AsyncSelect'
import { masterService } from '@/services'
import { useMasterStore, useOrganizationStore } from '@/store'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Card, CardBody, CardFooter, Input, InputDate, Select } from 'jobseeker-ui'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const schema = yup.object({
  letterNumber: yup.string().required().label('Letter Number'),
  positionId: yup.string().required().label('Position'),
  departmentId: yup.string().required().label('Depantment'),
  jobLevelId: yup.string().required().label('Job Level'),
  jobTypeId: yup.string().required().label('Job Type'),
  cityId: yup.string().required().label('City'),
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
  const masterStore = useMasterStore()
  const organizationoStore = useOrganizationStore()
  const initialCity = masterStore.area.cities.find((el) => el.oid === getValues('cityId'))

  useEffect(() => {
    if (initialCity || !props.defaultValue?.cityId) return
    masterService.fetchCities({ limit: 1, q: props.defaultValue.cityId })
  }, [props.defaultValue?.cityId, initialCity])

  const expiryDate = getValues('expiryDate')

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
        <Select
          label="Position"
          labelRequired
          placeholder="Select Position"
          hideSearch
          options={organizationoStore.master.positions.map((el) => ({ label: `${el.name}`, value: el.oid }))}
          name="positionId"
          error={errors.positionId?.message}
          value={getValues('positionId')}
          onChange={(v) => {
            setValue('positionId', v.toString())
            trigger('positionId')
          }}
        />
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
          label="Job Level"
          labelRequired
          placeholder="Select Job Level"
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
          label="Employment Type"
          labelRequired
          placeholder="Select Employment Type"
          hideSearch
          options={organizationoStore.master.jobTypes.filter((el) => el.status === 1).map((el) => ({ label: `${el.name}`, value: el.oid }))}
          name="jobTypeId"
          error={errors.jobTypeId?.message}
          value={getValues('jobTypeId')}
          onChange={(v) => {
            setValue('jobTypeId', v.toString())
            trigger('jobTypeId')
          }}
        />
        <AsyncSelect
          label="City"
          labelRequired
          placeholder="Select City"
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
        <InputDate
          label="Join Date"
          labelRequired
          error={errors.joinDate?.message}
          asSingle
          useRange={false}
          popoverDirection="up"
          displayFormat="DD/MM/YYYY"
          value={{ startDate: getValues('joinDate'), endDate: getValues('joinDate') }}
          onChange={(v) => {
            // @ts-expect-error
            setValue('joinDate', v?.startDate || v?.endDate)
            trigger('joinDate')
          }}
        />
        <InputDate
          label="Expiry Date"
          error={errors.expiryDate?.message}
          asSingle
          useRange={false}
          popoverDirection="up"
          displayFormat="DD/MM/YYYY"
          value={expiryDate ? { startDate: expiryDate, endDate: expiryDate } : undefined}
          onChange={(v) => {
            // @ts-expect-error
            setValue('expiryDate', v?.startDate || v?.endDate || undefined)
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
