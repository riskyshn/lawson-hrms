import AsyncSelect from '@/components/Elements/AsyncSelect'
import ImageUploader from '@/components/Elements/ImageUploader'
import { PHONE_REG_EXP } from '@/constants/globals'
import { masterService } from '@/services'
import { useMasterStore } from '@/store'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Card, CardBody, CardFooter, Input, InputDate, InputWrapper, Select, Textarea } from 'jobseeker-ui'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const PROGRESS_KEY = '[PROGRESS]'
const ERROR_PREFIX_KEY = '[ERROR]'

const schema = yup.object({
  name: yup.string().required().label('Name'),
  email: yup.string().email().required().label('Email Address'),

  genderId: yup.string().required().label('Gender'),
  religionId: yup.string().required().label('Religion'),
  phoneNumber: yup.string().required().matches(PHONE_REG_EXP, '${label} is not valid').label('Phone Number'),
  cityOfBirth: yup.string().required().label('Place of Birth'),
  dateOfBirth: yup.date().max(new Date()).required().label('Date Of Birth'),

  maritalStatus: yup.string().required().label('Marital Status'),
  numberOfChildren: yup
    .number()
    .transform((value) => (isNaN(value) ? 0 : value))
    .label('Number of Children'),

  linkNationalId: yup
    .string()
    .required()
    .test('is-loading', '${label} is still uploading', (value) => value !== PROGRESS_KEY)
    .test(
      'is-error',
      ({ value }) => value.replace(ERROR_PREFIX_KEY, ''),
      (value) => !value.startsWith(ERROR_PREFIX_KEY),
    )
    .url()
    .label('National ID'),

  nationalIdNumber: yup.string().required().label('National ID Number'),
  postalCode: yup.string().label('Postal Code'),
  nationIdAddress: yup.string().label('Nation ID Address'),
  residentalAddress: yup.string().label('Residental Address'),
})

const PersonalDataForm: React.FC<{
  defaultValue: any
  handlePrev: () => void
  handleSubmit: (data: any) => void
}> = (props) => {
  const { religions, genders, maritalStatus } = useMasterStore()

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
    trigger,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: props.defaultValue as yup.InferType<typeof schema>,
  })

  const onSubmit = handleSubmit(props.handleSubmit)

  const initialCityOfBirth = watch('cityOfBirth') ? [{ label: watch('cityOfBirth'), value: watch('cityOfBirth') }] : []

  return (
    <Card as="form" onSubmit={onSubmit}>
      <CardBody className="grid grid-cols-1 gap-2">
        <div className="pb-2">
          <h3 className="text-lg font-semibold">Personal Data</h3>
          <p className="text-xs text-gray-500">Fill all employee personal basic information data</p>
        </div>

        <Input label="Name" placeholder="Employee Name" labelRequired error={errors.name?.message} {...register('name')} />

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <Select
            label="Gender"
            placeholder="Gender"
            labelRequired
            hideSearch
            options={genders.map((el) => ({ label: el.name, value: el.oid }))}
            name="genderId"
            error={errors.genderId?.message}
            value={getValues('genderId')}
            onChange={(v) => {
              setValue('genderId', v.toString())
              trigger('genderId')
            }}
          />
          <Select
            label="Religion"
            placeholder="Religion"
            labelRequired
            hideSearch
            options={religions.map((el) => ({ label: el.name, value: el.oid }))}
            name="religionId"
            error={errors.religionId?.message}
            value={getValues('religionId')}
            onChange={(v) => {
              setValue('religionId', v.toString())
              trigger('religionId')
            }}
          />
        </div>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <Input label="Email" placeholder="email@example.com" labelRequired error={errors.email?.message} {...register('email')} />
          <Input
            label="Phone Number"
            placeholder="(000) 000-0000"
            labelRequired
            error={errors.phoneNumber?.message}
            {...register('phoneNumber')}
          />
        </div>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <AsyncSelect
            label="City of Birth"
            labelRequired
            placeholder="Choose City"
            fetcher={masterService.fetchCities}
            converter={(data: any) => data.map((el: any) => ({ label: `${el.name}, ${el.province}`, value: `${el.name}, ${el.province}` }))}
            name="cityId"
            error={errors.cityOfBirth?.message}
            value={getValues('cityOfBirth')}
            initialOptions={initialCityOfBirth}
            onChange={(v) => {
              setValue('cityOfBirth', v.toString())
              trigger('cityOfBirth')
            }}
          />
          <InputDate
            label="Date of Birth"
            labelRequired
            error={errors.dateOfBirth?.message}
            asSingle
            useRange={false}
            displayFormat="DD/MM/YYYY"
            value={{ startDate: getValues('dateOfBirth'), endDate: getValues('dateOfBirth') }}
            onChange={(v) => {
              // @ts-expect-error
              setValue('dateOfBirth', v?.startDate || v?.endDate)
              trigger('dateOfBirth')
            }}
          />
        </div>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <Select
            label="Marital Status"
            labelRequired
            placeholder="Married, Single"
            hideSearch
            options={maritalStatus.map((el) => ({ label: el.name, value: el.oid }))}
            name="maritalStatus"
            error={errors.maritalStatus?.message}
            value={getValues('maritalStatus')}
            onChange={(v) => {
              setValue('maritalStatus', v.toString())
              trigger('maritalStatus')
            }}
          />
          <Select
            label="Number of Children"
            placeholder="1-9"
            hideSearch
            options={Array.from(Array(9)).map((_, i) => ({
              label: String(i + 1),
              value: i + 1,
            }))}
            name="numberOfChildren"
            error={errors.numberOfChildren?.message}
            value={getValues('numberOfChildren')}
            onChange={(v) => {
              setValue('numberOfChildren', Number(v))
              trigger('numberOfChildren')
            }}
          />
        </div>
      </CardBody>

      <CardBody className="grid grid-cols-1 gap-2">
        <div className="pb-2">
          <h3 className="text-lg font-semibold">Identity & Address</h3>
          <p className="text-xs text-gray-500">Employee identity address information</p>
        </div>

        <InputWrapper label="National ID" labelRequired error={errors.linkNationalId?.message}>
          <ImageUploader
            value={getValues('linkNationalId')}
            error={errors.linkNationalId?.message}
            onStart={() => {
              setValue('linkNationalId', PROGRESS_KEY)
            }}
            onChange={(value) => {
              setValue('linkNationalId', value)
              trigger('linkNationalId')
            }}
            onError={(message) => {
              setValue('linkNationalId', ERROR_PREFIX_KEY + message)
              trigger('linkNationalId')
            }}
          />
        </InputWrapper>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <Input label="National ID Number" labelRequired error={errors.nationalIdNumber?.message} {...register('nationalIdNumber')} />
          <Input label="Postal Code" error={errors.postalCode?.message} {...register('postalCode')} />
        </div>
        <Textarea label="Nation ID Address" rows={6} error={errors.nationIdAddress?.message} {...register('nationIdAddress')} />
        <Textarea label="Residential Address" rows={6} error={errors.residentalAddress?.message} {...register('residentalAddress')} />
      </CardBody>

      <CardFooter>
        <Button type="submit" color="primary" className="w-32">
          Next
        </Button>
      </CardFooter>
    </Card>
  )
}

export default PersonalDataForm
