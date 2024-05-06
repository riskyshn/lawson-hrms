import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { AsyncSelect, Button, Card, CardBody, CardFooter, Input, InputCheckbox, InputCurrency, InputWrapper, Select } from 'jobseeker-ui'
import { twJoin } from 'tailwind-merge'
import * as yup from 'yup'
import { masterService } from '@/services'
import emmbedToOptions from '@/utils/emmbed-to-options'

const generateOptionOptional = (dependKey: string, label: string) =>
  yup
    .object()
    .when(dependKey, {
      is: true,
      otherwise: (s) => s.optional().nullable().default(null),
      then: (s) =>
        s
          .shape({ label: yup.string(), value: yup.string().required().label(label) })
          .default(null)
          .required(),
    })
    .label(label) as yup.ObjectSchema<
    {
      label: string | undefined
      value: string
    },
    yup.AnyObject,
    {
      label: undefined
      value: undefined
    },
    ''
  >

const schema = yup.object({
  cityRequirement: generateOptionOptional('isRequiredCityRequirement', 'City'),
  genderRequirement: yup
    .string()
    .when('isRequiredGenderRequirement', {
      is: true,
      otherwise: (s) => s.optional(),
      then: (s) => s.required(),
    })
    .label('Gender'),
  gpaRequirement: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .when('isRequiredGpaRequirement', {
      is: true,
      otherwise: (s) => s.optional(),
      then: (s) => s.required(),
    })
    .label('GPA'),
  isRequiredAge: yup.boolean(),
  isRequiredCityRequirement: yup.boolean(),
  isRequiredGenderRequirement: yup.boolean(),
  isRequiredGpaRequirement: yup.boolean(),
  isRequiredMaximumSalaryRequirement: yup.boolean(),
  isRequiredMinimalEducationRequirement: yup.boolean(),
  isRequiredMinimumExperienceRequirement: yup.boolean(),
  isRequiredProvinceRequirement: yup.boolean(),
  maximumAgeRequirement: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .when('isRequiredAge', {
      is: true,
      otherwise: (s) => s.optional(),
      then: (s) => s.required(),
    })
    .test('is-greater', '${label} must be greater than or equal minimum age', function (value) {
      const minAge = this.parent.minimumAgeRequirement || 0
      const maxAge = value || 0
      return maxAge >= minAge
    })
    .label('Maximum Age'),
  maximumSalaryRequirement: yup
    .string()
    .when('isRequiredMaximumSalaryRequirement', {
      is: true,
      otherwise: (s) => s.optional(),
      then: (s) => s.required(),
    })
    .label('Maximum Salary'),
  minimalEducationRequirement: generateOptionOptional('isRequiredMinimalEducationRequirement', 'Minimal Education'),
  minimumAgeRequirement: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .when('isRequiredAge', {
      is: true,
      otherwise: (s) => s.optional(),
      then: (s) => s.required(),
    })
    .label('Minimum Age'),
  minimumExperienceRequirement: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .when('isRequiredMinimumExperienceRequirement', {
      is: true,
      otherwise: (s) => s.optional(),
      then: (s) => s.required(),
    })
    .label('Minimum Experience'),
  provinceRequirement: generateOptionOptional('isRequiredProvinceRequirement', 'Province'),
})

