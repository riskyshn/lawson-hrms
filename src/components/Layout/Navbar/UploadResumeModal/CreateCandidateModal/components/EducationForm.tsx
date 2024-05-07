import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { AsyncSelect, Button, Card, CardBody, CardFooter, Input, InputCheckbox, InputDate } from 'jobseeker-ui'
import * as yup from 'yup'
import { YUP_OPTION_OBJECT } from '@/constants/globals'
import { masterService } from '@/services'
import emmbedToOptions from '@/utils/emmbed-to-options'

const schema = yup.object({
  education: YUP_OPTION_OBJECT.required().label('Last Education'),
  endDate: yup
    .date()
    .when('isStillLearning', {
      is: false,
      otherwise: (s) => s.optional(),
      then: (s) => s.required(),
    })
    .label('End Date'),
  gpa: yup.string().required().label('GPA'),
  institutionId: yup.string().required().label('Institution'),
  isStillLearning: yup.boolean(),
  majorId: yup.string().required().label('Major'),
  startDate: yup.date().required().label('Start Date'),
})

const EducationForm: React.FC<{
  defaultValue: any
  handlePrev: () => void
  handleSubmit: (data: any) => void
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
    defaultValues: { isStillLearning: true, ...props.defaultValue } as yup.InferType<typeof schema>,
    resolver: yupResolver(schema),
  })

  const onSubmit = handleSubmit(props.handleSubmit)

  const isStillLearning = !!watch('isStillLearning')

  return (
    <div>
      <Card as="form" className="border-none" onSubmit={onSubmit}>
        <CardBody className="grid grid-cols-1 gap-2">
          <div className="pb-2">
            <h3 className="text-lg font-semibold">Personal Data</h3>
            <p className="text-xs text-gray-500">Fill all employee personal basic information data</p>
          </div>

          <AsyncSelect
            action={masterService.fetchEducationLevel}
            converter={emmbedToOptions}
            error={errors.education?.message}
            label="Education"
            labelRequired
            name="education"
            onValueChange={(v) => {
              setValue('education', v)
              trigger('education')
            }}
            placeholder="Choose Education"
            value={getValues('education')}
          />
          <Input
            error={errors.institutionId?.message}
            label="Institution"
            labelRequired
            placeholder="Institution"
            {...register('institutionId')}
          />
          <Input error={errors.majorId?.message} label="Major" labelRequired placeholder="Major" {...register('majorId')} />
          <Input
            error={errors.gpa?.message}
            label="GPA"
            labelRequired
            placeholder="ex: 3.5"
            {...register('gpa')}
            pattern="(\d+(?:[\.,]\d{1,2})?)"
          />

          <InputDate
            displayFormat="DD/MM/YYYY"
            error={errors.startDate?.message}
            label="Start Date"
            labelRequired
            onValueChange={(v) => {
              setValue('startDate', v)
              trigger('startDate')
            }}
            popoverDirection="up"
            value={getValues('startDate')}
          />

          {!isStillLearning && (
            <InputDate
              displayFormat="DD/MM/YYYY"
              error={errors.endDate?.message}
              label="End Date"
              labelRequired
              onValueChange={(v) => {
                setValue('endDate', v)
                trigger('endDate')
              }}
              popoverDirection="up"
              value={getValues('endDate')}
            />
          )}

          <InputCheckbox id="is-still-learning" {...register('isStillLearning')}>
            I am still learning.
          </InputCheckbox>
        </CardBody>

        <CardFooter>
          <Button className="w-32" color="primary" onClick={props.handlePrev} type="button" variant="light">
            Prev
          </Button>
          <Button className="w-32" color="primary" type="submit">
            Next
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default EducationForm
