import ImageFileUpload from '@/components/FileUploads/ImageFileUpload'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Card, CardBody, CardFooter, Input, InputWrapper } from 'jobseeker-ui'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const PROGRESS_KEY = '[PROGRESS]'
const ERROR_PREFIX_KEY = '[ERROR]'

const schema = yup.object({
  findJobAsset: yup
    .string()
    .required()
    .test('is-loading', '${label} is still uploading', (value) => value !== PROGRESS_KEY)
    .test(
      'is-error',
      ({ value }) => value.replace(ERROR_PREFIX_KEY, ''),
      (value) => !value.startsWith(ERROR_PREFIX_KEY),
    )
    .url()
    .label('findJobAsset'),

  findJobHeadingId: yup.string().required().label('findJobHeadingId'),
  findJobHeadingEn: yup.string().required().label('findJobHeadingEn'),

  registerAsset: yup
    .string()
    .required()
    .test('is-loading', '${label} is still uploading', (value) => value !== PROGRESS_KEY)
    .test(
      'is-error',
      ({ value }) => value.replace(ERROR_PREFIX_KEY, ''),
      (value) => !value.startsWith(ERROR_PREFIX_KEY),
    )
    .url()
    .label('registerAsset'),
  registerHeadingId: yup.string().required().label('registerHeadingId'),
  registerHeadingEn: yup.string().required().label('registerHeadingEn'),
  registerSubheadingId: yup.string().required().label('registerSubheadingId'),
  registerSubheadingEn: yup.string().required().label('registerSubheadingEn'),

  loginAsset: yup
    .string()
    .required()
    .test('is-loading', '${label} is still uploading', (value) => value !== PROGRESS_KEY)
    .test(
      'is-error',
      ({ value }) => value.replace(ERROR_PREFIX_KEY, ''),
      (value) => !value.startsWith(ERROR_PREFIX_KEY),
    )
    .url()
    .label('loginAsset'),
  loginHeadingId: yup.string().required().label('loginHeadingId'),
  loginHeadingEn: yup.string().required().label('loginHeadingEn'),
  loginSubheadingId: yup.string().required().label('loginSubheadingId'),
  loginSubheadingEn: yup.string().required().label('loginSubheadingEn'),

  backgroundColor: yup.string().required().label('backgroundColor'),
  callToActionColor: yup.string().required().label('callToActionColor'),
  headingColor: yup.string().required().label('headingColor'),
  subheadingColor: yup.string().required().label('subheadingColor'),
  paragraphColor: yup.string().required().label('paragraphColor'),
})

