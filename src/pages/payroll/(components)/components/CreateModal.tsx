import { AMOUNT_TYPE_OPTIONS, APPLICATION_TYPE_OPTIONS, TAX_TYPE_OPTIONS } from '@/constants/options'
import { payrollService } from '@/services'
import { axiosErrorMessage } from '@/utils/axios'
import currencyToNumber from '@/utils/currency-to-number'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Input, InputCurrency, Modal, ModalFooter, ModalHeader, Select, useToast } from 'jobseeker-ui'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { schema } from './shared'

type PropType = {
  type: 'BENEFIT' | 'DEDUCTION'
  show?: boolean
  onClose?: () => void
  onCreated?: () => void
}

const CreateModal: React.FC<PropType> = ({ type, show, onClose, onCreated }) => {
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    trigger,
    formState: { errors },
    reset,
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
    <Modal as="form" onSubmit={onSubmit} show={!!show} className="p-0">
      <ModalHeader
        subTitle="Add Your Company Payroll Component"
        className="capitalize"
        onClose={() => {
          onClose?.()
          setTimeout(() => reset(), 200)
        }}
      >
        Create {type.toLowerCase()} component
      </ModalHeader>
      <div className="grid grid-cols-1 gap-2 p-3">
        <Input label="Component Title" placeholder="Component Title" labelRequired error={errors.name?.message} {...register('name')} />
        <Select
          label="Fixed/Percentage"
          placeholder="Fixed/Percentage"
          labelRequired
          options={AMOUNT_TYPE_OPTIONS}
          name="amountType"
          error={errors.amountType?.message}
          value={getValues('amountType')}
          onChange={(v) => {
            setValue('amountType', v.toString())
            trigger('amountType')
          }}
        />
        {watch(`amountType`) === 'FIXED' ? (
          <InputCurrency
            label="Amount"
            placeholder="Amount"
            labelRequired
            prefix="Rp "
            error={errors.amount?.message}
            name={`amount`}
            value={getValues(`amount`)}
            onValueChange={(v) => {
              setValue(`amount`, v || '')
              trigger(`amount`)
            }}
          />
        ) : (
          <Input
            label="Amount"
            placeholder="Amount"
            labelRequired
            error={errors.amount?.message}
            {...register(`amount`)}
            type="number"
            rightChild={<span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">%</span>}
            onChange={(v) => {
              setValue('amount', v.currentTarget.value)
              trigger('amount')
            }}
          />
        )}
        <InputCurrency
          label="Max. Cap"
          placeholder="Max. Cap"
          labelRequired
          prefix="Rp "
          error={errors.maxCap?.message}
          name="maxCap"
          value={getValues('maxCap')}
          onValueChange={(v) => {
            setValue('maxCap', v || '')
            trigger('maxCap')
          }}
        />
        <Select
          label="Application Type"
          placeholder="Application Type"
          labelRequired
          options={APPLICATION_TYPE_OPTIONS}
          name="applicationType"
          error={errors.applicationType?.message}
          value={getValues('applicationType')}
          onChange={(v) => {
            setValue('applicationType', v.toString())
            trigger('applicationType')
          }}
        />
        <Select
          label="Taxable/Non-Taxable"
          placeholder="Taxable/Non-Taxable"
          labelRequired
          options={TAX_TYPE_OPTIONS}
          name="taxType"
          error={errors.taxType?.message}
          value={getValues('taxType')}
          onChange={(v) => {
            setValue('taxType', v.toString())
            trigger('taxType')
          }}
        />
      </div>
      <ModalFooter className="gap-3">
        <Button
          type="button"
          color="error"
          variant="light"
          className="w-24"
          disabled={loading}
          onClick={() => {
            onClose?.()
            setTimeout(() => reset(), 200)
          }}
        >
          Cancel
        </Button>
        <Button type="submit" color="primary" disabled={loading} loading={loading}>
          Add Component
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default CreateModal
