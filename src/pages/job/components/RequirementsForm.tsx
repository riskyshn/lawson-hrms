import { YUP_OPTION_OBJECT } from '@/constants/globals'
import { masterService } from '@/services'
import emmbedToOptions from '@/utils/emmbed-to-options'
import { yupResolver } from '@hookform/resolvers/yup'
import { AsyncSelect, Button, Card, CardBody, CardFooter, Input, InputCheckbox, InputCurrency, InputWrapper, Select } from 'jobseeker-ui'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { twJoin } from 'tailwind-merge'
import * as yup from 'yup'

const schema = yup.object({
  genderRequirement: yup
    .string()
    .when('isRequiredGenderRequirement', {
      is: true,
      then: (s) => s.required(),
      otherwise: (s) => s.optional(),
    })
    .label('Gender'),
  isRequiredGenderRequirement: yup.boolean(),
  minimumAgeRequirement: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .when('isRequiredAge', {
      is: true,
      then: (s) => s.required(),
      otherwise: (s) => s.optional(),
    })
    .label('Minimum Age'),
  maximumAgeRequirement: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .when('isRequiredAge', {
      is: true,
      then: (s) => s.required(),
      otherwise: (s) => s.optional(),
    })
    .test('is-greater', '${label} must be greater than or equal minimum age', function (value) {
      const minAge = this.parent.minimumAgeRequirement || 0
      const maxAge = value || 0
      return maxAge >= minAge
    })
    .label('Maximum Age'),
  isRequiredAge: yup.boolean(),
  minimalEducationRequirement: YUP_OPTION_OBJECT.when('isRequiredMinimalEducationRequirement', {
    is: true,
    then: (s) => s.required(),
    otherwise: (s) => s.optional(),
  }).label('Minimal Education'),
  isRequiredMinimalEducationRequirement: yup.boolean(),
  minimumExperienceRequirement: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .when('isRequiredMinimumExperienceRequirement', {
      is: true,
      then: (s) => s.required(),
      otherwise: (s) => s.optional(),
    })
    .label('Minimum Experience'),
  isRequiredMinimumExperienceRequirement: yup.boolean(),
  gpaRequirement: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .when('isRequiredGpaRequirement', {
      is: true,
      then: (s) => s.required(),
      otherwise: (s) => s.optional(),
    })
    .label('GPA'),
  isRequiredGpaRequirement: yup.boolean(),
  cityRequirement: YUP_OPTION_OBJECT.when('isRequiredCityRequirement', {
    is: true,
    then: (s) => s.required(),
    otherwise: (s) => s.optional(),
  }).label('City'),
  isRequiredCityRequirement: yup.boolean(),
  provinceRequirement: YUP_OPTION_OBJECT.when('isRequiredProvinceRequirement', {
    is: true,
    then: (s) => s.required(),
    otherwise: (s) => s.optional(),
  }).label('Province'),
  isRequiredProvinceRequirement: yup.boolean(),
  maximumSalaryRequirement: yup
    .string()
    .when('isRequiredMaximumSalaryRequirement', {
      is: true,
      then: (s) => s.required(),
      otherwise: (s) => s.optional(),
    })
    .label('Maximum Salary'),
  isRequiredMaximumSalaryRequirement: yup.boolean(),
})

