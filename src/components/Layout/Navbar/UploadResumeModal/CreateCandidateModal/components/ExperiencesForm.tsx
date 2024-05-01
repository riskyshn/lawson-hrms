import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Card, CardBody, CardFooter, InputCheckbox, InputCurrency } from 'jobseeker-ui'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import ExperienceItem from './ExperienceItem'
import { experiencesSchema } from './shared'

const ExperiencesForm: React.FC<{
  defaultValue: any
  handlePrev: () => void
  handleSubmit: (data: any) => void
  isLoading?: boolean
}> = (props) => {
  const form = useForm({
    defaultValues: { experiences: [{}], ...props.defaultValue } as yup.InferType<typeof experiencesSchema>,
    resolver: yupResolver(experiencesSchema),
  })

  const isFreshGraduate = !!form.watch('freshGraduate')
  const watchExperiences = form.watch('experiences')

  const handleAdd = () => {
    const experiences = form.getValues('experiences') || []
    // @ts-expect-error
    form.setValue('experiences', [...experiences, {}])
  }

  const handleRemove = (index: number) => {
    const experiences = form.getValues('experiences') || []
    form.setValue('experiences', [...experiences.filter((_, i) => i !== index)])
  }

  const onSubmit = form.handleSubmit(props.handleSubmit)

  return (
    <div>
      <Card as="form" className="border-none" onSubmit={onSubmit}>
        <CardBody className="grid grid-cols-1 gap-3">
          <h3 className="text-lg font-semibold">Experiences</h3>
          {watchExperiences?.map((_, i) => (
            <ExperienceItem
              form={form}
              hideRemoveButton={watchExperiences.length <= 1 && !isFreshGraduate}
              index={i}
              key={i}
              onRemove={() => handleRemove(i)}
            />
          ))}
          {!isFreshGraduate && (
            <Button block color="primary" onClick={handleAdd} type="button" variant="light">
              Add Experience
            </Button>
          )}
        </CardBody>

        <CardBody className="grid grid-cols-1 gap-3">
          <InputCheckbox id="fresh-graduate" {...form.register('freshGraduate')}>
            I am fresh graduate.
          </InputCheckbox>

          <InputCurrency
            error={form.formState.errors.expectedSalary?.message}
            label="Expected Salary"
            labelRequired
            name="expectedSalary"
            onValueChange={(v) => {
              form.setValue('expectedSalary', v || '')
              form.trigger('expectedSalary')
            }}
            placeholder="Expected Salary"
            prefix="Rp "
            value={form.getValues('expectedSalary')}
          />
        </CardBody>

        <CardFooter>
          <Button className="w-32" color="primary" onClick={props.handlePrev} type="button" variant="light">
            Prev
          </Button>
          <Button className="w-32" color="primary" loading={props.isLoading} type="submit">
            Submit
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default ExperiencesForm
