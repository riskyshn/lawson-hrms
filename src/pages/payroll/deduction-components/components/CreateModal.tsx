import { payrollService } from '@/services'
import { axiosErrorMessage } from '@/utils/axios'
import currencyToNumber from '@/utils/currency-to-number'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Input, InputCurrency, Modal, ModalFooter, ModalHeader, Select, useToast } from 'jobseeker-ui'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

type PropType = {
  show?: boolean
  onClose?: () => void
  onCreated?: () => void
}

const schema = yup.object().shape({
  name: yup.string().required().label('Component Name'),
  amountType: yup.string().required().label('Amount Type'),
  amount: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required()
    .label('Amount'),
  maxCap: yup.string().required().label('Max Cap'),
  applicationType: yup.string().required().label('Application Type'),
  taxType: yup.string().required().label('Tax Type'),
})

const options = {
  amountType: ['percentage', 'fixed'],
  applicationType: ['lump-sum', 'working-days'],
  taxType: ['taxable', 'non-taxable'],
}

const generateOptions = (items: string[]) => items.map((item) => ({ label: item, value: item }))

const CreateModal: React.FC<PropType> = ({ show, onClose, onCreated }) => {
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
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true)

    try {
      await payrollService.createDeductionComponent({ ...data, maxCap: currencyToNumber(data.maxCap) })
      toast('Deduction component created successfully.', { color: 'success' })
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
      <ModalHeader subTitle="Add Your Company Payroll Component" onClose={onClose}>
        Create Deduction Component
      </ModalHeader>
      <div className="grid grid-cols-1 gap-2 p-3">
        <Input label="Component Title" placeholder="Component Title" labelRequired error={errors.name?.message} {...register('name')} />
        <Select
          label="Fixed/Percentage"
          placeholder="Fixed/Percentage"
          labelRequired
          options={generateOptions(options.amountType)}
          name="amountType"
          error={errors.amountType?.message}
          value={getValues('amountType')}
          onChange={(v) => {
            setValue('amountType', v.toString())
            trigger('amountType')
          }}
        />
        <Input label="Amount" placeholder="Amount" labelRequired error={errors.amount?.message} {...register('amount')} />
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
          options={generateOptions(options.applicationType)}
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
          options={generateOptions(options.taxType)}
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
