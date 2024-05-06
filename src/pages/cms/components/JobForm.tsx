import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Card, CardBody, CardFooter, Input, InputWrapper } from 'jobseeker-ui'
import * as yup from 'yup'
import ImageFileUpload from '@/components/Elements/FileUploads/ImageFileUpload'

interface IFormProps {
  defaultValue?: IJobData
  handlePrev: () => void
  handleSubmit: (data: IJobData) => void
  isLoading?: boolean
}

const PROGRESS_KEY = '[PROGRESS]'
const ERROR_PREFIX_KEY = '[ERROR]'

const schema = yup.object({
  backgroundColor: yup.string().required().label('backgroundColor'),

  callToActionColor: yup.string().required().label('callToActionColor'),
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

  findJobHeadingEn: yup.string().required().label('findJobHeadingEn'),
  findJobHeadingId: yup.string().required().label('findJobHeadingId'),
  headingColor: yup.string().required().label('headingColor'),
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
  loginHeadingEn: yup.string().required().label('loginHeadingEn'),

  loginHeadingId: yup.string().required().label('loginHeadingId'),
  loginSubheadingEn: yup.string().required().label('loginSubheadingEn'),
  loginSubheadingId: yup.string().required().label('loginSubheadingId'),
  paragraphColor: yup.string().required().label('paragraphColor'),
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

  registerHeadingEn: yup.string().required().label('registerHeadingEn'),
  registerHeadingId: yup.string().required().label('registerHeadingId'),
  registerSubheadingEn: yup.string().required().label('registerSubheadingEn'),
  registerSubheadingId: yup.string().required().label('registerSubheadingId'),
  subheadingColor: yup.string().required().label('subheadingColor'),
})

const JobForm: React.FC<IFormProps> = (props) => {
  const {
    formState: { errors },
    getValues,
    handleSubmit,
    register,
    setValue,
    trigger,
  } = useForm({
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    if (props.defaultValue) {
      Object.keys(props.defaultValue).forEach((key) => {
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
            setValue(key, props.defaultValue?.[key] ?? '')
            break
          default:
            setValue(key as keyof IJobData, props.defaultValue?.[key as keyof IJobData] ?? '')
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
        <InputWrapper error={errors?.findJobAsset?.message} label="Asset" labelRequired>
          <ImageFileUpload
            error={errors.findJobAsset?.message}
            onChange={(value) => {
              setValue('findJobAsset', value)
              trigger('findJobAsset')
            }}
            onError={(message) => {
              setValue('findJobAsset', ERROR_PREFIX_KEY + message)
              trigger('findJobAsset')
            }}
            onStart={() => {
              setValue('findJobAsset', PROGRESS_KEY)
            }}
            type="company-logo"
            value={getValues('findJobAsset')}
          />
        </InputWrapper>

        <Input error={errors.findJobHeadingId?.message} label="Heading Id" labelRequired {...register('findJobHeadingId')} />
        <Input error={errors.findJobHeadingEn?.message} label="Heading En" labelRequired {...register('findJobHeadingEn')} />

        <span className="text-lg font-semibold">Register</span>
        <InputWrapper error={errors?.registerAsset?.message} label="Asset" labelRequired>
          <ImageFileUpload
            error={errors.registerAsset?.message}
            onChange={(value) => {
              setValue('registerAsset', value)
              trigger('registerAsset')
            }}
            onError={(message) => {
              setValue('registerAsset', ERROR_PREFIX_KEY + message)
              trigger('registerAsset')
            }}
            onStart={() => {
              setValue('registerAsset', PROGRESS_KEY)
            }}
            type="company-logo"
            value={getValues('registerAsset')}
          />
        </InputWrapper>

        <Input error={errors.registerHeadingId?.message} label="Heading Id" labelRequired {...register('registerHeadingId')} />
        <Input error={errors.registerHeadingEn?.message} label="Heading En" labelRequired {...register('registerHeadingEn')} />

        <Input error={errors.registerSubheadingId?.message} label="Subheading Id" labelRequired {...register('registerSubheadingId')} />
        <Input error={errors.registerSubheadingEn?.message} label="Subheading En" labelRequired {...register('registerSubheadingEn')} />

        <span className="text-lg font-semibold">Login</span>
        <InputWrapper error={errors?.loginAsset?.message} label="Asset" labelRequired>
          <ImageFileUpload
            error={errors.loginAsset?.message}
            onChange={(value) => {
              setValue('loginAsset', value)
              trigger('loginAsset')
            }}
            onError={(message) => {
              setValue('loginAsset', ERROR_PREFIX_KEY + message)
              trigger('loginAsset')
            }}
            onStart={() => {
              setValue('loginAsset', PROGRESS_KEY)
            }}
            type="company-logo"
            value={getValues('loginAsset')}
          />
        </InputWrapper>

        <Input error={errors.loginHeadingId?.message} label="Heading Id" labelRequired {...register('loginHeadingId')} />
        <Input error={errors.loginHeadingEn?.message} label="Heading En" labelRequired {...register('loginHeadingEn')} />

        <Input error={errors.loginSubheadingId?.message} label="Subheading Id" labelRequired {...register('loginSubheadingId')} />
        <Input error={errors.loginSubheadingEn?.message} label="Subheading En" labelRequired {...register('loginSubheadingEn')} />

        <Input error={errors.backgroundColor?.message} label="Background" labelRequired type="color" {...register('backgroundColor')} />
        <Input
          error={errors.callToActionColor?.message}
          label="Call to Action"
          labelRequired
          type="color"
          {...register('callToActionColor')}
        />
        <Input error={errors.headingColor?.message} label="Heading" labelRequired type="color" {...register('headingColor')} />
        <Input error={errors.subheadingColor?.message} label="Subheading" labelRequired type="color" {...register('subheadingColor')} />
        <Input error={errors.paragraphColor?.message} label="Paragraph" labelRequired type="color" {...register('paragraphColor')} />
      </CardBody>

      <CardFooter className="gap-3">
        <Button className="w-32" color="primary" disabled={props.isLoading} onClick={props.handlePrev} type="button" variant="light">
          Prev
        </Button>
        <Button className="w-32" color="primary" disabled={props.isLoading} loading={props.isLoading} type="submit">
          Submit
        </Button>
      </CardFooter>
    </Card>
  )
}

export default JobForm
