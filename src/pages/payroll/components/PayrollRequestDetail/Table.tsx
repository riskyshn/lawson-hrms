import MainTable from '@/components/Elements/Tables/MainTable'
import DetailEmployeePayrollModal from '@/pages/payroll/components/DetailEmployeePayrollModal'
import numberToCurrency from '@/utils/number-to-currency'
import { Avatar, Button } from 'jobseeker-ui'
import React, { useState } from 'react'
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
              <Avatar name={item.name || ''} size={38} className="rounded-lg bg-primary-100 text-primary-700" />
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
              <Button type="button" color="primary" variant="light" size="small" onClick={() => setSelectedToUpdate(item)}>
                Detail
              </Button>
              <DeleteItemButton oid={item.oid} color="error" size="small" onRefresh={onRefresh}>
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
      <DetailEmployeePayrollModal item={selectedToUpdate} onClose={() => setSelectedToUpdate(null)} />
      <MainTable headerItems={headerItems} bodyItems={bodyItems} loading={loading} />
    </>
  )
}

export default Table