const RequirementsForm: React.FC<{
  isRequisition?: boolean
  isLoading: boolean
  defaultValue: yup.InferType<typeof schema>
  isUpdate?: boolean
  handlePrev: () => void
  handleSubmit: (data: any) => void
}> = (props) => {
  const {
    handleSubmit,
    getValues,
    setValue,
    trigger,
    register,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: props.defaultValue,
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
              label="Gender"
              labelRequired={watch('isRequiredGenderRequirement')}
              placeholder="Male or Female"
              hideSearch
              options={[
                { label: 'Male', value: 'MALE' },
                { label: 'Female', value: 'FEMALE' },
              ]}
              name="genderRequirement"
              error={errors.genderRequirement?.message}
              value={getValues('genderRequirement')}
              onChange={(v) => {
                setValue('genderRequirement', v.toString())
                trigger('genderRequirement')
              }}
            />
            <InputCheckbox id="gender-required" {...register('isRequiredGenderRequirement')}>
              Candidate must meet the criteria
            </InputCheckbox>
          </div>
          <div className="pb-2">
            <AsyncSelect
              className="mb-2"
              label="Minimal Education"
              labelRequired={watch('isRequiredMinimalEducationRequirement')}
              placeholder="Choose Education"
              action={masterService.fetchEducationLevel}
              converter={emmbedToOptions}
              name="minimalEducationRequirement"
              error={errors.minimalEducationRequirement?.message}
              value={getValues('minimalEducationRequirement')}
              onValueChange={(v) => {
                setValue('minimalEducationRequirement', v)
                trigger('minimalEducationRequirement')
              }}
            />
            <InputCheckbox id="minimal-education-required" {...register('isRequiredMinimalEducationRequirement')}>
              Candidate must meet the criteria
            </InputCheckbox>
          </div>
        </div>

        <div className="pb-2">
          <InputWrapper label="Age" labelRequired={watch('isRequiredAge')} className="mb-2">
            <div className="grid grid-cols-2 gap-3">
              <Input
                className="m-0"
                placeholder="Minimum"
                error={errors.minimumAgeRequirement?.message}
                {...register('minimumAgeRequirement')}
                type="number"
              />
              <Input
                className="m-0"
                placeholder="Maximum"
                error={errors.maximumAgeRequirement?.message}
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
              label="Minimum GPA"
              labelRequired={watch('isRequiredGpaRequirement')}
              placeholder="Example : 3.25"
              error={errors.gpaRequirement?.message}
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
              label="Minimum Experience"
              labelRequired={watch('isRequiredMinimumExperienceRequirement')}
              placeholder="Example : 3 Year(s)"
              error={errors.minimumExperienceRequirement?.message}
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
              className="mb-2"
              label="Province"
              labelRequired={watch('isRequiredProvinceRequirement')}
              placeholder="Province"
              withReset
              action={masterService.fetchProvinces}
              params={{ country: 'Indonesia' }}
              converter={emmbedToOptions}
              name="provinceRequirement"
              error={errors.provinceRequirement?.message}
              value={getValues('provinceRequirement')}
              onChange={(v) => {
                setValue('provinceRequirement', v)
                trigger('provinceRequirement')
                if (!v) {
                  // @ts-expect-error
                  setValue('cityRequirement', undefined)
                  trigger('cityRequirement')
                }
              }}
            />
            <InputCheckbox id="province-required" {...register('isRequiredProvinceRequirement')}>
              Candidate must meet the criteria
            </InputCheckbox>
          </div>
          <div className="pb-2">
            <AsyncSelect
              className={twJoin(!provinceName && 'opacity-65', 'mb-2')}
              label="City"
              labelRequired={watch('isRequiredCityRequirement')}
              placeholder="City"
              withReset
              disabled={!provinceName}
              action={masterService.fetchCities}
              params={{ province: provinceName }}
              converter={emmbedToOptions}
              name="cityRequirement"
              error={errors.cityRequirement?.message}
              value={getValues('cityRequirement')}
              onChange={(v) => {
                setValue('cityRequirement', v)
                trigger('cityRequirement')
              }}
            />
            <InputCheckbox id="city-required" {...register('isRequiredCityRequirement')}>
              Candidate must meet the criteria
            </InputCheckbox>
          </div>
        </div>

        <div className="pb-2">
          <InputCurrency
            label="Maximum Salary Expectation"
            labelRequired={watch('isRequiredMaximumSalaryRequirement')}
            prefix="Rp "
            className="mb-2"
            error={errors.maximumSalaryRequirement?.message}
            name="maximumSalaryRequirement"
            value={getValues('maximumSalaryRequirement')}
            onValueChange={(v) => {
              setValue('maximumSalaryRequirement', v || '')
              trigger('maximumSalaryRequirement')
            }}
          />
          <InputCheckbox id="maximum-salary-expectation-required" {...register('isRequiredMaximumSalaryRequirement')}>
            Candidate must meet the criteria
          </InputCheckbox>
        </div>
      </CardBody>

      <CardFooter className="gap-3">
        {!props.isUpdate && (
          <Button
            type="button"
            variant="light"
            className="mr-auto w-32"
            disabled={props.isLoading}
            loading={props.isLoading && flag == 9}
            onClick={(e) => {
              e.preventDefault()
              onSubmit(9)
            }}
          >
            Save as Draft
          </Button>
        )}
        <Button type="button" color="primary" variant="light" className="w-32" onClick={props.handlePrev}>
          Prev
        </Button>
        <Button
          type="submit"
          color="primary"
          className="w-32"
          disabled={props.isLoading}
          loading={props.isLoading && flag == 1}
          onClick={(e) => {
            e.preventDefault()
            onSubmit(props.isRequisition ? 6 : 1)
          }}
        >
          {props.isUpdate ? 'Update' : 'Create'}
        </Button>
      </CardFooter>
    </Card>
  )
}

export default RequirementsForm
