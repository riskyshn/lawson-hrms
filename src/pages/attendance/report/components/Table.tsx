import type { IDataTableEmployee } from '@/types'
import { useNavigate } from 'react-router-dom'
import { Avatar, Button } from 'jobseeker-ui'
import MainTable from '@/components/Elements/Tables/MainTable'

type PropTypes = {
  items: IDataTableEmployee[]
  loading?: boolean
  onDataChange?: (data: string) => void
}

const Table: React.FC<PropTypes> = ({ items, loading }) => {
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
              <Avatar className="static rounded-lg bg-primary-100 text-primary-700" name={item?.name || '-'} size={38} />
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
        children: (
          <Button
            className="text-xs"
            color="primary"
            onClick={() => handleViewDetails(item.oid)}
            size="small"
            type="button"
            variant="light"
          >
            View Report
          </Button>
        ),
        className: 'flex item-center justify-center',
      },
    ],
  }))

  return (
    <>
      <MainTable bodyItems={bodyItems} headerItems={headerItems} loading={loading} />
    </>
  )
}

export default Table
