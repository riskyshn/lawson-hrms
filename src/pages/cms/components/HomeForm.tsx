import ImageFileUpload from '@/components/FileUploads/ImageFileUpload'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Card, CardBody, CardFooter, Input, InputWrapper, Textarea } from 'jobseeker-ui'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const PROGRESS_KEY = '[PROGRESS]'
const ERROR_PREFIX_KEY = '[ERROR]'

const schema = yup.object({
  heroSectionAsset: yup
    .string()
    .required()
    .test('is-loading', '${label} is still uploading', (value) => value !== PROGRESS_KEY)
    .test(
      'is-error',
      ({ value }) => value.replace(ERROR_PREFIX_KEY, ''),
      (value) => !value?.startsWith(ERROR_PREFIX_KEY),
    )
    .url()
    .label('Asset'),
  heroSectionHeading: yup.string().required().label('Heading'),

  sectionAAsset: yup
    .string()
    .required()
    .test('is-loading', '${label} is still uploading', (value) => value !== PROGRESS_KEY)
    .test(
      'is-error',
      ({ value }) => value.replace(ERROR_PREFIX_KEY, ''),
      (value) => !value?.startsWith(ERROR_PREFIX_KEY),
    )
    .url()
    .label('Asset'),
  sectionAHeading: yup.string().required().label('Heading'),
  sectionAParagraph: yup.string().required().label('Paragraph'),

  sectionBAsset: yup
    .string()
    .required()
    .test('is-loading', '${label} is still uploading', (value) => value !== PROGRESS_KEY)
    .test(
      'is-error',
      ({ value }) => value.replace(ERROR_PREFIX_KEY, ''),
      (value) => !value?.startsWith(ERROR_PREFIX_KEY),
    )
    .url()
    .label('Asset'),
  sectionBHeading: yup.string().required().label('Heading'),
  sectionBParagraph: yup.string().required().label('Paragraph'),

  bannerAsset: yup
    .string()
    .required()
    .test('is-loading', '${label} is still uploading', (value) => value !== PROGRESS_KEY)
    .test(
      'is-error',
      ({ value }) => value.replace(ERROR_PREFIX_KEY, ''),
      (value) => !value?.startsWith(ERROR_PREFIX_KEY),
    )
    .url()
    .label('Asset'),
  callToAction: yup.string().required().label('Call To Action'),
})

const HomeForm: React.FC<{
  defaultValue: any
  handlePrev: () => void
  handleSubmit: (data: any) => void
  isLoading?: boolean
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
    defaultValues: props.defaultValue as yup.InferType<typeof schema>,
  })

  useEffect(() => {
    Object.keys(props.defaultValue).forEach((key: any) => {
      switch (key) {
        case 'heroSectionAsset':
        case 'sectionAAsset':
        case 'sectionBAsset':
        case 'bannerAsset':
          setValue(key, props.defaultValue[key])
          trigger(key)
          break
        default:
          setValue(key, props.defaultValue[key])
          break
      }
    })
  }, [props.defaultValue, setValue, trigger])

  const onSubmit = handleSubmit(props.handleSubmit)

  return (
    <Card as="form" onSubmit={onSubmit}>
      <CardBody className="grid grid-cols-1 gap-2">
        <span className="text-lg font-semibold">Hero Section</span>
        <InputWrapper label="Asset" labelRequired error={errors?.heroSectionAsset?.message}>
          <ImageFileUpload
            type="company-logo"
            value={getValues('heroSectionAsset')}
            error={errors.heroSectionAsset?.message}
            onStart={() => {
              setValue('heroSectionAsset', PROGRESS_KEY)
            }}
            onChange={(value) => {
              setValue('heroSectionAsset', value)
              trigger('heroSectionAsset')
            }}
            onError={(message) => {
              setValue('heroSectionAsset', ERROR_PREFIX_KEY + message)
              trigger('heroSectionAsset')
            }}
          />
        </InputWrapper>

        <Input label="Heading" labelRequired error={errors.heroSectionHeading?.message} {...register('heroSectionHeading')} />

        <span className="text-lg font-semibold">Section A</span>
        <InputWrapper label="Asset" labelRequired error={errors?.sectionAAsset?.message}>
          <ImageFileUpload
            type="company-logo"
            value={getValues('sectionAAsset')}
            error={errors.sectionAAsset?.message}
            onStart={() => {
              setValue('sectionAAsset', PROGRESS_KEY)
            }}
            onChange={(value) => {
              setValue('sectionAAsset', value)
              trigger('sectionAAsset')
            }}
            onError={(message) => {
              setValue('sectionAAsset', ERROR_PREFIX_KEY + message)
              trigger('sectionAAsset')
            }}
          />
        </InputWrapper>

        <Input label="Heading" labelRequired {...register('sectionAHeading')} />

        <Textarea rows={5} label="Paragraph" labelRequired {...register('sectionAParagraph')} />

        <span className="text-lg font-semibold">Section B</span>
        <InputWrapper label="Asset" labelRequired error={errors?.sectionBAsset?.message}>
          <ImageFileUpload
            type="company-logo"
            value={getValues('sectionBAsset')}
            error={errors.sectionBAsset?.message}
            onStart={() => {
              setValue('sectionBAsset', PROGRESS_KEY)
            }}
            onChange={(value) => {
              setValue('sectionBAsset', value)
              trigger('sectionBAsset')
            }}
            onError={(message) => {
              setValue('sectionBAsset', ERROR_PREFIX_KEY + message)
              trigger('sectionBAsset')
            }}
          />
        </InputWrapper>

        <Input label="Heading" labelRequired {...register('sectionBHeading')} />

        <Textarea rows={5} label="Paragraph" labelRequired {...register('sectionBParagraph')} />

        <span className="text-lg font-semibold">Banner</span>
        <InputWrapper label="Asset" labelRequired error={errors?.bannerAsset?.message}>
          <ImageFileUpload
            type="company-logo"
            value={getValues('bannerAsset')}
            error={errors.bannerAsset?.message}
            onStart={() => {
              setValue('bannerAsset', PROGRESS_KEY)
            }}
            onChange={(value) => {
              setValue('bannerAsset', value)
              trigger('bannerAsset')
            }}
            onError={(message) => {
              setValue('bannerAsset', ERROR_PREFIX_KEY + message)
              trigger('bannerAsset')
            }}
          />
        </InputWrapper>

        <Input label="Heading" labelRequired {...register('callToAction')} />
      </CardBody>

      <CardFooter className="gap-3">
        <Button type="submit" color="primary" className="w-32" disabled={props.isLoading} loading={props.isLoading}>
          Next
        </Button>
      </CardFooter>
    </Card>
  )
}

export default HomeForm
