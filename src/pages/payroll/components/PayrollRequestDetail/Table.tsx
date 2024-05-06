import React, { useState } from 'react'
import { Avatar, Button } from 'jobseeker-ui'
import MainTable from '@/components/Elements/Tables/MainTable'
import DetailEmployeePayrollModal from '@/pages/payroll/components/DetailEmployeePayrollModal'
import numberToCurrency from '@/utils/number-to-currency'
import DeleteItemButton from './DeleteItemButton'

const Table: React.FC<{ items: IEmployeePayrollResult[]; loading?: boolean; onRefresh?: () => void }> = ({ items, loading, onRefresh }) => {
  const [selectedToUpdate, setSelectedToUpdate] = useState<IEmployeePayrollResult | null>(null)

  const headerItems = [
    { children: 'Employee Name', className: 'text-left' },
    { children: 'Tax Method' },
    { children: 'PTKP Status' },
    { children: 'Earnings' },
    { children: 'Benefit' },
    { children: 'Deduction' },
    { children: 'Total' },
    { children: 'Action', className: 'w-32' },
  ]

  const bodyItems = items.map((item) => {
    return {
      items: [
        {
          children: (
            <div className="flex items-center gap-3">
              <Avatar className="rounded-lg bg-primary-100 text-primary-700" name={item.name || ''} size={38} />
              <span className="block font-semibold">{item.name}</span>
            </div>
          ),
        },
        { children: item.taxMethod || '-', className: 'text-center' },
        { children: item.ptkpStatus || '-', className: 'text-center' },
        { children: numberToCurrency(parseInt(item.baseSalary || '0')), className: 'text-center' },
        { children: numberToCurrency(parseInt(item.totalBenefit || '0')), className: 'text-center' },
        { children: numberToCurrency(parseInt(item.totalDeduction || '0')), className: 'text-center' },
        { children: numberToCurrency(parseInt(item.totalAll || '0')), className: 'text-center' },
        {
          children: (
            <span className="flex items-center justify-center gap-1">
              <Button color="primary" onClick={() => setSelectedToUpdate(item)} size="small" type="button" variant="light">
                Detail
              </Button>
              <DeleteItemButton color="error" oid={item.oid} onRefresh={onRefresh} size="small">
                Delete
              </DeleteItemButton>
            </span>
          ),
        },
      ],
    }
  })

  return (
    <>
      <DetailEmployeePayrollModal item={selectedToUpdate} onClose={() => setSelectedToUpdate(null)} onRefresh={onRefresh} />
      <MainTable bodyItems={bodyItems} headerItems={headerItems} loading={loading} />
    </>
  )
}

export default Table
