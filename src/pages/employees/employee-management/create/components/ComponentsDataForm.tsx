import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Card, CardBody, CardFooter, Input, InputCurrency, Select } from 'jobseeker-ui'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const schema = yup.object().shape({
  benefits: yup.array().of(
    yup.object().shape({
      componentId: yup.string().required().label('Component'),
      amount: yup.string().required().label('Amount'),
      applicationType: yup.number().required().label('Application Type'),
    }),
  ),
  deductions: yup.array().of(
    yup.object().shape({
      componentId: yup.string().required().label('Component'),
      amount: yup.string().required().label('Amount'),
      applicationType: yup.number().required().label('Application Type'),
    }),
  ),
})

const ComponentsDataForm: React.FC<{
  defaultValue: any
  handlePrev: () => void
  handleSubmit: (data: any) => void
  isLoading?: boolean
}> = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  })

  const watchBenefits = watch('benefits')
  const watchDeductions = watch('deductions')

  const handleAddBenefit = () => {
    const benefits = getValues('benefits') || []
    setValue('benefits', [...benefits, { amount: '', applicationType: 0, componentId: '' }])
  }

  const handleRemoveBenefit = (index: number) => {
    const benefits = getValues('benefits') || []
    setValue('benefits', [...benefits.filter((_, i) => i !== index)])
  }

  const handleAddDeduction = () => {
    const deductions = getValues('deductions') || []
    setValue('deductions', [...deductions, { amount: '', applicationType: 0, componentId: '' }])
  }

  const handleRemoveDeduction = (index: number) => {
    const deductions = getValues('deductions') || []
    setValue('deductions', [...deductions.filter((_, i) => i !== index)])
  }

  const onSubmit = handleSubmit(props.handleSubmit)

  return (
    <Card as="form" onSubmit={onSubmit}>
      <CardBody className="grid grid-cols-1 gap-2">
        <div className="pb-2">
          <h3 className="text-lg font-semibold">Components</h3>
          <p className="text-xs text-gray-500">Please Adjust Components You Would Like to Apply for this Employee</p>
        </div>
        <h3 className="text-sm font-semibold">Benefits</h3>
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <Input label="Jaminan Hari Tua (JHT)" disabled defaultValue="3.70%" />
          <Input label="Jaminan Kecelakaan Kerja (JKK)" disabled defaultValue="0.24%" />
        </div>
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <Input label="Jaminan Kematian (JKM)" disabled defaultValue="0.30%" />
          <Input label="Jaminan Pensiun (JP)" disabled defaultValue="2%" />
        </div>
        <Input label="Jaminan Kesehatan (KS)" disabled defaultValue="4%" help="KS Maximum Cap Rp. 480.000,00*" />
      </CardBody>

      <CardBody className="grid grid-cols-1 gap-3">
        {watchBenefits?.map((el, i) => (
          <div key={i} className="grid grid-cols-1 gap-3 rounded-lg border p-3 shadow-sm even:bg-gray-100">
            <Select
              label="Component"
              value={el.componentId}
              name={`benefits.${i}.componentId`}
              error={errors.benefits?.[i]?.componentId?.message}
              onChange={(v) => setValue(`benefits.${i}.componentId`, v.toString())}
              options={dummyComponents}
            />
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
              <Input label="Type" placeholder="Taxable/Non Taxable" disabled />
              <Input label="Percentage/Fixed" placeholder="Percentage/Fixed" disabled />
            </div>
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
              <InputCurrency
                label="Amount"
                labelRequired
                prefix="Rp "
                error={errors.benefits?.[i]?.amount?.message}
                {...register(`benefits.${i}.amount`)}
              />
              <Select
                label="Application Type"
                labelRequired
                placeholder="'Based on Working Days', 'Lump Sum'"
                hideSearch
                value={el.applicationType}
                name={`benefits.${i}.applicationType`}
                error={errors.benefits?.[i]?.applicationType?.message}
                onChange={(v) => setValue(`benefits.${i}.applicationType`, Number(v))}
                options={[
                  { label: 'Based on Working Days', value: 1 },
                  { label: 'Lump Sum', value: 2 },
                ]}
              />
            </div>
            <div className="flex justify-end">
              <Button type="button" color="error" variant="light" onClick={() => handleRemoveBenefit(i)}>
                Remove Component
              </Button>
            </div>
          </div>
        ))}
        <Button type="button" block color="primary" variant="light" onClick={handleAddBenefit}>
          Add Component
        </Button>
      </CardBody>

      <CardBody className="grid grid-cols-1 gap-2">
        <h3 className="text-sm font-semibold">Deduction</h3>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <Input label="Jaminan Hari Tua (JHT)" disabled />
          <Input label="Jaminan Kecelakaan Kerja (JKK)" disabled />
        </div>
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <Input label="Jaminan Kematian (JKM)" disabled />
          <Input label="Jaminan Pensiun (JP)" labelRequired disabled />
        </div>
        <Input label="Jaminan Kesehatan (KS)" disabled help="KS Maximum Cap Rp. 480.000,00*" />

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <Input label="Jaminan Hari Tua (JHT)" disabled />
          <Input label="Jaminan Pensiun (JP)" disabled />
        </div>

        <Input label="Jaminan Kesehatan (KS)" disabled help="KS Maximum Cap Rp. 480.000,00*" />
      </CardBody>

      <CardBody className="grid grid-cols-1 gap-3">
        {watchDeductions?.map((el, i) => (
          <div key={i} className="grid grid-cols-1 gap-3 rounded-lg border p-3 shadow-sm even:bg-gray-100">
            <Select
              label="Component"
              value={el.componentId}
              name={`deductions.${i}.componentId`}
              error={errors.deductions?.[i]?.componentId?.message}
              onChange={(v) => setValue(`deductions.${i}.componentId`, v.toString())}
              options={dummyComponents}
            />
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
              <Input label="Type" placeholder="Taxable/Non Taxable" disabled />
              <Input label="Percentage/Fixed" placeholder="Percentage/Fixed" disabled />
            </div>
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
              <InputCurrency
                label="Amount"
                labelRequired
                prefix="Rp "
                error={errors.deductions?.[i]?.amount?.message}
                {...register(`deductions.${i}.amount`)}
              />
              <Select
                label="Application Type"
                labelRequired
                placeholder="'Based on Working Days', 'Lump Sum'"
                hideSearch
                value={el.applicationType}
                name={`deductions.${i}.applicationType`}
                error={errors.deductions?.[i]?.applicationType?.message}
                onChange={(v) => setValue(`deductions.${i}.applicationType`, Number(v))}
                options={[
                  { label: 'Based on Working Days', value: 1 },
                  { label: 'Lump Sum', value: 2 },
                ]}
              />
            </div>
            <div className="flex justify-end">
              <Button type="button" color="error" variant="light" onClick={() => handleRemoveDeduction(i)}>
                Remove Component
              </Button>
            </div>
          </div>
        ))}
        <Button type="button" block color="primary" variant="light" onClick={handleAddDeduction}>
          Add Component
        </Button>
      </CardBody>

      <CardFooter className="gap-3">
        <Button type="button" color="primary" variant="light" className="w-32" disabled={props.isLoading} onClick={props.handlePrev}>
          Prev
        </Button>
        <Button type="submit" color="primary" className="w-32" disabled={props.isLoading} loading={props.isLoading}>
          Submit
        </Button>
      </CardFooter>
    </Card>
  )
}

export default ComponentsDataForm

const dummyComponents = [
  { label: 'Communication Allowance', value: 'communication_allowance' },
  { label: 'Travel Allowance', value: 'travel_allowance' },
  { label: 'Housing Allowance', value: 'housing_allowance' },
  { label: 'Medical Allowance', value: 'medical_allowance' },
  { label: 'Food Allowance', value: 'food_allowance' },
  { label: 'Entertainment Allowance', value: 'entertainment_allowance' },
  { label: 'Clothing Allowance', value: 'clothing_allowance' },
  { label: 'Education Allowance', value: 'education_allowance' },
  { label: 'Transportation Allowance', value: 'transportation_allowance' },
  { label: 'Telephone Allowance', value: 'telephone_allowance' },
  { label: 'Internet Allowance', value: 'internet_allowance' },
  { label: 'Professional Development Allowance', value: 'professional_development_allowance' },
  { label: 'Relocation Allowance', value: 'relocation_allowance' },
  { label: 'Dependent Allowance', value: 'dependent_allowance' },
  { label: 'Other Allowance (Specify)', value: 'other_allowance' }, // Option for custom entries
]
