import type { IWorkplacement } from '@/types'
import React from 'react'
import { MainTable } from '@/components'
import ActionMenu from './ActionMenu'

// import { Avatar } from 'jobseeker-ui'

type TableProps = {
  items: IWorkplacement[]
  loading?: boolean
  onDeleted?: (oid: string) => void
  setSelectedToUpdate?: (item: IWorkplacement) => void
}

const Table: React.FC<TableProps> = ({ items, loading, ...props }) => {
  const headerItems = [
    { children: 'Name', className: 'text-left' },
    // { children: 'Employees' },
    { children: 'Action', className: 'w-24' },
  ]

  const bodyItems = items.map((item, index) => ({
    items: [
      {
        children: <span className="block font-semibold">{item.name}</span>,
      },
      // {
      //   children: (
      //     <span className="flex items-center justify-center gap-2">
      //       <span className="flex">
      //         <Avatar name="John Doe" size={38} className="rounded-full bg-success-100 text-success-700" />
      //         <Avatar name="Jane Doe" size={38} className="-ml-3 rounded-full bg-primary-100 text-primary-700" />
      //         <Avatar name="Jane Doe" size={38} className="-ml-3 rounded-full bg-error-100 text-error-700" />
      //       </span>
      //       <a href="#" className="text-primary-600">
      //         0
      //       </a>
      //     </span>
      //   ),
      //   className: 'text-center',
      // },
      {
        children: <ActionMenu index={index} item={item} total={items.length} {...props} />,
      },
    ],
  }))

  return <MainTable bodyItems={bodyItems} headerItems={headerItems} loading={loading} />
}

export default Table
