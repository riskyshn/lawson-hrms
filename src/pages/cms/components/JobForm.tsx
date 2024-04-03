import ImageFileUpload from '@/components/FileUploads/ImageFileUpload'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Card, CardBody, CardFooter, Input, InputWrapper, Textarea } from 'jobseeker-ui'
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
    .label('Asset'),
  findJobHeading: yup.string().required().label('Heading'),

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
    .label('Asset'),
  registerHeading: yup.string().required().label('Heading'),
  registerSubheading: yup.string().required().label('Subheading'),

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
    .label('Asset'),
  loginHeading: yup.string().required().label('Heading'),
  loginSubheading: yup.string().required().label('Subheading'),

  backgroundColor: yup.string().required().label('Background'),
  callToActionColor: yup.string().required().label('Call to Action'),
  headingColor: yup.string().required().label('Heading'),
  subheadingColor: yup.string().required().label('Subheading'),
  paragraphColor: yup.string().required().label('Paragraph'),
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
          case 'findJobHeading':
          case 'registerAsset':
          case 'registerHeading':
          case 'registerSubheading':
          case 'loginAsset':
          case 'loginHeading':
          case 'loginSubheading':
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
            value={getValues('findJobAsset') || props.defaultValue.findJobAsset}
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

        <Input label="Heading" labelRequired {...register('findJobHeading')} />

        <span className="text-lg font-semibold">Register</span>
        <InputWrapper label="Asset" labelRequired error={errors?.registerAsset?.message}>
          <ImageFileUpload
            type="company-logo"
            value={getValues('registerAsset') || props.defaultValue.registerAsset}
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

        <Input label="Heading" labelRequired {...register('registerHeading')} />

        <Input label="Subheading" labelRequired {...register('registerSubheading')} />

        <span className="text-lg font-semibold">Login</span>
        <InputWrapper label="Asset" labelRequired error={errors?.loginAsset?.message}>
          <ImageFileUpload
            type="company-logo"
            value={getValues('loginAsset') || props.defaultValue.loginAsset}
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

        <Input label="Heading" labelRequired {...register('loginHeading')} />

        <Input label="Subheading" labelRequired {...register('loginSubheading')} />

        <Input type="color" label="Background" labelRequired {...register('backgroundColor')} />
        <Input type="color" label="Call to Action" labelRequired {...register('callToActionColor')} />
        <Input type="color" label="Heading" labelRequired {...register('headingColor')} />
        <Input type="color" label="Subheading" labelRequired {...register('subheadingColor')} />
        <Input type="color" label="Paragraph" labelRequired {...register('paragraphColor')} />
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
