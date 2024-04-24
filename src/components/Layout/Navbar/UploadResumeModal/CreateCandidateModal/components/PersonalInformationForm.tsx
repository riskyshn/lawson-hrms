import DocumentFileUpload from '@/components/Elements/FileUploads/DocumentFileUpload'
import ImageFileUpload from '@/components/Elements/FileUploads/ImageFileUpload'
import AsyncSelect from '@/components/Elements/Forms/AsyncSelect'
import { PHONE_REG_EXP } from '@/constants/globals'
import { masterService } from '@/services'
import { useMasterStore } from '@/store'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Card, CardBody, CardFooter, Input, InputDate, InputWrapper, Select } from 'jobseeker-ui'
import moment from 'moment'
import React from 'react'
import { useForm } from 'react-hook-form'
import { twJoin } from 'tailwind-merge'
import * as yup from 'yup'

const PROGRESS_KEY = '[PROGRESS]'
const ERROR_PREFIX_KEY = '[ERROR]'

const schema = yup.object({
  photoURL: yup
    .string()
    .test('is-loading', '${label} is still uploading', (value) => value !== PROGRESS_KEY)
    .test(
      'is-error',
      ({ value }) => value?.replace(ERROR_PREFIX_KEY, ''),
      (value) => {
        if (value && typeof value === 'string') return !value.startsWith(ERROR_PREFIX_KEY)
        return true
      },
    )
    .url()
    .label('Photo Profile'),
  cvURL: yup
    .string()
    .required()
    .test('is-loading', '${label} is still uploading', (value) => value !== PROGRESS_KEY)
    .test(
      'is-error',
      ({ value }) => value.replace(ERROR_PREFIX_KEY, ''),
      (value) => !value.startsWith(ERROR_PREFIX_KEY),
    )
    .url()
    .label('Resume'),
  fullName: yup.string().required().label('Full Name'),
  nik: yup.string().required().label('National ID Number'),
  email: yup.string().email().required().label('Email'),
  password: yup.string().required().label('Password'),
  phoneNumber: yup.string().required().matches(PHONE_REG_EXP, '${label} is not valid').label('Phone Number'),
  birthDate: yup.date().max(new Date()).required().label('Date Of Birth'),
  genderId: yup.string().required().label('Gender'),
  provinceId: yup.string().required().label('Province'),
  cityId: yup.string().required().label('City'),
})

const PersonalInformationForm: React.FC<{
  defaultValue: any
  handleCancel: () => void
  handleSubmit: (data: any) => void
}> = (props) => {
  const { genders, area } = useMasterStore()

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
  const provinceName = area.provinces.find((el) => el.oid == getValues('provinceId'))?.name

  return (
    <div>
      <Card as="form" onSubmit={onSubmit} className="border-none">
        <CardBody className="grid grid-cols-1 gap-2">
          <div className="pb-2">
            <h3 className="text-lg font-semibold">Personal Data</h3>
            <p className="text-xs text-gray-500">Fill all employee personal basic information data</p>
          </div>

          <InputWrapper label="Photo Profile" error={errors.photoURL?.message}>
            <ImageFileUpload
              type="candidate-photo-profile"
              value={getValues('photoURL')}
              error={errors.photoURL?.message}
              onStart={() => {
                setValue('photoURL', PROGRESS_KEY)
              }}
              onChange={(value) => {
                setValue('photoURL', value)
                trigger('photoURL')
              }}
              onError={(message) => {
                setValue('photoURL', ERROR_PREFIX_KEY + message)
                trigger('photoURL')
              }}
            />
          </InputWrapper>

          <InputWrapper label="CV/Resume" labelRequired error={errors.cvURL?.message}>
            <DocumentFileUpload
              type="applicant-result"
              value={getValues('cvURL')}
              error={errors.cvURL?.message}
              onStart={() => {
                setValue('cvURL', PROGRESS_KEY)
              }}
              onChange={(value) => {
                setValue('cvURL', value)
                trigger('cvURL')
              }}
              onError={(message) => {
                setValue('cvURL', ERROR_PREFIX_KEY + message)
                trigger('cvURL')
              }}
            />
          </InputWrapper>

          <Input label="Full Name" placeholder="Full Name" labelRequired error={errors.fullName?.message} {...register('fullName')} />
          <Input
            label="National ID Number"
            placeholder="National ID Number"
            labelRequired
            error={errors.nik?.message}
            {...register('nik')}
          />
          <Input label="Email" placeholder="email@example.com" labelRequired error={errors.email?.message} {...register('email')} />
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            labelRequired
            error={errors.password?.message}
            {...register('password')}
          />

          <AsyncSelect
            label="Province"
            labelRequired
            placeholder="Province"
            withReset
            fetcher={masterService.fetchProvinces}
            fetcherParams={{ country: 'Indonesia' }}
            searchMinCharacter={0}
            converter={(data: any) => data.map((el: any) => ({ label: el.name, value: el.oid }))}
            name="provinceId"
            error={errors.provinceId?.message}
            value={getValues('provinceId')}
            onChange={(v) => {
              setValue('provinceId', v.toString())
              trigger('provinceId')
              if (!v) {
                setValue('cityId', '')
                trigger('cityId')
              }
            }}
          />

          <AsyncSelect
            className={twJoin(!provinceName && 'opacity-65', 'mb-2')}
            label="City"
            labelRequired
            placeholder="City"
            withReset
            disabled={!provinceName}
            fetcher={masterService.fetchCities}
            fetcherParams={provinceName ? { province: provinceName } : {}}
            searchMinCharacter={0}
            converter={(data: any) => data.map((el: any) => ({ label: el.name, value: el.oid }))}
            name="cityId"
            error={errors.cityId?.message}
            value={getValues('cityId')}
            onChange={(v) => {
              setValue('cityId', v.toString())
              trigger('cityId')
            }}
          />

          <Input
            label="Phone Number"
            placeholder="(000) 000-0000"
            labelRequired
            error={errors.phoneNumber?.message}
            {...register('phoneNumber')}
          />

          <InputDate
            label="Date of Birth"
            labelRequired
            popoverDirection="up"
            error={errors.birthDate?.message}
            startFrom={moment().add(-17, 'years').toDate()}
            maxDate={moment().add(-17, 'years').toDate()}
            displayFormat="DD/MM/YYYY"
            value={getValues('birthDate')}
            onValueChange={(v) => {
              setValue('birthDate', v)
              trigger('birthDate')
            }}
          />

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
        </CardBody>

        <CardFooter>
          <Button type="button" variant="light" color="error" className="w-32" onClick={props.handleCancel}>
            Cancel
          </Button>
          <Button type="submit" color="primary" className="w-32">
            Next
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default PersonalInformationForm
