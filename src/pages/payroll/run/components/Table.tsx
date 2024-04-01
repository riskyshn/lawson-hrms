import MainTable from '@/components/Elements/MainTable'
import React from 'react'

type PropTypes = {
  items: IDeductionComponent[]
  loading?: boolean
  onRefresh?: () => void
}

const Table: React.FC<PropTypes> = ({ items, loading }) => {
  const headerItems = [
    { children: 'Employee Name', className: 'text-left' },
    { children: 'Tax Method', className: 'text-left' },
    { children: 'PTKP Status', className: 'text-left' },
    { children: 'Earnings', className: 'text-left' },
    { children: 'Benefit', className: 'text-left' },
    { children: 'Deduction', className: 'text-left' },
    { children: 'Total' },
    { children: 'Action', className: 'w-24' },
  ]

  const bodyItems = items.map(() => ({
    items: [
      { children: '-', className: 'font-semibold' },
      { children: '-' },
      { children: '-' },
      { children: '-' },
      { children: '-' },
      { children: '-' },
      {
        children: '-',
        className: 'text-center',
      },
      // {
      //   children: (
      //     <ActionMenu
      //       item={item}
      //       index={index}
      //       total={items.length}
      //       upSpace={items.length > 8 ? 3 : 0}
      //       setSelectedToEdit={setSelectedToEdit}
      //       onRefresh={onRefresh}
      //     />
      //   ),
      // },
    ],
  }))

  return (
    <>
      <MainTable headerItems={headerItems} bodyItems={bodyItems} loading={loading} />
    </>
  )
}

export default Table
