import ImageFileUpload from '@/components/Elements/FileUploads/ImageFileUpload'
import { PHONE_REG_EXP, YUP_OPTION_OBJECT } from '@/constants/globals'
import { authService, masterService } from '@/services'
import emmbedToOptions from '@/utils/emmbed-to-options'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  AsyncSelect,
  Button,
  Card,
  CardBody,
  CardFooter,
  Input,
  InputCheckbox,
  InputDate,
  InputWrapper,
  Select,
  Textarea,
} from 'jobseeker-ui'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const PROGRESS_KEY = '[PROGRESS]'
const ERROR_PREFIX_KEY = '[ERROR]'

const schema = yup.object({
  birthDate: yup.date().max(new Date()).required().label('Date Of Birth'),
  cityOfBirth: YUP_OPTION_OBJECT.required().label('Place of Birth'),

  email: yup
    .string()
    .email()
    .required()
    .test('unique', '${label} is already registered.', async (value) => {
      try {
        await authService.isEmailUnique(value)
        return true
      } catch {
        return false
      }
    })
    .label('Email Address'),
  gender: YUP_OPTION_OBJECT.required().label('Gender'),
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
  maritalStatus: YUP_OPTION_OBJECT.required().label('Marital Status'),
  name: yup.string().required().label('Name'),

  nationIdAddress: yup.string().label('Nation ID Address'),
  nationalIdNumber: yup
    .string()
    .required()
    .length(16)
    .test('unique', '${label} is already registered.', async (value) => {
      try {
        await authService.isNiklUnique(value)
        return true
      } catch {
        return false
      }
    })
    .label('National ID Number'),

  numberOfChildren: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .label('Number of Children'),

  phoneNumber: yup.string().required().matches(PHONE_REG_EXP, '${label} is not valid').label('Phone Number'),
  postalCode: yup.string().length(5).label('Postal Code'),
  religion: YUP_OPTION_OBJECT.required().label('Religion'),
  residentalAddress: yup.string().label('Residental Address'),
})

