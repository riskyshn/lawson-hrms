import MainTable from '@/components/Elements/Tables/MainTable'
import { Badge } from 'jobseeker-ui'
import React from 'react'
import ActionMenu from './ActionMenu'
// import { Avatar } from 'jobseeker-ui'

type TableProps = {
  items: IJobType[]
  loading?: boolean
  setSelectedToUpdate?: (item: IJobType) => void
  onDeleted?: (oid: string) => void
}

const Table: React.FC<TableProps> = ({ items, loading, ...props }) => {
  const headerItems = [
    { children: 'Name', className: 'text-left' },
    { children: 'Status for employment', className: 'text-left' },
    // { children: 'Employees' },
    { children: 'Action', className: 'w-24' },
  ]

  const bodyItems = items.map((item, index) => ({
    items: [
      {
        children: <span className="block font-semibold">{item.name}</span>,
      },
      {
        children: (
          <Badge size="small" color={item.status == 1 ? 'primary' : 'error'}>
            {item.status == 1 ? 'Active' : 'Inactive'}
          </Badge>
        ),
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
        children: <ActionMenu item={item} index={index} total={items.length} upSpace={items.length > 8 ? 3 : 0} {...props} />,
      },
    ],
  }))

  return <MainTable headerItems={headerItems} bodyItems={bodyItems} loading={loading} />
}

export default Table
