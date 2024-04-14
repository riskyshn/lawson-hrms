import { payrollService } from '@/services'
import { axiosErrorMessage } from '@/utils/axios'
import currencyToNumber from '@/utils/currency-to-number'
import numberToCurrency from '@/utils/number-to-currency'
import { BaseInputCurrency, Button, useToast } from 'jobseeker-ui'
import { useEffect, useState } from 'react'
import { twJoin } from 'tailwind-merge'

type PropTypes = {
  itemId: string
  name: string
  type: {
    oid: string
    name: string
  }
  amount: string
  onChange?: (value: number) => void
  onRefresh?: () => void
}

const TableItem: React.FC<PropTypes> = ({ itemId, name, type, amount, onChange, onRefresh }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const isMinus = type.oid === 'DEDUCTION'
  const [input, setInput] = useState(amount)

  const toast = useToast()

  const value = currencyToNumber(input)
  const edited = value !== currencyToNumber(amount)
  const error = value < 0

  useEffect(() => {
    onChange?.(value * (isMinus ? -1 : 1))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, isMinus])

  const handleCancel = () => {
    setInput(amount)
    setIsEdit(false)
  }

  const handleSave = async () => {
    setIsLoading(true)
    try {
      await payrollService.updatePayrollComponentDetail(itemId, {
        name,
        type: type.oid,
        amount: value,
      })
      onRefresh?.()
    } catch (e) {
      setIsLoading(false)
      toast(axiosErrorMessage(e), { color: 'error' })
    }
  }

  useEffect(() => {
    setIsEdit(false)
    setIsLoading(false)
  }, [amount])

  return (
    <>
      <td className="p-3 text-sm">{name}</td>
      <td className="p-3 text-sm">{type.name}</td>
      {!isEdit && (
        <td className={twJoin('p-3 text-sm', isMinus ? 'text-error-600' : 'text-success-600')}>
          <span onClick={() => setIsEdit(true)}>{numberToCurrency(parseFloat(amount) * (isMinus ? -1 : 1))}</span>
        </td>
      )}
      {isEdit && (
        <td>
          <BaseInputCurrency
            autoFocus
            error={error ? 'true' : ''}
            value={input}
            disabled={isLoading}
            onValueChange={(v) => setInput(v || '')}
          />
        </td>
      )}
      <td className="p-3">
        <div className="flex justify-end gap-1">
          {isEdit && (
            <>
              <Button size="small" variant="light" color="error" disabled={isLoading} onClick={handleCancel}>
                Cancel
              </Button>
              {edited && (
                <Button size="small" color="primary" className="w-14" disabled={isLoading} loading={isLoading} onClick={handleSave}>
                  Save
                </Button>
              )}
            </>
          )}
          {!isEdit && (
            <Button size="small" variant="light" color="primary" className="w-14" onClick={() => setIsEdit(true)}>
              Edit
            </Button>
          )}
        </div>
      </td>
    </>
  )
}

export default TableItem
