import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Card, CardBody, CardFooter, Input, InputCurrency } from 'jobseeker-ui'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const schema = yup.object({
  baseSalary: yup.string().required().label('Base Salary'),
  benefits: yup
    .array()
    .of(
      yup.object().shape({
        name: yup.string().required().label('Name'),
        amount: yup.string().required().label('Amount'),
      }),
    )
    .min(1)
    .required()
    .label('Benefit/Allowance'),
})

const RenumerationForm: React.FC<{
  isRevise?: boolean
  isLoading: boolean
  defaultValue: yup.InferType<typeof schema>
  handlePrev: () => void
  handleSubmit: (data: any) => void
}> = (props) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
    trigger,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  })
  const onSubmit = handleSubmit(props.handleSubmit)

  useEffect(() => {
    if (!props.defaultValue) return
    setValue('baseSalary', props.defaultValue.baseSalary || '')
    setValue('benefits', props.defaultValue.benefits || [{ name: '', amount: '' }])
  }, [props.defaultValue, setValue])

  const watchBenefits = watch('benefits')

  const handleAddBenefit = () => {
    const benefits = getValues('benefits') || []
    setValue('benefits', [...benefits, { amount: '', name: '' }])
  }

  const handleRemoveBenefit = (index: number) => {
    const benefits = getValues('benefits') || []
    setValue('benefits', [...benefits.filter((_, i) => i !== index)])
  }

  return (
    <Card as="form" onSubmit={onSubmit}>
      <CardBody className="grid grid-cols-1 gap-2">
        <div className="pb-2">
          <h3 className="text-lg font-semibold">Remuneration</h3>
          <p className="text-xs text-gray-500">Please fill out this form below</p>
        </div>
        <InputCurrency
          label="Base Salary"
          prefix="Rp "
          error={errors.baseSalary?.message}
          name="baseSalary"
          value={getValues('baseSalary')}
          onValueChange={(v) => {
            setValue('baseSalary', v || '')
            trigger('baseSalary')
          }}
        />
      </CardBody>
      <CardBody className="grid grid-cols-1 gap-2">
        <div className="pb-2">
          <h3 className="text-lg font-semibold">Benefit/Allowance</h3>
          <p className="text-xs text-gray-500">Please fill out this form below</p>
        </div>

        {watchBenefits?.map((el, i) => (
          <div key={i} className="flex flex-col gap-1">
            <div className="grid flex-1 grid-cols-2 gap-1">
              <Input
                label="Name"
                labelRequired
                placeholder="Name"
                error={errors.benefits?.[i]?.name?.message}
                {...register(`benefits.${i}.name`)}
              />
              <InputCurrency
                label="Amount"
                labelRequired
                placeholder="Rp."
                prefix="Rp "
                error={errors.benefits?.[i]?.amount?.message}
                name={`benefits.${i}.amount`}
                value={el.amount}
                onValueChange={(v) => {
                  setValue(`benefits.${i}.amount`, v || '')
                  trigger(`benefits.${i}.amount`)
                }}
              />
            </div>
            <div className="flex justify-end">
              <Button type="button" color="error" variant="light" onClick={() => handleRemoveBenefit(i)}>
                Remove Item
              </Button>
            </div>
          </div>
        ))}
        <Button type="button" block color="primary" variant="light" onClick={handleAddBenefit}>
          Add Item
        </Button>
      </CardBody>

      <CardFooter className="gap-3">
        <Button type="button" variant="light" color="primary" className="min-w-24" onClick={props.handlePrev}>
          Prev
        </Button>
        <Button type="submit" color="primary" disabled={props.isLoading} loading={props.isLoading}>
          {props.isRevise ? 'Revise' : 'Send'} Offering Letter
        </Button>
      </CardFooter>
    </Card>
  )
}

export default RenumerationForm
