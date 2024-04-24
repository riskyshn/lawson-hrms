import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Card, CardBody, CardFooter, InputCheckbox, InputCurrency } from 'jobseeker-ui'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import ExperienceItem from './ExperienceItem'
import { experiencesSchema } from './shared'

const ExperiencesForm: React.FC<{
  isLoading?: boolean
  defaultValue: any
  handlePrev: () => void
  handleSubmit: (data: any) => void
}> = (props) => {
  const form = useForm({
    resolver: yupResolver(experiencesSchema),
    defaultValues: { experiences: [{}], ...props.defaultValue } as yup.InferType<typeof experiencesSchema>,
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
      <Card as="form" onSubmit={onSubmit} className="border-none">
        <CardBody className="grid grid-cols-1 gap-3">
          <h3 className="text-lg font-semibold">Experiences</h3>
          {watchExperiences?.map((_, i) => (
            <ExperienceItem
              key={i}
              index={i}
              form={form}
              hideRemoveButton={watchExperiences.length <= 1 && !isFreshGraduate}
              onRemove={() => handleRemove(i)}
            />
          ))}
          {!isFreshGraduate && (
            <Button type="button" block color="primary" variant="light" onClick={handleAdd}>
              Add Experience
            </Button>
          )}
        </CardBody>

        <CardBody className="grid grid-cols-1 gap-3">
          <InputCheckbox id="fresh-graduate" {...form.register('freshGraduate')}>
            I am fresh graduate.
          </InputCheckbox>

          <InputCurrency
            label="Expected Salary"
            labelRequired
            placeholder="Expected Salary"
            prefix="Rp "
            error={form.formState.errors.expectedSalary?.message}
            name="expectedSalary"
            value={form.getValues('expectedSalary')}
            onValueChange={(v) => {
              form.setValue('expectedSalary', v || '')
              form.trigger('expectedSalary')
            }}
          />
        </CardBody>

        <CardFooter>
          <Button type="button" variant="light" color="primary" className="w-32" onClick={props.handlePrev}>
            Prev
          </Button>
          <Button type="submit" color="primary" className="w-32" loading={props.isLoading}>
            Submit
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default ExperiencesForm
