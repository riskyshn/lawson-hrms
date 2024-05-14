import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Card, CardBody, CardFooter, Input, InputCurrency } from '@jshrms/ui'
import * as yup from 'yup'

const schema = yup.object({
  baseSalary: yup.string().required().label('Base Salary'),
  benefits: yup
    .array()
    .of(
      yup.object().shape({
        amount: yup.string().required().label('Amount'),
        name: yup.string().required().label('Name'),
      }),
    )
    .required()
    .label('Benefit/Allowance'),
})

const RenumerationForm: React.FC<{
  defaultValue: yup.InferType<typeof schema>
  handlePrev: () => void
  handleSubmit: (data: any) => void
  isLoading: boolean
  isRevise?: boolean
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
    resolver: yupResolver(schema),
  })
  const onSubmit = handleSubmit(props.handleSubmit)

  useEffect(() => {
    if (!props.defaultValue) return
    setValue('baseSalary', props.defaultValue.baseSalary || '')
    setValue('benefits', props.defaultValue.benefits || [{ amount: '', name: '' }])
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
          error={errors.baseSalary?.message}
          label="Base Salary"
          labelRequired
          name="baseSalary"
          onValueChange={(v) => {
            setValue('baseSalary', v || '')
            trigger('baseSalary')
          }}
          prefix="Rp "
          value={getValues('baseSalary')}
        />
      </CardBody>
      <CardBody className="grid grid-cols-1 gap-2">
        <div className="pb-2">
          <h3 className="text-lg font-semibold">Benefit/Allowance</h3>
          <p className="text-xs text-gray-500">Please fill out this form below</p>
        </div>

        {watchBenefits?.map((el, i) => (
          <div className="flex flex-col gap-1" key={i}>
            <div className="grid flex-1 grid-cols-2 gap-1">
              <Input
                error={errors.benefits?.[i]?.name?.message}
                label="Name"
                labelRequired
                placeholder="Name"
                {...register(`benefits.${i}.name`)}
              />
              <InputCurrency
                error={errors.benefits?.[i]?.amount?.message}
                label="Amount"
                labelRequired
                name={`benefits.${i}.amount`}
                onValueChange={(v) => {
                  setValue(`benefits.${i}.amount`, v || '')
                  trigger(`benefits.${i}.amount`)
                }}
                placeholder="Rp."
                prefix="Rp "
                value={el.amount}
              />
            </div>
            <div className="flex justify-end">
              <Button color="error" onClick={() => handleRemoveBenefit(i)} type="button" variant="light">
                Remove Item
              </Button>
            </div>
          </div>
        ))}
        <Button block color="primary" onClick={handleAddBenefit} type="button" variant="light">
          Add Item
        </Button>
      </CardBody>

      <CardFooter className="gap-3">
        <Button className="min-w-24" color="primary" onClick={props.handlePrev} type="button" variant="light">
          Prev
        </Button>
        <Button color="primary" disabled={props.isLoading} loading={props.isLoading} type="submit">
          {props.isRevise ? 'Revise' : 'Send'} Offering Letter
        </Button>
      </CardFooter>
    </Card>
  )
}

export default RenumerationForm
