import type { IBenefitComponent, IDeductionComponent } from '@/types'
import React, { useState } from 'react'
import { MainTable } from '@/components'
import { numberToCurrency } from '@/utils'
import ActionMenu from './ActionMenu'
import ApplyToModal from './ApplyToModal'
import EditModal from './EditModal'

type PropTypes = {
  items: (IBenefitComponent | IDeductionComponent)[]
  loading?: boolean
  onRefresh?: () => void
  type: 'BENEFIT' | 'DEDUCTION'
}

const Table: React.FC<PropTypes> = ({ items, loading, onRefresh, type }) => {
  type ComponentsMap = { BENEFIT: IBenefitComponent; DEDUCTION: IDeductionComponent }
  type SelectedType = ComponentsMap[typeof type]

  const [selectedToEdit, setSelectedToEdit] = useState<SelectedType | null>(null)
  const [selectedToApply, setSelectedToApply] = useState<SelectedType | null>(null)

  const headerItems = [
    { children: 'Component Name', className: 'text-left' },
    { children: 'Amount type', className: 'text-left' },
    { children: 'Amount', className: 'text-left' },
    { children: 'Max. Cap', className: 'text-left' },
    { children: 'Application Type', className: 'text-left' },
    { children: 'Tax type', className: 'text-left' },
    // { children: 'Applied Employees' },
    { children: 'Action', className: 'w-24' },
  ]

  const bodyItems = items.map((item, index) => ({
    items: [
      { children: item.name, className: 'font-semibold' },
      { children: item.amountType?.name },
      { children: item.amountType?.oid === 'FIXED' ? numberToCurrency(item.amount) : `${item.amount}%` },
      { children: numberToCurrency(item.maxCap) },
      { children: item.applicationType?.name },
      { children: item.taxType?.name },
      // {
      //   children: <NumberOfEmployeeLink count={(index + 1) * 3} to={`/payroll/${type.toLowerCase()}-components/${item.oid}/employees`} />,
      //   className: 'text-center',
      // },
      {
        children: (
          <ActionMenu
            index={index}
            item={item}
            onRefresh={onRefresh}
            setSelectedToApply={setSelectedToApply}
            setSelectedToEdit={setSelectedToEdit}
            total={items.length}
            type={type}
          />
        ),
      },
    ],
  }))

  return (
    <>
      <ApplyToModal item={selectedToApply} onClose={() => setSelectedToApply(null)} type={type} />
      <EditModal item={selectedToEdit} onClose={() => setSelectedToEdit(null)} onUpdated={onRefresh} type={type} />
      <MainTable bodyItems={bodyItems} headerItems={headerItems} loading={loading} />
    </>
  )
}

export default Table