const JobForm: React.FC<{
  defaultValue: any
  handlePrev: () => void
  handleSubmit: (data: any) => void
  isLoading: boolean
}> = (props) => {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    if (props.defaultValue) {
      Object.keys(props.defaultValue).forEach((key: any) => {
        switch (key) {
          case 'findJobAsset':
          case 'findJobHeadingId':
          case 'findJobHeadingEn':
          case 'registerAsset':
          case 'registerHeadingId':
          case 'registerHeadingEn':
          case 'registerSubheadingId':
          case 'registerSubheadingEn':
          case 'loginAsset':
          case 'loginHeadingId':
          case 'loginHeadingEn':
          case 'loginSubheadingId':
          case 'loginSubheadingEn':
          case 'backgroundColor':
          case 'callToActionColor':
          case 'headingColor':
          case 'subheadingColor':
          case 'paragraphColor':
            setValue(key, props.defaultValue[key])
            break
          default:
            setValue(key, props.defaultValue[key])
            break
        }
      })
    }
  }, [props.defaultValue, setValue, trigger])

  const onSubmit = handleSubmit(props.handleSubmit)

  return (
    <Card as="form" onSubmit={onSubmit}>
      <CardBody className="grid grid-cols-1 gap-2">
        <span className="text-lg font-semibold">Find Job</span>
        <InputWrapper label="Asset" labelRequired error={errors?.findJobAsset?.message}>
          <ImageFileUpload
            type="company-logo"
            value={getValues('findJobAsset')}
            error={errors.findJobAsset?.message}
            onStart={() => {
              setValue('findJobAsset', PROGRESS_KEY)
            }}
            onChange={(value) => {
              setValue('findJobAsset', value)
              trigger('findJobAsset')
            }}
            onError={(message) => {
              setValue('findJobAsset', ERROR_PREFIX_KEY + message)
              trigger('findJobAsset')
            }}
          />
        </InputWrapper>

        <Input label="Heading Id" labelRequired error={errors.findJobHeadingId?.message} {...register('findJobHeadingId')} />
        <Input label="Heading En" labelRequired error={errors.findJobHeadingEn?.message} {...register('findJobHeadingEn')} />

        <span className="text-lg font-semibold">Register</span>
        <InputWrapper label="Asset" labelRequired error={errors?.registerAsset?.message}>
          <ImageFileUpload
            type="company-logo"
            value={getValues('registerAsset')}
            error={errors.registerAsset?.message}
            onStart={() => {
              setValue('registerAsset', PROGRESS_KEY)
            }}
            onChange={(value) => {
              setValue('registerAsset', value)
              trigger('registerAsset')
            }}
            onError={(message) => {
              setValue('registerAsset', ERROR_PREFIX_KEY + message)
              trigger('registerAsset')
            }}
          />
        </InputWrapper>

        <Input label="Heading Id" labelRequired error={errors.registerHeadingId?.message} {...register('registerHeadingId')} />
        <Input label="Heading En" labelRequired error={errors.registerHeadingEn?.message} {...register('registerHeadingEn')} />

        <Input label="Subheading Id" labelRequired error={errors.registerSubheadingId?.message} {...register('registerSubheadingId')} />
        <Input label="Subheading En" labelRequired error={errors.registerSubheadingEn?.message} {...register('registerSubheadingEn')} />

        <span className="text-lg font-semibold">Login</span>
        <InputWrapper label="Asset" labelRequired error={errors?.loginAsset?.message}>
          <ImageFileUpload
            type="company-logo"
            value={getValues('loginAsset')}
            error={errors.loginAsset?.message}
            onStart={() => {
              setValue('loginAsset', PROGRESS_KEY)
            }}
            onChange={(value) => {
              setValue('loginAsset', value)
              trigger('loginAsset')
            }}
            onError={(message) => {
              setValue('loginAsset', ERROR_PREFIX_KEY + message)
              trigger('loginAsset')
            }}
          />
        </InputWrapper>

        <Input label="Heading Id" labelRequired error={errors.loginHeadingId?.message} {...register('loginHeadingId')} />
        <Input label="Heading En" labelRequired error={errors.loginHeadingEn?.message} {...register('loginHeadingEn')} />

        <Input label="Subheading Id" labelRequired error={errors.loginSubheadingId?.message} {...register('loginSubheadingId')} />
        <Input label="Subheading En" labelRequired error={errors.loginSubheadingEn?.message} {...register('loginSubheadingEn')} />

        <Input type="color" label="Background" labelRequired error={errors.backgroundColor?.message} {...register('backgroundColor')} />
        <Input
          type="color"
          label="Call to Action"
          labelRequired
          error={errors.callToActionColor?.message}
          {...register('callToActionColor')}
        />
        <Input type="color" label="Heading" labelRequired error={errors.headingColor?.message} {...register('headingColor')} />
        <Input type="color" label="Subheading" labelRequired error={errors.subheadingColor?.message} {...register('subheadingColor')} />
        <Input type="color" label="Paragraph" labelRequired error={errors.paragraphColor?.message} {...register('paragraphColor')} />
      </CardBody>

      <CardFooter className="gap-3">
        <Button type="button" color="primary" variant="light" className="w-32" disabled={props.isLoading} onClick={props.handlePrev}>
          Prev
        </Button>
        <Button type="submit" color="primary" className="w-32" disabled={props.isLoading} loading={props.isLoading}>
          Submit
        </Button>
      </CardFooter>
    </Card>
  )
}

export default JobForm
