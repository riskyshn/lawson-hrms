import { AMOUNT_TYPE_OPTIONS, APPLICATION_TYPE_OPTIONS, TAX_TYPE_OPTIONS } from '@/constants/options'
import { payrollService } from '@/services'
import { axiosErrorMessage } from '@/utils/axios'
import currencyToNumber from '@/utils/currency-to-number'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Input, InputCurrency, Modal, ModalFooter, ModalHeader, Select, useToast } from 'jobseeker-ui'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { schema } from '../shared'

type PropType = {
  type: 'BENEFIT' | 'DEDUCTION'
  item?: IBenefitComponent | IDeductionComponent | null
  show?: boolean
  onClose?: () => void
  payload: string[]
}

const SubmitModal: React.FC<PropType> = ({ payload, type, show, item, onClose }) => {
  const [loading, setLoading] = useState(false)
  const toast = useToast()
  const [updated, setUpdated] = useState(false)
  const navigate = useNavigate()

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

  useEffect(() => {
    if (!item) return
    setValue('name', item.name || '')
    setValue('amountType', item.amountType?.oid || '')
    setValue('amount', String(item.amount || ''))
    setValue('maxCap', String(item.maxCap || ''))
    setValue('applicationType', item.applicationType?.oid || '')
    setValue('taxType', item.taxType?.oid || '')
    trigger()
  }, [item, setValue, trigger])

  const onSubmit = handleSubmit(async (data) => {
    if (!item) return

    setLoading(true)

    try {
      if (updated) {
        const updateFn = type === 'BENEFIT' ? payrollService.updateBenefitComponent : payrollService.updateDeductionComponent
        await updateFn(item.oid, { ...data, maxCap: currencyToNumber(data.maxCap) })
      }
      const applyFn = type === 'BENEFIT' ? payrollService.applyBenefitToEmployees : payrollService.applyDeductionToEmployees
      await applyFn({ employeeIds: payload, componentId: item.oid })
      toast('Apply component to employees successfully.', { color: 'success' })
      navigate(`/payroll/${type.toLowerCase()}-components/${item.oid}/employees`)
      setTimeout(() => {
        reset()
        setUpdated(false)
      }, 200)
    } catch (e) {
      toast(axiosErrorMessage(e), { color: 'error' })
    }
    setLoading(false)
  })

  return (
    <Modal as="form" onSubmit={onSubmit} show={show} className="p-0">
      <ModalHeader subTitle={`Apply "${item?.name}" to Employee`} className="capitalize" onClose={onClose}>
        Component Details
      </ModalHeader>
      <div className="grid grid-cols-1 gap-2 p-3">
        <Input
          label="Component Name"
          placeholder="Component Name"
          labelRequired
          error={errors.name?.message}
          {...register('name')}
          disabled
        />
        <Select
          hideSearch
          label="Amount Type"
          placeholder="Fixed/Percentage"
          labelRequired
          options={AMOUNT_TYPE_OPTIONS}
          name="amountType"
          error={errors.amountType?.message}
          value={getValues('amountType')}
          onChange={(v) => {
            setValue('amountType', v.toString())
            trigger('amountType')
            setUpdated(true)
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
            setUpdated(true)
          }}
        />
        <Select
          hideSearch
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
            setUpdated(true)
          }}
        />
        <Select
          hideSearch
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
            setUpdated(true)
          }}
        />
      </div>
      <ModalFooter className="gap-3">
        <Button type="button" color="error" variant="light" className="w-24" disabled={loading} onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" color="primary" className="min-w-24" disabled={loading} loading={loading}>
          {updated ? 'Update and Apply' : 'Apply'}
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default SubmitModal
