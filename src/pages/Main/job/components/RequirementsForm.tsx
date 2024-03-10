import AsyncSelect from '@/components/Elements/AsyncSelect'
import { masterService } from '@/services'
import { useMasterStore } from '@/store'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Card, CardBody, CardFooter, Input, InputCheckbox, InputCurrency, InputWrapper, Select } from 'jobseeker-ui'
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
    .when('isRequiredAge', {
      is: true,
      then: (s) => s.required(),
      otherwise: (s) => s.optional(),
    })
    .label('Minimum Age'),
  maximumAgeRequirement: yup
    .number()
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
  minimalEducationRequirementId: yup
    .string()
    .when('isRequiredMinimalEducationRequirement', {
      is: true,
      then: (s) => s.required(),
      otherwise: (s) => s.optional(),
    })
    .label('Minimal Education'),
  isRequiredMinimalEducationRequirement: yup.boolean(),
  minimumExperienceRequirement: yup
    .number()
    .when('isRequiredMinimumExperienceRequirement', {
      is: true,
      then: (s) => s.required(),
      otherwise: (s) => s.optional(),
    })
    .label('Minimum Experience'),
  isRequiredMinimumExperienceRequirement: yup.boolean(),
  gpaRequirement: yup
    .number()
    .when('isRequiredGpaRequirement', {
      is: true,
      then: (s) => s.required(),
      otherwise: (s) => s.optional(),
    })
    .label('GPA'),
  isRequiredGpaRequirement: yup.boolean(),
  cityRequirementId: yup
    .string()
    .when('isRequiredCityRequirement', {
      is: true,
      then: (s) => s.required(),
      otherwise: (s) => s.optional(),
    })
    .label('City'),
  isRequiredCityRequirement: yup.boolean(),
  provinceRequirementId: yup
    .string()
    .when('isRequiredProvinceRequirement', {
      is: true,
      then: (s) => s.required(),
      otherwise: (s) => s.optional(),
    })
    .label('Province'),
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
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      minimumAgeRequirement: 0,
      maximumAgeRequirement: 0,
      minimumExperienceRequirement: 0,
      gpaRequirement: 0,
      ...props.defaultValue,
    },
  })

  const [flag, setFlag] = useState<number>(1)
  const masterData = useMasterStore()
  const provinceName = masterData.area.provinces.find((el) => el.oid == getValues('provinceRequirementId'))?.name

  const onSubmit = (flag: number) => {
    setFlag(flag)
    handleSubmit((data) => {
      // @ts-expect-error
      data.flag = flag
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
              labelRequired={getValues('isRequiredGenderRequirement')}
              placeholder="Male, Female Or All"
              hideSearch
              options={[
                { label: 'Male', value: 'Male' },
                { label: 'Female', value: 'Female' },
                { label: 'All', value: 'All' },
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
            <Select
              className="mb-2"
              label="Minimal Education"
              placeholder="Choose Education"
              options={masterData.educatioLevels.map((el: any) => ({ label: el.name, value: el.oid }))}
              name="minimalEducationRequirementId"
              error={errors.minimalEducationRequirementId?.message}
              value={getValues('minimalEducationRequirementId')}
              onChange={(v) => {
                setValue('minimalEducationRequirementId', v.toString())
                trigger('minimalEducationRequirementId')
              }}
            />
            <InputCheckbox id="minimal-education-required" {...register('isRequiredMinimalEducationRequirement')}>
              Candidate must meet the criteria
            </InputCheckbox>
          </div>
        </div>

        <div className="pb-2">
          <InputWrapper label="Age" className="mb-2">
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
              placeholder="Example : 3.25"
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
              placeholder="Province"
              withReset
              fetcher={masterService.fetchProvinces}
              fetcherParams={{ country: 'Indonesia' }}
              searchMinCharacter={0}
              converter={(data: any) => data.map((el: any) => ({ label: el.name, value: el.oid }))}
              name="provinceRequirementId"
              error={errors.provinceRequirementId?.message}
              value={getValues('provinceRequirementId')}
              onChange={(v) => {
                setValue('provinceRequirementId', v.toString())
                trigger('provinceRequirementId')
                if (!v) {
                  setValue('cityRequirementId', '')
                  trigger('cityRequirementId')
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
              placeholder="City"
              withReset
              disabled={!provinceName}
              fetcher={masterService.fetchCities}
              fetcherParams={provinceName ? { province: provinceName } : {}}
              searchMinCharacter={0}
              converter={(data: any) => data.map((el: any) => ({ label: el.name, value: el.oid }))}
              name="cityRequirementId"
              error={errors.cityRequirementId?.message}
              value={getValues('cityRequirementId')}
              onChange={(v) => {
                setValue('cityRequirementId', v.toString())
                trigger('cityRequirementId')
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
            prefix="Rp "
            className="mb-2"
            error={errors.maximumSalaryRequirement?.message}
            {...register('maximumSalaryRequirement')}
          />
          <InputCheckbox id="maximum-salary-expectation-required" {...register('isRequiredMaximumSalaryRequirement')}>
            Candidate must meet the criteria
          </InputCheckbox>
        </div>
      </CardBody>

      <CardFooter className="gap-3">
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
          Save as Draf
        </Button>
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
            onSubmit(1)
          }}
        >
          {props.isUpdate ? 'Save' : 'Create'}
        </Button>
      </CardFooter>
    </Card>
  )
}

export default RequirementsForm
