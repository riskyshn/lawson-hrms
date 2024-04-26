import ImageFileUpload from '@/components/Elements/FileUploads/ImageFileUpload'
import { PHONE_REG_EXP, YUP_OPTION_OBJECT } from '@/constants/globals'
import { masterService } from '@/services'
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
  name: yup.string().required().label('Name'),
  email: yup.string().email().required().label('Email Address'),

  gender: YUP_OPTION_OBJECT.required().label('Gender'),
  religion: YUP_OPTION_OBJECT.required().label('Religion'),
  phoneNumber: yup.string().required().matches(PHONE_REG_EXP, '${label} is not valid').label('Phone Number'),
  cityOfBirth: YUP_OPTION_OBJECT.required().label('Place of Birth'),
  birthDate: yup.date().max(new Date()).required().label('Date Of Birth'),

  maritalStatus: YUP_OPTION_OBJECT.required().label('Marital Status'),
  numberOfChildren: yup
    .string()
    .transform((value) => (isNaN(Number(value)) ? undefined : Number(value)))
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

  nationalIdNumber: yup.string().required().length(16).label('National ID Number'),
  postalCode: yup.string().length(5).label('Postal Code'),
  nationIdAddress: yup.string().label('Nation ID Address'),
  residentalAddress: yup.string().label('Residental Address'),
})

const PersonalDataForm: React.FC<{
  defaultValue: any
  handlePrev: () => void
  handleSubmit: (data: any) => void
}> = (props) => {
  const [sameAsNationalId, setSameAsNationalId] = useState(false)

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

        <Input label="Name" placeholder="Employee Name" labelRequired error={errors.name?.message} {...register('name')} />

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <AsyncSelect
            label="Gender"
            placeholder="Gender"
            labelRequired
            hideSearch
            disableInfiniteScroll
            action={masterService.fetchGenders}
            converter={emmbedToOptions}
            name="gender"
            error={errors.gender?.message}
            value={getValues('gender')}
            onValueChange={(v) => {
              setValue('gender', v)
              trigger('gender')
            }}
          />
          <AsyncSelect
            label="Religion"
            placeholder="Religion"
            labelRequired
            hideSearch
            disableInfiniteScroll
            action={masterService.fetchReligions}
            converter={emmbedToOptions}
            name="religion"
            error={errors.religion?.message}
            value={getValues('religion')}
            onValueChange={(v) => {
              setValue('religion', v)
              trigger('religion')
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
            action={masterService.fetchCities}
            converter={emmbedToOptions}
            searchMinCharacter={3}
            name="cityOfBirth"
            error={errors.cityOfBirth?.message}
            value={getValues('cityOfBirth')}
            onChange={(v) => {
              setValue('cityOfBirth', v)
              trigger('cityOfBirth')
            }}
          />
          <InputDate
            label="Date of Birth"
            labelRequired
            error={errors.birthDate?.message}
            displayFormat="DD/MM/YYYY"
            value={getValues('birthDate')}
            onValueChange={(v) => {
              setValue('birthDate', v)
              trigger('birthDate')
            }}
          />
        </div>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <AsyncSelect
            label="Marital Status"
            labelRequired
            placeholder="Married, Single"
            hideSearch
            disableInfiniteScroll
            action={masterService.fetchMaritalStatus}
            converter={emmbedToOptions}
            name="maritalStatus"
            error={errors.maritalStatus?.message}
            value={getValues('maritalStatus')}
            onValueChange={(v) => {
              setValue('maritalStatus', v)
              trigger('maritalStatus')
            }}
          />
          <Select
            label="Number of Children"
            placeholder="1-9"
            hideSearch
            options={Array.from(Array(9)).map((_, i) => ({
              label: String(i + 1),
              value: String(i + 1),
            }))}
            name="numberOfChildren"
            error={errors.numberOfChildren?.message}
            value={getValues('numberOfChildren')}
            onChange={(v) => {
              setValue('numberOfChildren', v)
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
          <ImageFileUpload
            type="employee-national-id"
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
          <Input
            label="National ID Number"
            labelRequired
            error={errors.nationalIdNumber?.message}
            {...register('nationalIdNumber')}
            type="number"
          />
          <Input label="Postal Code" error={errors.postalCode?.message} {...register('postalCode')} type="number" />
        </div>
        <Textarea label="Nation ID Address" rows={6} error={errors.nationIdAddress?.message} {...register('nationIdAddress')} />
        <Textarea
          label="Residential Address"
          className="mb-2"
          rows={6}
          error={errors.residentalAddress?.message}
          {...register('residentalAddress')}
          disabled={sameAsNationalId}
        />

        <InputCheckbox
          id="same-as-national-id-address"
          checked={sameAsNationalId}
          onChange={(e) => setSameAsNationalId(e.currentTarget.checked)}
        >
          Same as National ID Address
        </InputCheckbox>
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
