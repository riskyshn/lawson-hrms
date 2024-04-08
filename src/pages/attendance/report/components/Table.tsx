import MainTable from '@/components/Elements/MainTable'
import { Avatar } from 'jobseeker-ui'
import { useState } from 'react'
import ViewModal from './ViewModal'
import { useNavigate } from 'react-router-dom'

type PropTypes = {
  items: ILeave[]
  loading?: boolean
  onDataChange: (data: string) => void
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

  const bodyItems = items.map((item) => ({
    items: [
      {
        children: (
          <div className="flex gap-3 whitespace-nowrap">
            <div>
              <Avatar name={item.employee?.name || '-'} size={38} className="static rounded-lg bg-primary-100 text-primary-700" />
            </div>
            <div>
              <span className="block font-semibold">{item.employee?.name}</span>
              <span className="text-xs text-gray-500">{item.employee?.employeeCode}</span>
            </div>
          </div>
        ),
      },
      { children: item.employee?.employment?.department?.name, className: 'text-center' },
      { children: item.employee?.employment?.branch?.name, className: 'text-center' },
      {
        className: 'flex item-center justify-center',
        children: (
          <button
            className={`group flex items-center gap-3 rounded-lg bg-primary-600 px-4 py-2 text-sm text-white`}
            onClick={() => handleViewDetails('1')}
          >
            View Report
          </button>
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
