import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Input, InputCurrency, Modal, ModalFooter, ModalHeader, Select, useToast } from 'jobseeker-ui'
import { AMOUNT_TYPE_OPTIONS, APPLICATION_TYPE_OPTIONS, TAX_TYPE_OPTIONS } from '@/constants'
import { payrollService } from '@/services'
import { axiosErrorMessage, currencyToNumber } from '@/utils'
import { schema } from './shared'

type PropType = {
  onClose?: () => void
  onCreated?: () => void
  show?: boolean
  type: 'BENEFIT' | 'DEDUCTION'
}

const CreateModal: React.FC<PropType> = ({ onClose, onCreated, show, type }) => {
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  const {
    formState: { errors },
    getValues,
    handleSubmit,
    register,
    reset,
    setValue,
    trigger,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true)

    try {
      const createFn = type === 'BENEFIT' ? payrollService.createBenefitComponent : payrollService.createDeductionComponent
      await createFn({ ...data, maxCap: currencyToNumber(data.maxCap) })
      toast('Component created successfully.', { color: 'success' })
      onCreated?.()
      onClose?.()
      setTimeout(() => {
        reset()
      }, 200)
    } catch (e) {
      toast(axiosErrorMessage(e), { color: 'error' })
    }
    setLoading(false)
  })

  return (
    <Modal as="form" className="p-0" onSubmit={onSubmit} show={!!show}>
      <ModalHeader
        className="capitalize"
        onClose={() => {
          onClose?.()
          setTimeout(() => reset(), 200)
        }}
        subTitle="Add Your Company Payroll Component"
      >
        Create {type.toLowerCase()} component
      </ModalHeader>
      <div className="grid grid-cols-1 gap-2 p-3">
        <Input error={errors.name?.message} label="Component Title" labelRequired placeholder="Component Title" {...register('name')} />
        <Select
          error={errors.amountType?.message}
          label="Fixed/Percentage"
          labelRequired
          name="amountType"
          onChange={(v) => {
            setValue('amountType', v.toString())
            trigger('amountType')
          }}
          options={AMOUNT_TYPE_OPTIONS}
          placeholder="Fixed/Percentage"
          value={getValues('amountType')}
        />
        {watch(`amountType`) === 'FIXED' ? (
          <InputCurrency
            error={errors.amount?.message}
            label="Amount"
            labelRequired
            name={`amount`}
            onValueChange={(v) => {
              setValue(`amount`, v || '')
              trigger(`amount`)
            }}
            placeholder="Amount"
            prefix="Rp "
            value={getValues(`amount`)}
          />
        ) : (
          <Input
            error={errors.amount?.message}
            label="Amount"
            labelRequired
            placeholder="Amount"
            {...register(`amount`)}
            onChange={(v) => {
              setValue('amount', v.currentTarget.value)
              trigger('amount')
            }}
            rightChild={<span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">%</span>}
            type="number"
          />
        )}
        <InputCurrency
          error={errors.maxCap?.message}
          label="Max. Cap"
          labelRequired
          name="maxCap"
          onValueChange={(v) => {
            setValue('maxCap', v || '')
            trigger('maxCap')
          }}
          placeholder="Max. Cap"
          prefix="Rp "
          value={getValues('maxCap')}
        />
        <Select
          error={errors.applicationType?.message}
          label="Application Type"
          labelRequired
          name="applicationType"
          onChange={(v) => {
            setValue('applicationType', v.toString())
            trigger('applicationType')
          }}
          options={APPLICATION_TYPE_OPTIONS}
          placeholder="Application Type"
          value={getValues('applicationType')}
        />
        <Select
          error={errors.taxType?.message}
          label="Taxable/Non-Taxable"
          labelRequired
          name="taxType"
          onChange={(v) => {
            setValue('taxType', v.toString())
            trigger('taxType')
          }}
          options={TAX_TYPE_OPTIONS}
          placeholder="Taxable/Non-Taxable"
          value={getValues('taxType')}
        />
      </div>
      <ModalFooter className="gap-3">
        <Button
          className="w-24"
          color="error"
          disabled={loading}
          onClick={() => {
            onClose?.()
            setTimeout(() => reset(), 200)
          }}
          type="button"
          variant="light"
        >
          Cancel
        </Button>
        <Button color="primary" disabled={loading} loading={loading} type="submit">
          Add Component
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default CreateModal
