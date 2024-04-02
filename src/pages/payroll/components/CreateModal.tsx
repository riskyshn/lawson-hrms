import { payrollService } from '@/services'
import { axiosErrorMessage } from '@/utils/axios'
import currencyToNumber from '@/utils/currency-to-number'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Input, InputCurrency, Modal, ModalFooter, ModalHeader, Select, useToast } from 'jobseeker-ui'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { schema, options } from './shared'

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
      <ModalHeader subTitle="Add Your Company Payroll Component" className="capitalize" onClose={onClose}>
        Create {type.toLowerCase()} component
      </ModalHeader>
      <div className="grid grid-cols-1 gap-2 p-3">
        <Input label="Component Title" placeholder="Component Title" labelRequired error={errors.name?.message} {...register('name')} />
        <Select
          label="Fixed/Percentage"
          placeholder="Fixed/Percentage"
          labelRequired
          options={options.amountType}
          name="amountType"
          error={errors.amountType?.message}
          value={getValues('amountType')}
          onChange={(v) => {
            setValue('amountType', v.toString())
            trigger('amountType')
          }}
        />
        {watch(`amountType`) === 'fixed' ? (
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
          <Input label="Amount" placeholder="Amount" labelRequired error={errors.amount?.message} {...register(`amount`)} type="number" />
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
          options={options.applicationType}
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
          options={options.taxType}
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
        <Button type="button" color="error" variant="light" className="w-24" disabled={loading} onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" color="primary" disabled={loading} loading={loading}>
          Save Changes
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default CreateModal
