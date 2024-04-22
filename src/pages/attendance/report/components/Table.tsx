import MainTable from '@/components/Elements/Tables/MainTable'
import { Avatar, Button } from 'jobseeker-ui'
import { useState } from 'react'
import ViewModal from './ViewModal'
import { useNavigate } from 'react-router-dom'

type PropTypes = {
  items: any
  loading?: boolean
  onDataChange?: (data: string) => void
}

const Table: React.FC<PropTypes> = ({ items, loading }) => {
  const [showOptionModal, setShowOptionModal] = useState(false)
  const navigate = useNavigate()

  const handleViewDetails = (id: string) => {
    navigate(`/attendance/report/${id}`)
  }

  const headerItems = [
    { children: 'Employee', className: 'text-left' },
    { children: 'Department', className: 'text-center' },
    { children: 'Branch', className: 'text-center' },
    { children: 'Action', className: 'text-center' },
  ]

  const bodyItems = items.map((item: any) => ({
    items: [
      {
        children: (
          <div className="flex gap-3 whitespace-nowrap">
            <div>
              <Avatar name={item?.name || '-'} size={38} className="static rounded-lg bg-primary-100 text-primary-700" />
            </div>
            <div>
              <span className="block font-semibold">{item?.name}</span>
              <span className="text-xs text-gray-500">{item?.employeeCode}</span>
            </div>
          </div>
        ),
      },
      { children: item?.department?.name, className: 'text-center' },
      { children: item?.branch?.name, className: 'text-center' },
      {
        className: 'flex item-center justify-center',
        children: (
          <Button
            type="button"
            size="small"
            color="primary"
            variant="light"
            className="text-xs"
            onClick={() => handleViewDetails(item.oid)}
          >
            View Report
          </Button>
        ),
      },
    ],
  }))

  return (
    <>
      {showOptionModal && <ViewModal show={showOptionModal} onClose={() => setShowOptionModal(false)} items={items} />}
      <MainTable headerItems={headerItems} bodyItems={bodyItems} loading={loading} />
    </>
  )
}

export default Table
