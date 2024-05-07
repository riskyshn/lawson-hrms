import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { AsyncSelect, Button, Card, CardBody, CardFooter, Input, InputDate, InputWrapper } from 'jobseeker-ui'
import moment from 'moment'
import { twJoin } from 'tailwind-merge'
import * as yup from 'yup'
import DocumentFileUpload from '@/components/Elements/FileUploads/DocumentFileUpload'
import PhotoProfileFileUpload from '@/components/Elements/FileUploads/PhotoProfileFIleUpload'
import { PHONE_REG_EXP, YUP_OPTION_OBJECT } from '@/constants/globals'
import { masterService } from '@/services'
import emmbedToOptions from '@/utils/emmbed-to-options'

const PROGRESS_KEY = '[PROGRESS]'
const ERROR_PREFIX_KEY = '[ERROR]'

const schema = yup.object({
  birthDate: yup.date().max(new Date()).required().label('Date Of Birth'),
  city: YUP_OPTION_OBJECT.required().label('City'),
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
  email: yup.string().email().required().label('Email'),
  fullName: yup.string().required().label('Full Name'),
  gender: YUP_OPTION_OBJECT.required().label('Gender'),
  nik: yup.string().min(16).max(16).required().label('National ID Number'),
  password: yup.string().required().label('Password'),
  phoneNumber: yup.string().required().matches(PHONE_REG_EXP, '${label} is not valid').label('Phone Number'),
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
  province: YUP_OPTION_OBJECT.required().label('Province'),
})

const PersonalInformationForm: React.FC<{
  defaultValue: any
  handleCancel: () => void
  handleSubmit: (data: any) => void
}> = (props) => {
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
  const provinceName = watch('province.label')

  return (
    <div>
      <Card as="form" className="border-none" onSubmit={onSubmit}>
        <CardBody className="grid grid-cols-1 gap-2">
          <div className="pb-2">
            <h3 className="text-lg font-semibold">Personal Data</h3>
            <p className="text-xs text-gray-500">Fill all employee personal basic information data</p>
          </div>

          <InputWrapper error={errors.photoURL?.message} label="Photo Profile">
            <PhotoProfileFileUpload
              nickname={watch('fullName')}
              onChange={(value) => {
                setValue('photoURL', value)
                trigger('photoURL')
              }}
              onError={(message) => {
                setValue('photoURL', ERROR_PREFIX_KEY + message)
                trigger('photoURL')
              }}
              onStart={() => {
                setValue('photoURL', PROGRESS_KEY)
              }}
              value={getValues('photoURL')}
            />
          </InputWrapper>

          <InputWrapper error={errors.cvURL?.message} label="CV/Resume" labelRequired>
            <DocumentFileUpload
              error={errors.cvURL?.message}
              onChange={(value) => {
                setValue('cvURL', value)
                trigger('cvURL')
              }}
              onError={(message) => {
                setValue('cvURL', ERROR_PREFIX_KEY + message)
                trigger('cvURL')
              }}
              onStart={() => {
                setValue('cvURL', PROGRESS_KEY)
              }}
              type="applicant-result"
              value={getValues('cvURL')}
            />
          </InputWrapper>

          <Input error={errors.fullName?.message} label="Full Name" labelRequired placeholder="Full Name" {...register('fullName')} />
          <Input
            error={errors.nik?.message}
            label="National ID Number"
            labelRequired
            placeholder="National ID Number"
            {...register('nik')}
            type="number"
            maxLength={16}
          />
          <Input error={errors.email?.message} label="Email" labelRequired placeholder="email@example.com" {...register('email')} />
          <Input
            error={errors.password?.message}
            label="Password"
            labelRequired
            placeholder="••••••••"
            type="password"
            {...register('password')}
          />

          <AsyncSelect
            action={masterService.fetchProvinces}
            converter={emmbedToOptions}
            error={errors.province?.message}
            label="Province"
            labelRequired
            name="provinceId"
            onChange={(v) => {
              setValue('province', v)
              trigger('province')
              if (!v) {
                // @ts-expect-error
                setValue('city', null)
                trigger('city')
              }
            }}
            params={{ country: 'Indonesia' }}
            placeholder="Province"
            value={getValues('province')}
            withReset
          />

          <AsyncSelect
            action={masterService.fetchCities}
            className={twJoin(!provinceName && 'opacity-65', 'mb-2')}
            converter={emmbedToOptions}
            disabled={!provinceName}
            error={errors.city?.message}
            label="City"
            labelRequired
            name="cityId"
            onChange={(v) => {
              setValue('city', v)
              trigger('city')
            }}
            params={provinceName ? { province: provinceName } : {}}
            placeholder="City"
            value={getValues('city')}
            withReset
          />

          <Input
            error={errors.phoneNumber?.message}
            label="Phone Number"
            labelRequired
            placeholder="(000) 000-0000"
            {...register('phoneNumber')}
          />

          <InputDate
            displayFormat="DD/MM/YYYY"
            error={errors.birthDate?.message}
            label="Date of Birth"
            labelRequired
            maxDate={moment().add(-17, 'years').toDate()}
            onValueChange={(v) => {
              setValue('birthDate', v)
              trigger('birthDate')
            }}
            popoverDirection="up"
            startFrom={moment().add(-17, 'years').toDate()}
            value={getValues('birthDate')}
          />
          <AsyncSelect
            action={masterService.fetchGenders}
            converter={emmbedToOptions}
            disableInfiniteScroll
            error={errors.gender?.message}
            hideSearch
            label="Gender"
            labelRequired
            name="gender"
            onChange={(v) => {
              setValue('gender', v)
              trigger('gender')
            }}
            placeholder="Gender"
            value={getValues('gender')}
          />
        </CardBody>

        <CardFooter>
          <Button className="w-32" color="error" onClick={props.handleCancel} type="button" variant="light">
            Cancel
          </Button>
          <Button className="w-32" color="primary" type="submit">
            Next
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default PersonalInformationForm
