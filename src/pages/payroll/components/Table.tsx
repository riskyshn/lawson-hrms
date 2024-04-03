import MainTable from '@/components/Elements/MainTable'
import { Avatar } from 'jobseeker-ui'
import React, { useState } from 'react'
import ActionMenu from './ActionMenu'
import EditModal from './EditModal'
import numberToCurrency from '@/utils/number-to-currency'
import ApplyToModal from './ApplyToModal'

type PropTypes = {
  type: 'BENEFIT' | 'DEDUCTION'
  items: (IBenefitComponent | IDeductionComponent)[]
  loading?: boolean
  onRefresh?: () => void
}

const Table: React.FC<PropTypes> = ({ type, items, loading, onRefresh }) => {
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
    { children: 'Applied Employees' },
    { children: 'Action', className: 'w-24' },
  ]

  const bodyItems = items.map((item, index) => ({
    items: [
      { children: item.name, className: 'font-semibold' },
      { children: item.amountType },
      { children: item.amountType === 'fixed' ? numberToCurrency(item.amount) : `${item.amount}%` },
      { children: numberToCurrency(item.maxCap) },
      { children: item.applicationType },
      { children: item.taxType },
      {
        children: (
          <span className="flex items-center justify-center gap-2">
            <span className="flex">
              <Avatar name="John Doe" size={38} className="rounded-full bg-success-100 text-success-700" />
              <Avatar name="Jane Doe" size={38} className="-ml-3 rounded-full bg-primary-100 text-primary-700" />
              <Avatar name="Jane Doe" size={38} className="-ml-3 rounded-full bg-error-100 text-error-700" />
            </span>
            <a href="#" className="text-primary-600">
              {(index + 1) * 3}+
            </a>
          </span>
        ),
        className: 'text-center',
      },
      {
        children: (
          <ActionMenu
            type={type}
            item={item}
            index={index}
            total={items.length}
            upSpace={items.length > 8 ? 3 : 0}
            setSelectedToEdit={setSelectedToEdit}
            setSelectedToApply={setSelectedToApply}
            onRefresh={onRefresh}
          />
        ),
      },
    ],
  }))

  return (
    <>
      <ApplyToModal type={type} item={selectedToApply} onClose={() => setSelectedToApply(null)} onSubmited={onRefresh} />
      <EditModal type={type} item={selectedToEdit} onClose={() => setSelectedToEdit(null)} onUpdated={onRefresh} />
      <MainTable headerItems={headerItems} bodyItems={bodyItems} loading={loading} />
    </>
  )
}

export default Table
