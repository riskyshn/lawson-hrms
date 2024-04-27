import { YUP_OPTION_OBJECT } from '@/constants/globals'
import { masterService } from '@/services'
import emmbedToOptions from '@/utils/emmbed-to-options'
import { yupResolver } from '@hookform/resolvers/yup'
import { AsyncSelect, Button, Card, CardBody, CardFooter, Input, InputCheckbox, InputDate } from 'jobseeker-ui'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const schema = yup.object({
  education: YUP_OPTION_OBJECT.required().label('Last Education'),
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

          <AsyncSelect
            label="Education"
            labelRequired
            placeholder="Choose Education"
            action={masterService.fetchEducationLevel}
            converter={emmbedToOptions}
            name="education"
            error={errors.education?.message}
            value={getValues('education')}
            onValueChange={(v) => {
              setValue('education', v)
              trigger('education')
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
