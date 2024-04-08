import MainTable from '@/components/Elements/MainTable'
// import { useState } from 'react'

type PropTypes = {
  // items: IAttendance[]
  items: any
  loading?: boolean
  onDataChange: (data: string) => void
}

const DetailsTable: React.FC<PropTypes> = ({ items, loading }) => {
  // const [showOptionModal, setShowOptionModal] = useState(false)
  // const handleViewDetails = () => {
  //   setShowOptionModal(true)
  // }

  const headerItems = [
    { children: 'Date', className: 'text-left' },
    { children: 'Branch', className: 'text-left' },
    { children: 'Scheduled Check In', className: 'text-left' },
    { children: 'Scheduled Check Out', className: 'text-left' },
    { children: 'Clock In', className: 'text-left' },
    { children: 'Clock Out', className: 'text-left' },
    { children: 'Client Visit In', className: 'text-left' },
    { children: 'Client Visit Out', className: 'text-left' },
    { children: 'Overtime In', className: 'text-left' },
    { children: 'Overtime Out', className: 'text-left' },
    { children: 'Total Overtime', className: 'text-left' },
    { children: 'Location', className: 'text-left' },
    { children: 'Attachment', className: 'text-left' },
  ]

  const bodyItems = items.map(() => ({
    items: [
      { children: 'John Doe', className: 'text-center' },
      { children: 'John Doe', className: 'text-center' },
      { children: 'John Doe', className: 'text-center' },
      { children: 'John Doe', className: 'text-center' },
      { children: 'John Doe', className: 'text-center' },
      { children: 'John Doe', className: 'text-center' },
      { children: 'John Doe', className: 'text-center' },
      { children: 'John Doe', className: 'text-center' },
      { children: 'John Doe', className: 'text-center' },
      { children: 'John Doe', className: 'text-center' },
      { children: 'John Doe', className: 'text-center' },
      { children: 'John Doe', className: 'text-center' },
      { children: 'John Doe', className: 'text-center' },
    ],
  }))

  return (
    <>
      <div className="overflow-x-auto">
        <MainTable headerItems={headerItems} bodyItems={bodyItems} loading={loading} />
      </div>
    </>
  )
}

export default DetailsTable
