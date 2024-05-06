import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Card, CardBody, CardFooter, Input, InputWrapper, Textarea } from 'jobseeker-ui'
import * as yup from 'yup'
import ImageFileUpload from '@/components/Elements/FileUploads/ImageFileUpload'

interface IFormProps {
  defaultValue?: IHomeData
  handlePrev: () => void
  handleSubmit: (data: IHomeData) => void
  isLoading?: boolean
}

const PROGRESS_KEY = '[PROGRESS]'
const ERROR_PREFIX_KEY = '[ERROR]'

const schema = yup.object({
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
  bannerHeadingEn: yup.string().required().label('bannerHeadingEn'),

  bannerHeadingId: yup.string().required().label('bannerHeadingId'),
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
  heroHeadingEn: yup.string().required().label('heroHeadingEn'),
  heroHeadingId: yup.string().required().label('heroHeadingId'),
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

  sectionAHeadingEn: yup.string().required().label('sectionAHeadingEn'),
  sectionAHeadingId: yup.string().required().label('sectionAHeadingId'),
  sectionAParagraphEn: yup.string().required().label('sectionAParagraphEn'),
  sectionAParagraphId: yup.string().required().label('sectionAParagraphId'),
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

  sectionBHeadingEn: yup.string().required().label('sectionBHeadingEn'),
  sectionBHeadingId: yup.string().required().label('sectionBHeadingId'),
  sectionBParagraphEn: yup.string().required().label('sectionBParagraphEn'),
  sectionBParagraphId: yup.string().required().label('sectionBParagraphId'),
})

const HomeForm: React.FC<IFormProps> = (props) => {
  const {
    formState: { errors },
    getValues,
    handleSubmit,
    register,
    setValue,
    trigger,
  } = useForm({
    defaultValues: props.defaultValue as yup.InferType<typeof schema>,
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    if (props.defaultValue) {
      Object.keys(props.defaultValue).forEach((key) => {
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
            setValue(key, props.defaultValue?.[key] ?? '')
            break
          default:
            setValue(key as keyof IHomeData, props.defaultValue?.[key as keyof IHomeData] ?? '')
            break
        }
      })
    }
  }, [props.defaultValue, setValue])

  const onSubmit = handleSubmit(props.handleSubmit)

  return (
    <Card as="form" onSubmit={onSubmit}>
      <CardBody className="grid grid-cols-1 gap-2">
        <span className="text-lg font-semibold">Hero Section</span>
        <InputWrapper error={errors?.heroAsset?.message} label="Asset" labelRequired>
          <ImageFileUpload
            error={errors.heroAsset?.message}
            onChange={(value) => {
              setValue('heroAsset', value)
              trigger('heroAsset')
            }}
            onError={(message) => {
              setValue('heroAsset', ERROR_PREFIX_KEY + message)
              trigger('heroAsset')
            }}
            onStart={() => {
              setValue('heroAsset', PROGRESS_KEY)
            }}
            type="company-logo"
            value={getValues('heroAsset')}
          />
        </InputWrapper>

        <Input error={errors.heroHeadingId?.message} label="Heading Id" labelRequired {...register('heroHeadingId')} />

        <Input error={errors.heroHeadingEn?.message} label="Heading En" labelRequired {...register('heroHeadingEn')} />

        <span className="text-lg font-semibold">Section A</span>
        <InputWrapper error={errors?.sectionAAsset?.message} label="Asset" labelRequired>
          <ImageFileUpload
            error={errors.sectionAAsset?.message}
            onChange={(value) => {
              setValue('sectionAAsset', value)
              trigger('sectionAAsset')
            }}
            onError={(message) => {
              setValue('sectionAAsset', ERROR_PREFIX_KEY + message)
              trigger('sectionAAsset')
            }}
            onStart={() => {
              setValue('sectionAAsset', PROGRESS_KEY)
            }}
            type="company-logo"
            value={getValues('sectionAAsset')}
          />
        </InputWrapper>

        <Input error={errors.sectionAHeadingId?.message} label="Heading Id" labelRequired {...register('sectionAHeadingId')} />
        <Input error={errors.sectionAHeadingEn?.message} label="Heading En" labelRequired {...register('sectionAHeadingEn')} />

        <Textarea
          error={errors.sectionAParagraphId?.message}
          label="Paragraph Id"
          labelRequired
          rows={5}
          {...register('sectionAParagraphId')}
        />
        <Textarea
          error={errors.sectionAParagraphEn?.message}
          label="Paragraph En"
          labelRequired
          rows={5}
          {...register('sectionAParagraphEn')}
        />

        <span className="text-lg font-semibold">Section B</span>
        <InputWrapper error={errors?.sectionBAsset?.message} label="Asset" labelRequired>
          <ImageFileUpload
            error={errors.sectionBAsset?.message}
            onChange={(value) => {
              setValue('sectionBAsset', value)
              trigger('sectionBAsset')
            }}
            onError={(message) => {
              setValue('sectionBAsset', ERROR_PREFIX_KEY + message)
              trigger('sectionBAsset')
            }}
            onStart={() => {
              setValue('sectionBAsset', PROGRESS_KEY)
            }}
            type="company-logo"
            value={getValues('sectionBAsset')}
          />
        </InputWrapper>

        <Input error={errors.sectionBHeadingId?.message} label="Heading Id" labelRequired {...register('sectionBHeadingId')} />
        <Input error={errors.sectionBHeadingEn?.message} label="Heading En" labelRequired {...register('sectionBHeadingEn')} />

        <Textarea
          error={errors.sectionBParagraphId?.message}
          label="Paragraph Id"
          labelRequired
          rows={5}
          {...register('sectionBParagraphId')}
        />
        <Textarea
          error={errors.sectionBParagraphEn?.message}
          label="Paragraph En"
          labelRequired
          rows={5}
          {...register('sectionBParagraphEn')}
        />

        <span className="text-lg font-semibold">Banner</span>
        <InputWrapper error={errors?.bannerAsset?.message} label="Asset" labelRequired>
          <ImageFileUpload
            error={errors.bannerAsset?.message}
            onChange={(value) => {
              setValue('bannerAsset', value)
              trigger('bannerAsset')
            }}
            onError={(message) => {
              setValue('bannerAsset', ERROR_PREFIX_KEY + message)
              trigger('bannerAsset')
            }}
            onStart={() => {
              setValue('bannerAsset', PROGRESS_KEY)
            }}
            type="company-logo"
            value={getValues('bannerAsset')}
          />
        </InputWrapper>

        <Input error={errors.bannerCallToAction?.message} label="Call to Action" labelRequired {...register('bannerCallToAction')} />
        <Input error={errors.bannerHeadingId?.message} label="Heading Id" labelRequired {...register('bannerHeadingId')} />
        <Input error={errors.bannerHeadingEn?.message} label="Heading En" labelRequired {...register('bannerHeadingEn')} />
      </CardBody>

      <CardFooter className="gap-3">
        <Button className="w-32" color="primary" disabled={props.isLoading} loading={props.isLoading} type="submit">
          Next
        </Button>
      </CardFooter>
    </Card>
  )
}

export default HomeForm
