import { useMasterStore } from '@/store'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Card, CardBody, CardFooter, Input, InputCheckbox, InputDate, Select } from 'jobseeker-ui'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const schema = yup.object({
  educationId: yup.string().required().label('Last Education'),
  institutionId: yup.string().required().label('Institution'),
  majorId: yup.string().required().label('Major'),
  gpa: yup.string().required().label('GPA'),
  startDate: yup.date().required().label('Start Date'),
  endDate: yup
    .date()
    .when('isStillLearning', {
      is: false,
      then: (s) => s.required(),
      otherwise: (s) => s.optional(),
    })
    .label('End Date'),
  isStillLearning: yup.boolean(),
})

const EducationForm: React.FC<{
  defaultValue: any
  handlePrev: () => void
  handleSubmit: (data: any) => void
}> = (props) => {
  const { educatioLevels } = useMasterStore()

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    trigger,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { isStillLearning: true, ...props.defaultValue } as yup.InferType<typeof schema>,
  })

  const onSubmit = handleSubmit(props.handleSubmit)

  const isStillLearning = !!watch('isStillLearning')

  return (
    <div>
      <Card as="form" onSubmit={onSubmit} className="border-none">
        <CardBody className="grid grid-cols-1 gap-2">
          <div className="pb-2">
            <h3 className="text-lg font-semibold">Personal Data</h3>
            <p className="text-xs text-gray-500">Fill all employee personal basic information data</p>
          </div>

          <Select
            label="Education"
            labelRequired
            placeholder="Choose Education"
            options={educatioLevels.map((el: any) => ({ label: el.name, value: el.oid }))}
            name="educationId"
            error={errors.educationId?.message}
            value={getValues('educationId')}
            onChange={(v) => {
              setValue('educationId', v.toString())
              trigger('educationId')
            }}
          />
          <Input
            label="Institution"
            placeholder="Institution"
            labelRequired
            error={errors.institutionId?.message}
            {...register('institutionId')}
          />
          <Input label="Major" placeholder="Major" labelRequired error={errors.majorId?.message} {...register('majorId')} />
          <Input label="GPA" placeholder="ex: 3.5" labelRequired error={errors.gpa?.message} {...register('gpa')} type="number" />

          <InputDate
            label="Start Date"
            labelRequired
            popoverDirection="up"
            error={errors.startDate?.message}
            displayFormat="DD/MM/YYYY"
            value={getValues('startDate')}
            onValueChange={(v) => {
              setValue('startDate', v)
              trigger('startDate')
            }}
          />

          {!isStillLearning && (
            <InputDate
              label="End Date"
              labelRequired
              popoverDirection="up"
              error={errors.endDate?.message}
              displayFormat="DD/MM/YYYY"
              value={getValues('endDate')}
              onValueChange={(v) => {
                setValue('endDate', v)
                trigger('endDate')
              }}
            />
          )}

          <InputCheckbox id="is-still-learning" {...register('isStillLearning')}>
            I am still learning.
          </InputCheckbox>
        </CardBody>

        <CardFooter>
          <Button type="button" variant="light" color="primary" className="w-32" onClick={props.handlePrev}>
            Prev
          </Button>
          <Button type="submit" color="primary" className="w-32">
            Next
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default EducationForm
