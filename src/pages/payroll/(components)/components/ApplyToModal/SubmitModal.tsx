import type { IBenefitComponent, IDeductionComponent } from '@/types'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Input, InputCurrency, Modal, ModalFooter, ModalHeader, Select, useToast } from 'jobseeker-ui'
import { AMOUNT_TYPE_OPTIONS, APPLICATION_TYPE_OPTIONS, TAX_TYPE_OPTIONS } from '@/constants'
import { payrollService } from '@/services'
import { axiosErrorMessage, currencyToNumber } from '@/utils'
import { schema } from '../shared'

type PropType = {
  item?: IBenefitComponent | IDeductionComponent | null
  onClose?: () => void
  onSubmit?: () => void
  payload: string[]
  show?: boolean
  type: 'BENEFIT' | 'DEDUCTION'
}

const SubmitModal: React.FC<PropType> = ({ item, onClose, onSubmit: onSubmited, payload, show, type }) => {
  const [loading, setLoading] = useState(false)
  const toast = useToast()
  const [updated, setUpdated] = useState(false)
  // const navigate = useNavigate()

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
      await applyFn({ componentId: item.oid, employeeIds: payload })
      toast('Apply component to employees successfully.', { color: 'success' })
      // navigate(`/payroll/${type.toLowerCase()}-components/${item.oid}/employees`)
      onSubmited?.()
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
    <Modal as="form" className="p-0" onSubmit={onSubmit} show={show}>
      <ModalHeader className="capitalize" onClose={onClose} subTitle={`Apply "${item?.name}" to Employee`}>
        Component Details
      </ModalHeader>
      <div className="grid grid-cols-1 gap-2 p-3">
        <Input
          error={errors.name?.message}
          label="Component Name"
          labelRequired
          placeholder="Component Name"
          {...register('name')}
          disabled
        />
        <Select
          error={errors.amountType?.message}
          hideSearch
          label="Amount Type"
          labelRequired
          name="amountType"
          onChange={(v) => {
            setValue('amountType', v.toString())
            trigger('amountType')
            setUpdated(true)
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
            setUpdated(true)
          }}
          placeholder="Max. Cap"
          prefix="Rp "
          value={getValues('maxCap')}
        />
        <Select
          error={errors.applicationType?.message}
          hideSearch
          label="Application Type"
          labelRequired
          name="applicationType"
          onChange={(v) => {
            setValue('applicationType', v.toString())
            trigger('applicationType')
            setUpdated(true)
          }}
          options={APPLICATION_TYPE_OPTIONS}
          placeholder="Application Type"
          value={getValues('applicationType')}
        />
        <Select
          error={errors.taxType?.message}
          hideSearch
          label="Taxable/Non-Taxable"
          labelRequired
          name="taxType"
          onChange={(v) => {
            setValue('taxType', v.toString())
            trigger('taxType')
            setUpdated(true)
          }}
          options={TAX_TYPE_OPTIONS}
          placeholder="Taxable/Non-Taxable"
          value={getValues('taxType')}
        />
      </div>
      <ModalFooter className="gap-3">
        <Button className="w-24" color="error" disabled={loading} onClick={onClose} type="button" variant="light">
          Cancel
        </Button>
        <Button className="min-w-24" color="primary" disabled={loading} loading={loading} type="submit">
          {updated ? 'Update and Apply' : 'Apply'}
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default SubmitModal
