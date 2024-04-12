import numberToCurrency from '@/utils/number-to-currency'
import { BaseInputCurrency, Button } from 'jobseeker-ui'
import { useState } from 'react'

const TableItem = () => {
  const [isEdit, setIsEdit] = useState(false)
  return (
    <>
      <td className="p-3 text-sm">Component Name</td>
      <td className="p-3 text-sm">Deduction</td>
      {!isEdit && <td className="p-3 text-sm">{numberToCurrency(332344000)}</td>}
      {isEdit && (
        <td className="p-3 text-sm">
          <BaseInputCurrency value="332344000" />
        </td>
      )}
      <td className="p-3">
        <div className="flex justify-center gap-1">
          {isEdit && (
            <>
              <Button size="small" variant="light" color="error" onClick={() => setIsEdit(false)}>
                Cancel
              </Button>

              <Button size="small" color="primary" className="w-14" onClick={() => setIsEdit(true)}>
                Save
              </Button>
            </>
          )}
          {!isEdit && (
            <Button size="small" color="primary" className="w-14" onClick={() => setIsEdit(true)}>
              Edit
            </Button>
          )}
        </div>
      </td>
    </>
  )
}

export default TableItem