const PersonalDataForm: React.FC<{
  defaultValue: any
  handlePrev: () => void
  handleSubmit: (data: any) => void
}> = (props) => {
  const [sameAsNationalId, setSameAsNationalId] = useState(false)

  const {
    formState: { errors },
    getValues,
    handleSubmit,
    register,
    setValue,
    trigger,
    watch,
  } = useForm({
    defaultValues: props.defaultValue as yup.InferType<typeof schema>,
    resolver: yupResolver(schema),
  })

  const onSubmit = handleSubmit(props.handleSubmit)

  const nationIdAddress = watch('nationIdAddress')
  useEffect(() => {
    if (!sameAsNationalId) return
    setValue('residentalAddress', nationIdAddress)
    trigger('residentalAddress')
  }, [sameAsNationalId, nationIdAddress, setValue, trigger])

  return (
    <Card as="form" onSubmit={onSubmit}>
      <CardBody className="grid grid-cols-1 gap-2">
        <div className="pb-2">
          <h3 className="text-lg font-semibold">Personal Data</h3>
          <p className="text-xs text-gray-500">Fill all employee personal basic information data</p>
        </div>

        <Input error={errors.name?.message} label="Name" labelRequired placeholder="Employee Name" {...register('name')} />

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <AsyncSelect
            action={masterService.fetchGenders}
            converter={emmbedToOptions}
            disableInfiniteScroll
            error={errors.gender?.message}
            hideSearch
            label="Gender"
            labelRequired
            name="gender"
            onValueChange={(v) => {
              setValue('gender', v)
              trigger('gender')
            }}
            placeholder="Gender"
            value={getValues('gender')}
          />
          <AsyncSelect
            action={masterService.fetchReligions}
            converter={emmbedToOptions}
            disableInfiniteScroll
            error={errors.religion?.message}
            hideSearch
            label="Religion"
            labelRequired
            name="religion"
            onValueChange={(v) => {
              setValue('religion', v)
              trigger('religion')
            }}
            placeholder="Religion"
            value={getValues('religion')}
          />
        </div>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <Input error={errors.email?.message} label="Email" labelRequired placeholder="email@example.com" {...register('email')} />
          <Input
            error={errors.phoneNumber?.message}
            label="Phone Number"
            labelRequired
            placeholder="(000) 000-0000"
            {...register('phoneNumber')}
          />
        </div>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <AsyncSelect
            action={masterService.fetchCities}
            converter={emmbedToOptions}
            error={errors.cityOfBirth?.message}
            label="City of Birth"
            labelRequired
            name="cityOfBirth"
            onChange={(v) => {
              setValue('cityOfBirth', v)
              trigger('cityOfBirth')
            }}
            placeholder="Choose City"
            searchMinCharacter={3}
            value={getValues('cityOfBirth')}
          />
          <InputDate
            displayFormat="DD/MM/YYYY"
            error={errors.birthDate?.message}
            label="Date of Birth"
            labelRequired
            onValueChange={(v) => {
              setValue('birthDate', v)
              trigger('birthDate')
            }}
            value={getValues('birthDate')}
          />
        </div>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <AsyncSelect
            action={masterService.fetchMaritalStatus}
            converter={emmbedToOptions}
            disableInfiniteScroll
            error={errors.maritalStatus?.message}
            hideSearch
            label="Marital Status"
            labelRequired
            name="maritalStatus"
            onValueChange={(v) => {
              setValue('maritalStatus', v)
              trigger('maritalStatus')
            }}
            placeholder="Married, Single"
            value={getValues('maritalStatus')}
          />
          <Select
            error={errors.numberOfChildren?.message}
            hideSearch
            label="Number of Children"
            name="numberOfChildren"
            onChange={(v) => {
              setValue('numberOfChildren', Number(v))
              trigger('numberOfChildren')
            }}
            options={Array.from(Array(9)).map((_, i) => ({
              label: String(i + 1),
              value: String(i + 1),
            }))}
            placeholder="1-9"
            value={String(getValues('numberOfChildren') || '')}
            withReset
          />
        </div>
      </CardBody>

      <CardBody className="grid grid-cols-1 gap-2">
        <div className="pb-2">
          <h3 className="text-lg font-semibold">Identity & Address</h3>
          <p className="text-xs text-gray-500">Employee identity address information</p>
        </div>

        <InputWrapper error={errors.linkNationalId?.message} label="National ID" labelRequired>
          <ImageFileUpload
            error={errors.linkNationalId?.message}
            onChange={(value) => {
              setValue('linkNationalId', value)
              trigger('linkNationalId')
            }}
            onError={(message) => {
              setValue('linkNationalId', ERROR_PREFIX_KEY + message)
              trigger('linkNationalId')
            }}
            onStart={() => {
              setValue('linkNationalId', PROGRESS_KEY)
            }}
            type="employee-national-id"
            value={getValues('linkNationalId')}
          />
        </InputWrapper>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <Input
            error={errors.nationalIdNumber?.message}
            label="National ID Number"
            labelRequired
            {...register('nationalIdNumber')}
            type="number"
          />
          <Input error={errors.postalCode?.message} label="Postal Code" {...register('postalCode')} type="number" />
        </div>
        <Textarea error={errors.nationIdAddress?.message} label="Nation ID Address" rows={6} {...register('nationIdAddress')} />
        <Textarea
          className="mb-2"
          error={errors.residentalAddress?.message}
          label="Residential Address"
          rows={6}
          {...register('residentalAddress')}
          disabled={sameAsNationalId}
        />

        <InputCheckbox
          checked={sameAsNationalId}
          id="same-as-national-id-address"
          onChange={(e) => setSameAsNationalId(e.currentTarget.checked)}
        >
          Same as National ID Address
        </InputCheckbox>
      </CardBody>

      <CardFooter>
        <Button className="w-32" color="primary" type="submit">
          Next
        </Button>
      </CardFooter>
    </Card>
  )
}

export default PersonalDataForm
