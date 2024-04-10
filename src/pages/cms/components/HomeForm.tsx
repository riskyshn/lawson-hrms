import ImageFileUpload from '@/components/FileUploads/ImageFileUpload'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Card, CardBody, CardFooter, Input, InputWrapper, Textarea } from 'jobseeker-ui'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const PROGRESS_KEY = '[PROGRESS]'
const ERROR_PREFIX_KEY = '[ERROR]'

const schema = yup.object({
  heroAsset: yup
    .string()
    .required()
    .test('is-loading', '${label} is still uploading', (value) => value !== PROGRESS_KEY)
    .test(
      'is-error',
      ({ value }) => value.replace(ERROR_PREFIX_KEY, ''),
      (value) => !value?.startsWith(ERROR_PREFIX_KEY),
    )
    .url()
    .label('heroAsset'),
  heroHeadingId: yup.string().required().label('heroHeadingId'),
  heroHeadingEn: yup.string().required().label('heroHeadingEn'),

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
    .label('sectionAAsset'),
  sectionAHeadingId: yup.string().required().label('sectionAHeadingId'),
  sectionAHeadingEn: yup.string().required().label('sectionAHeadingEn'),
  sectionAParagraphId: yup.string().required().label('sectionAParagraphId'),
  sectionAParagraphEn: yup.string().required().label('sectionAParagraphEn'),

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
    .label('sectionBAsset'),
  sectionBHeadingId: yup.string().required().label('sectionBHeadingId'),
  sectionBHeadingEn: yup.string().required().label('sectionBHeadingEn'),
  sectionBParagraphId: yup.string().required().label('sectionBParagraphId'),
  sectionBParagraphEn: yup.string().required().label('sectionBParagraphEn'),

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
    .label('bannerAsset'),
  bannerCallToAction: yup.string().required().label('bannerCallToAction'),
  bannerHeadingId: yup.string().required().label('bannerHeadingId'),
  bannerHeadingEn: yup.string().required().label('bannerHeadingEn'),
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
        case 'heroAsset':
        case 'heroHeadingId':
        case 'heroHeadingEn':
        case 'sectionAAsset':
        case 'sectionAHeadingId':
        case 'sectionAHeadingEn':
        case 'sectionAParagraphId':
        case 'sectionAParagraphEn':
        case 'sectionBAsset':
        case 'sectionBHeadingId':
        case 'sectionBHeadingEn':
        case 'sectionBParagraphId':
        case 'sectionBParagraphEn':
        case 'bannerAsset':
        case 'bannerCallToAction':
        case 'bannerHeadingId':
        case 'bannerHeadingEn':
          setValue(key, props.defaultValue[key])
          break
        default:
          setValue(key, props.defaultValue[key])
          break
      }
    })
  }, [props.defaultValue, setValue])

  const onSubmit = handleSubmit(props.handleSubmit)

  return (
    <Card as="form" onSubmit={onSubmit}>
      <CardBody className="grid grid-cols-1 gap-2">
        <span className="text-lg font-semibold">Hero Section</span>
        <InputWrapper label="Asset" labelRequired error={errors?.heroAsset?.message}>
          <ImageFileUpload
            type="company-logo"
            value={getValues('heroAsset')}
            error={errors.heroAsset?.message}
            onStart={() => {
              setValue('heroAsset', PROGRESS_KEY)
            }}
            onChange={(value) => {
              setValue('heroAsset', value)
              trigger('heroAsset')
            }}
            onError={(message) => {
              setValue('heroAsset', ERROR_PREFIX_KEY + message)
              trigger('heroAsset')
            }}
          />
        </InputWrapper>

        <Input label="Heading Id" labelRequired error={errors.heroHeadingId?.message} {...register('heroHeadingId')} />

        <Input label="Heading En" labelRequired error={errors.heroHeadingEn?.message} {...register('heroHeadingEn')} />

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

        <Input label="Heading Id" labelRequired error={errors.sectionAHeadingId?.message} {...register('sectionAHeadingId')} />
        <Input label="Heading En" labelRequired error={errors.sectionAHeadingEn?.message} {...register('sectionAHeadingEn')} />

        <Textarea
          rows={5}
          label="Paragraph Id"
          labelRequired
          error={errors.sectionAParagraphId?.message}
          {...register('sectionAParagraphId')}
        />
        <Textarea
          rows={5}
          label="Paragraph En"
          labelRequired
          error={errors.sectionAParagraphEn?.message}
          {...register('sectionAParagraphEn')}
        />

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

        <Input label="Heading Id" labelRequired error={errors.sectionBHeadingId?.message} {...register('sectionBHeadingId')} />
        <Input label="Heading En" labelRequired error={errors.sectionBHeadingEn?.message} {...register('sectionBHeadingEn')} />

        <Textarea
          rows={5}
          label="Paragraph Id"
          labelRequired
          error={errors.sectionBParagraphId?.message}
          {...register('sectionBParagraphId')}
        />
        <Textarea
          rows={5}
          label="Paragraph En"
          labelRequired
          error={errors.sectionBParagraphEn?.message}
          {...register('sectionBParagraphEn')}
        />

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

        <Input label="Call to Action" labelRequired error={errors.bannerCallToAction?.message} {...register('bannerCallToAction')} />
        <Input label="Heading Id" labelRequired error={errors.bannerHeadingId?.message} {...register('bannerHeadingId')} />
        <Input label="Heading En" labelRequired error={errors.bannerHeadingEn?.message} {...register('bannerHeadingEn')} />
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
