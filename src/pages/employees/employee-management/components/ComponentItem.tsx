import { Button, Input, InputCurrency, Select } from 'jobseeker-ui'
import React, { useEffect } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { InferType } from 'yup'
import { componentDataSchema } from './shared'
import { AMOUNT_TYPE_OPTIONS, APPLICATION_TYPE_OPTIONS, TAX_TYPE_OPTIONS } from '@/constants/options'

type Schema = InferType<typeof componentDataSchema>

type PropTypes = {
  type: 'benefits' | 'deductions'
  index: number
  components: {
    benefits: IBenefitComponent[]
    deductions: IDeductionComponent[]
  }
  item: {
    componentId: string
    amountType: string
    amount: string
    maxCap: string
    applicationType: string
    taxType: string
  }
  form: UseFormReturn<Schema>
  onRemove: (index: number) => void
}

const ComponentItem: React.FC<PropTypes> = ({ type, index, components, item, form, onRemove }) => {
  const {
    setValue,
    getValues,
    trigger,
    register,
    watch,
    formState: { errors },
  } = form

  useEffect(() => {
    const component = components[type].find((el) => el.oid === item.componentId)
    if (!component) return

    setValue(`${type}.${index}.amount`, String(component.amount || ''))
    setValue(`${type}.${index}.amountType`, String(component.amountType || ''))
    setValue(`${type}.${index}.applicationType`, String(component.applicationType || ''))
    setValue(`${type}.${index}.taxType`, String(component.taxType || ''))
    setValue(`${type}.${index}.maxCap`, String(component.maxCap || ''))

    trigger(`${type}.${index}.amount`)
    trigger(`${type}.${index}.amountType`)
    trigger(`${type}.${index}.applicationType`)
    trigger(`${type}.${index}.taxType`)
    trigger(`${type}.${index}.maxCap`)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item.componentId])

  return (
    <div className="grid grid-cols-1 gap-3 rounded-lg border p-3 shadow-sm even:bg-gray-100">
      <Select
        label="Component"
        labelRequired
        placeholder="Select Component"
        value={item.componentId}
        name={`${type}.${index}.componentId`}
        error={errors[type]?.[index]?.componentId?.message}
        onChange={(v) => setValue(`${type}.${index}.componentId`, v.toString())}
        options={components[type].map((el) => ({ label: `${el.name}`, value: el.oid }))}
      />
      <Select
        hideSearch
        label="Amount Type"
        placeholder="Fixed/Percentage"
        labelRequired
        options={AMOUNT_TYPE_OPTIONS}
        name={`${type}.${index}.amountType`}
        error={errors[type]?.[index]?.amountType?.message}
        value={getValues(`${type}.${index}.amountType`)}
        onChange={(v) => {
          setValue(`${type}.${index}.amountType`, v.toString())
          trigger(`${type}.${index}.amountType`)
          setValue(`${type}.${index}.amount`, '')
          trigger(`${type}.${index}.amount`)
        }}
      />
      {watch(`${type}.${index}.amountType`) === 'fixed' ? (
        <InputCurrency
          label="Amount"
          placeholder="Amount"
          labelRequired
          prefix="Rp "
          error={errors[type]?.[index]?.amount?.message}
          name={`${type}.${index}.amount`}
          value={getValues(`${type}.${index}.amount`)}
          onValueChange={(v) => {
            setValue(`${type}.${index}.amount`, v || '')
            trigger(`${type}.${index}.amount`)
          }}
        />
      ) : (
        <Input
          label="Amount"
          placeholder="Amount"
          labelRequired
          error={errors[type]?.[index]?.amount?.message}
          {...register(`${type}.${index}.amount`)}
          rightChild={<span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">%</span>}
          onChange={(v) => {
            setValue(`${type}.${index}.amount`, v.currentTarget.value)
            trigger(`${type}.${index}.amount`)
          }}
          type="number"
        />
      )}
      <InputCurrency
        label="Max. Cap"
        placeholder="Max. Cap"
        labelRequired
        prefix="Rp "
        error={errors[type]?.[index]?.maxCap?.message}
        name={`${type}.${index}.maxCap`}
        value={getValues(`${type}.${index}.maxCap`)}
        onValueChange={(v) => {
          setValue(`${type}.${index}.maxCap`, v || '')
          trigger(`${type}.${index}.maxCap`)
        }}
      />
      <Select
        hideSearch
        label="Application Type"
        placeholder="Application Type"
        labelRequired
        options={APPLICATION_TYPE_OPTIONS}
        name="applicationType"
        error={errors[type]?.[index]?.applicationType?.message}
        value={getValues(`${type}.${index}.applicationType`)}
        onChange={(v) => {
          setValue(`${type}.${index}.applicationType`, v.toString())
          trigger(`${type}.${index}.applicationType`)
        }}
      />
      <Select
        hideSearch
        label="Tax Type"
        placeholder="Taxable/Non-Taxable"
        labelRequired
        options={TAX_TYPE_OPTIONS}
        name={`${type}.${index}.taxType`}
        error={errors[type]?.[index]?.taxType?.message}
        value={getValues(`${type}.${index}.taxType`)}
        onChange={(v) => {
          setValue(`${type}.${index}.taxType`, v.toString())
          trigger(`${type}.${index}.taxType`)
        }}
      />
      <div className="flex justify-end">
        <Button type="button" color="error" variant="light" onClick={() => onRemove(index)}>
          Remove Component
        </Button>
      </div>
    </div>
  )
}

export default ComponentItem
