import React, { useState } from 'react'
import { MapPinIcon } from 'lucide-react'
import MapsPreviewerModal from '@/components/Elements/Modals/MapsPreviewerModal'
import MainTable from '@/components/Elements/Tables/MainTable'
import ActionMenu from './ActionMenu'

// import { Avatar } from 'jobseeker-ui'

type TableProps = {
  items: IBranch[]
  loading?: boolean
  onDeleted?: (oid: string) => void
  setSelectedToUpdate?: (item: IBranch) => void
}

const Table: React.FC<TableProps> = ({ items, loading, ...props }) => {
  const [showCoordinate, setShowCoordinate] = useState<{ latLong?: [number, number]; range?: number }>()

  const headerItems = [
    { children: 'Name', className: 'text-left' },
    { children: 'Address', className: 'text-left' },
    { children: 'Location' },
    // { children: 'Employees' },
    { children: 'Range' },
    { children: 'Action', className: 'w-24' },
  ]

  const bodyItems = items.map((item, index) => ({
    items: [
      {
        children: <span className="block font-semibold">{item.name}</span>,
      },
      { children: item.address },
      {
        children: (
          <button
            className="text-primary-600 disabled:text-gray-600"
            disabled={!item.coordinate}
            onClick={() => setShowCoordinate({ latLong: item.coordinate?.coordinates, range: item.range })}
            title="View Coordinate"
          >
            <MapPinIcon size={16} />
          </button>
        ),
        className: 'text-center',
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
      { children: item?.range || '-', className: 'text-center' },
      {
        children: <ActionMenu index={index} item={item} total={items.length} upSpace={items.length > 8 ? 3 : 0} {...props} />,
      },
    ],
  }))

  return (
    <>
      <MapsPreviewerModal
        coordinates={showCoordinate?.latLong}
        onClose={() => setShowCoordinate(undefined)}
        radiusCoordinates={showCoordinate?.latLong}
        radius={showCoordinate?.range}
      />
      <MainTable bodyItems={bodyItems} headerItems={headerItems} loading={loading} />
    </>
  )
}

export default Table
