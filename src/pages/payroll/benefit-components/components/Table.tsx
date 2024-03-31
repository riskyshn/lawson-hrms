import MainTable from '@/components/Elements/MainTable'
import { Avatar } from 'jobseeker-ui'
import React, { useState } from 'react'
import ActionMenu from './ActionMenu'
import EditModal from './EditModal'
import numberToCurrency from '@/utils/number-to-currency'

type PropTypes = {
  items: IBenefitComponent[]
  loading?: boolean
  onRefresh?: () => void
}

const Table: React.FC<PropTypes> = ({ items, loading, onRefresh }) => {
  const [selectedToEdit, setSelectedToEdit] = useState<IBenefitComponent | null>(null)

  const headerItems = [
    { children: 'Component', className: 'text-left' },
    { children: 'Fixed/Percentage', className: 'text-left' },
    { children: 'Amount', className: 'text-left' },
    { children: 'Max. Cap', className: 'text-left' },
    { children: 'Application Type', className: 'text-left' },
    { children: 'Taxable/Non Taxable', className: 'text-left' },
    { children: 'Applied Employees' },
    { children: 'Action', className: 'w-24' },
  ]

  const bodyItems = items.map((item, index) => ({
    items: [
      { children: item.name, className: 'font-semibold' },
      { children: item.amountType },
      { children: numberToCurrency(item.amount) },
      { children: typeof item.maxCap === 'number' ? item.maxCap + '%' : '-' },
      { children: item.taxType },
      { children: item.applicationType },
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
            item={item}
            index={index}
            total={items.length}
            upSpace={items.length > 8 ? 3 : 0}
            setSelectedToEdit={setSelectedToEdit}
            onRefresh={onRefresh}
          />
        ),
      },
    ],
  }))

  return (
    <>
      <EditModal item={selectedToEdit} onClose={() => setSelectedToEdit(null)} onUpdated={onRefresh} />
      <MainTable headerItems={headerItems} bodyItems={bodyItems} loading={loading} />
    </>
  )
}

export default Table
