import { useEffect, useState } from 'react'
import { BaseInputCurrency, Button, useToast } from 'jobseeker-ui'
import { twJoin } from 'tailwind-merge'
import { payrollService } from '@/services'
import { axiosErrorMessage, currencyToNumber, numberToCurrency } from '@/utils'

type PropTypes = {
  amount: string
  itemId: string
  name: string
  onChange?: (value: number) => void
  onRefresh?: () => void
  type: {
    name: string
    oid: string
  }
}

const TableItem: React.FC<PropTypes> = ({ amount, itemId, name, onChange, onRefresh, type }) => {
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
        amount: value,
        name,
        type: type.oid,
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
            disabled={isLoading}
            error={error ? 'true' : ''}
            onValueChange={(v) => setInput(v || '')}
            value={input}
          />
        </td>
      )}
      <td className="p-3">
        <div className="flex justify-end gap-1">
          {isEdit && (
            <>
              <Button color="error" disabled={isLoading} onClick={handleCancel} size="small" variant="light">
                Cancel
              </Button>
              {edited && (
                <Button className="w-14" color="primary" disabled={isLoading} loading={isLoading} onClick={handleSave} size="small">
                  Save
                </Button>
              )}
            </>
          )}
          {!isEdit && (
            <Button className="w-14" color="primary" onClick={() => setIsEdit(true)} size="small" variant="light">
              Edit
            </Button>
          )}
        </div>
      </td>
    </>
  )
}

export default TableItem