const RequirementsForm: React.FC<{
  defaultValue: yup.InferType<typeof schema>
  handlePrev: () => void
  handleSubmit: (data: any) => void
  isLoading: boolean
  isRequisition?: boolean
  isUpdate?: boolean
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
    defaultValues: props.defaultValue,
    resolver: yupResolver(schema),
  })

  const [flag, setFlag] = useState<number>(1)
  const provinceName = watch('provinceRequirement')?.label

  const onSubmit = (flag: number) => {
    setFlag(flag)
    handleSubmit((data) => {
      // @ts-expect-error
      if (!props.isUpdate) data.flag = flag
      // @ts-expect-error
      if (props.isUpdate) data.flag = props.defaultValue?.flag
      props.handleSubmit(data)
    })()
  }

  console.log(errors)

  return (
    <Card as="form">
      <CardBody className="grid grid-cols-1 gap-2">
        <div className="pb-2">
          <h3 className="text-lg font-semibold">Requirements</h3>
          <p className="text-xs text-gray-500">Please fill out this form below</p>
        </div>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <div className="pb-2">
            <Select
              className="mb-2"
              error={errors.genderRequirement?.message}
              hideSearch
              label="Gender"
              labelRequired={watch('isRequiredGenderRequirement')}
              name="genderRequirement"
              onChange={(v) => {
                setValue('genderRequirement', v.toString())
                trigger('genderRequirement')
              }}
              options={[
                { label: 'Male', value: 'MALE' },
                { label: 'Female', value: 'FEMALE' },
              ]}
              placeholder="Male or Female"
              value={getValues('genderRequirement')}
            />
            <InputCheckbox id="gender-required" {...register('isRequiredGenderRequirement')}>
              Candidate must meet the criteria
            </InputCheckbox>
          </div>
          <div className="pb-2">
            <AsyncSelect
              action={masterService.fetchEducationLevel}
              className="mb-2"
              converter={emmbedToOptions}
              error={errors.minimalEducationRequirement?.value?.message}
              label="Minimal Education"
              labelRequired={watch('isRequiredMinimalEducationRequirement')}
              name="minimalEducationRequirement"
              onValueChange={(v) => {
                setValue('minimalEducationRequirement', v)
                trigger('minimalEducationRequirement')
              }}
              placeholder="Choose Education"
              value={getValues('minimalEducationRequirement')}
            />
            <InputCheckbox id="minimal-education-required" {...register('isRequiredMinimalEducationRequirement')}>
              Candidate must meet the criteria
            </InputCheckbox>
          </div>
        </div>

        <div className="pb-2">
          <InputWrapper className="mb-2" label="Age" labelRequired={watch('isRequiredAge')}>
            <div className="grid grid-cols-2 gap-3">
              <Input
                className="m-0"
                error={errors.minimumAgeRequirement?.message}
                placeholder="Minimum"
                {...register('minimumAgeRequirement')}
                type="number"
              />
              <Input
                className="m-0"
                error={errors.maximumAgeRequirement?.message}
                placeholder="Maximum"
                {...register('maximumAgeRequirement')}
                type="number"
              />
            </div>
          </InputWrapper>
          <InputCheckbox id="age-required" {...register('isRequiredAge')}>
            Candidate must meet the criteria
          </InputCheckbox>
        </div>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <div className="pb-2">
            <Input
              className="mb-2"
              error={errors.gpaRequirement?.message}
              label="Minimum GPA"
              labelRequired={watch('isRequiredGpaRequirement')}
              placeholder="Example : 3.25"
              {...register('gpaRequirement')}
              type="number"
            />
            <InputCheckbox id="minimum-gpa-required" {...register('isRequiredGpaRequirement')}>
              Candidate must meet the criteria
            </InputCheckbox>
          </div>
          <div className="pb-2">
            <Input
              className="mb-2"
              error={errors.minimumExperienceRequirement?.message}
              label="Minimum Experience"
              labelRequired={watch('isRequiredMinimumExperienceRequirement')}
              placeholder="Example : 3 Year(s)"
              {...register('minimumExperienceRequirement')}
              type="number"
            />
            <InputCheckbox id="minimum-experience-required" {...register('isRequiredMinimumExperienceRequirement')}>
              Candidate must meet the criteria
            </InputCheckbox>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <div className="pb-2">
            <AsyncSelect
              action={masterService.fetchProvinces}
              className="mb-2"
              converter={emmbedToOptions}
              error={errors.provinceRequirement?.message}
              label="Province"
              labelRequired={watch('isRequiredProvinceRequirement')}
              name="provinceRequirement"
              onChange={(v) => {
                setValue('provinceRequirement', v)
                trigger('provinceRequirement')
                if (!v) {
                  // @ts-expect-error
                  setValue('cityRequirement', undefined)
                  trigger('cityRequirement')
                }
              }}
              params={{ country: 'Indonesia' }}
              placeholder="Province"
              value={getValues('provinceRequirement')}
              withReset
            />
            <InputCheckbox id="province-required" {...register('isRequiredProvinceRequirement')}>
              Candidate must meet the criteria
            </InputCheckbox>
          </div>
          <div className="pb-2">
            <AsyncSelect
              action={masterService.fetchCities}
              className={twJoin(!provinceName && 'opacity-65', 'mb-2')}
              converter={emmbedToOptions}
              disabled={!provinceName}
              error={errors.cityRequirement?.message}
              label="City"
              labelRequired={watch('isRequiredCityRequirement')}
              name="cityRequirement"
              onChange={(v) => {
                setValue('cityRequirement', v)
                trigger('cityRequirement')
              }}
              params={{ province: provinceName }}
              placeholder="City"
              value={getValues('cityRequirement')}
              withReset
            />
            <InputCheckbox id="city-required" {...register('isRequiredCityRequirement')}>
              Candidate must meet the criteria
            </InputCheckbox>
          </div>
        </div>

        <div className="pb-2">
          <InputCurrency
            className="mb-2"
            error={errors.maximumSalaryRequirement?.message}
            label="Maximum Salary Expectation"
            labelRequired={watch('isRequiredMaximumSalaryRequirement')}
            name="maximumSalaryRequirement"
            onValueChange={(v) => {
              setValue('maximumSalaryRequirement', v || '')
              trigger('maximumSalaryRequirement')
            }}
            prefix="Rp "
            value={getValues('maximumSalaryRequirement')}
          />
          <InputCheckbox id="maximum-salary-expectation-required" {...register('isRequiredMaximumSalaryRequirement')}>
            Candidate must meet the criteria
          </InputCheckbox>
        </div>
      </CardBody>

      <CardFooter className="gap-3">
        {!props.isUpdate && (
          <Button
            className="mr-auto w-32"
            disabled={props.isLoading}
            loading={props.isLoading && flag == 9}
            onClick={(e) => {
              e.preventDefault()
              onSubmit(9)
            }}
            type="button"
            variant="light"
          >
            Save as Draft
          </Button>
        )}
        <Button className="w-32" color="primary" onClick={props.handlePrev} type="button" variant="light">
          Prev
        </Button>
        <Button
          className="w-32"
          color="primary"
          disabled={props.isLoading}
          loading={props.isLoading && flag == 1}
          onClick={(e) => {
            e.preventDefault()
            onSubmit(props.isRequisition ? 6 : 1)
          }}
          type="submit"
        >
          {props.isUpdate ? 'Update' : 'Create'}
        </Button>
      </CardFooter>
    </Card>
  )
}

export default RequirementsForm
