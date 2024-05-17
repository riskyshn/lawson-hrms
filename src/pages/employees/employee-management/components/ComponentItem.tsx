import type { IBenefitComponent, IDeductionComponent } from '@/types'
import React, { useEffect, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { Button, Input, InputCurrency, Select } from 'jobseeker-ui'
import { InferType } from 'yup'
import { AMOUNT_TYPE_OPTIONS, APPLICATION_TYPE_OPTIONS, TAX_TYPE_OPTIONS } from '@/constants'
import { componentDataSchema } from './shared'

type Schema = InferType<typeof componentDataSchema>

type PropTypes = {
  components: (IBenefitComponent | IDeductionComponent)[]
  form: UseFormReturn<Schema>
  index: number
  item: {
    amount: string
    amountType: string
    applicationType: string
    componentId: string
    maxCap: string
    taxType: string
  }
  onRemove: (index: number) => void
  type: 'benefits' | 'deductions'
}

const ComponentItem: React.FC<PropTypes> = ({ components, form, index, item, onRemove, type }) => {
  const {
    formState: { errors },
    getValues,
    register,
    setValue,
    trigger,
    watch,
  } = form

  const [initial, setInitial] = useState(true)

  useEffect(() => {
    if (!initial) {
      const component = components.find((el) => el.oid === item.componentId)
      if (!component) return

      setValue(`${type}.${index}.amount`, String(component.amount || ''))
      setValue(`${type}.${index}.amountType`, String(component.amountType?.oid || ''))
      setValue(`${type}.${index}.applicationType`, String(component.applicationType?.oid || ''))
      setValue(`${type}.${index}.taxType`, String(component.taxType?.oid || ''))
      setValue(`${type}.${index}.maxCap`, String(component.maxCap || 0))
    }

    setInitial(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item.componentId])

  return (
    <div className="grid grid-cols-1 gap-3 rounded-lg border p-3 shadow-sm even:bg-gray-100">
      <Select
        error={errors[type]?.[index]?.componentId?.message}
        label="Component"
        labelRequired
        name={`${type}.${index}.componentId`}
        onChange={(v) => setValue(`${type}.${index}.componentId`, v.toString())}
        options={components.map((el) => ({ label: `${el.name}`, value: el.oid }))}
        placeholder="Select Component"
        value={item.componentId}
      />
      <Select
        error={errors[type]?.[index]?.amountType?.message}
        hideSearch
        label="Amount Type"
        labelRequired
        name={`${type}.${index}.amountType`}
        onChange={(v) => {
          setValue(`${type}.${index}.amountType`, v.toString())
          trigger(`${type}.${index}.amountType`)
          setValue(`${type}.${index}.amount`, '')
          trigger(`${type}.${index}.amount`)
        }}
        options={AMOUNT_TYPE_OPTIONS}
        placeholder="Fixed/Percentage"
        value={getValues(`${type}.${index}.amountType`)}
      />
      {watch(`${type}.${index}.amountType`) === 'FIXED' ? (
        <InputCurrency
          error={errors[type]?.[index]?.amount?.message}
          label="Amount"
          labelRequired
          name={`${type}.${index}.amount`}
          onValueChange={(v) => {
            setValue(`${type}.${index}.amount`, v || '')
            trigger(`${type}.${index}.amount`)
          }}
          placeholder="Amount"
          prefix="Rp "
          value={getValues(`${type}.${index}.amount`)}
        />
      ) : (
        <Input
          error={errors[type]?.[index]?.amount?.message}
          label="Amount"
          labelRequired
          placeholder="Amount"
          {...register(`${type}.${index}.amount`)}
          onChange={(v) => {
            setValue(`${type}.${index}.amount`, v.currentTarget.value)
            trigger(`${type}.${index}.amount`)
          }}
          rightChild={<span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">%</span>}
          type="number"
        />
      )}
      <InputCurrency
        error={errors[type]?.[index]?.maxCap?.message}
        label="Max. Cap"
        labelRequired
        name={`${type}.${index}.maxCap`}
        onValueChange={(v) => {
          setValue(`${type}.${index}.maxCap`, v || '')
          trigger(`${type}.${index}.maxCap`)
        }}
        placeholder="Max. Cap"
        prefix="Rp "
        value={getValues(`${type}.${index}.maxCap`)}
      />
      <Select
        error={errors[type]?.[index]?.applicationType?.message}
        hideSearch
        label="Application Type"
        labelRequired
        name="applicationType"
        onChange={(v) => {
          setValue(`${type}.${index}.applicationType`, v.toString())
          trigger(`${type}.${index}.applicationType`)
        }}
        options={APPLICATION_TYPE_OPTIONS}
        placeholder="Application Type"
        value={getValues(`${type}.${index}.applicationType`)}
      />
      <Select
        error={errors[type]?.[index]?.taxType?.message}
        hideSearch
        label="Tax Type"
        labelRequired
        name={`${type}.${index}.taxType`}
        onChange={(v) => {
          setValue(`${type}.${index}.taxType`, v.toString())
          trigger(`${type}.${index}.taxType`)
        }}
        options={TAX_TYPE_OPTIONS}
        placeholder="Taxable/Non-Taxable"
        value={getValues(`${type}.${index}.taxType`)}
      />
      <div className="flex justify-end">
        <Button color="error" onClick={() => onRemove(index)} type="button" variant="light">
          Remove Component
        </Button>
      </div>
    </div>
  )
}

export default ComponentItem
