import MainTable from '@/components/Elements/MainTable'
import { Avatar } from 'jobseeker-ui'
import ActionMenu from './ActionMenu'
type PropTypes = {
  items: ISchedule[]
  loading?: boolean
  onDataChange: (data: string) => void
}

const Table: React.FC<PropTypes> = ({ items, loading, onDataChange }) => {
  const options = ['View Details', 'Edit Schedule', 'Delete']

  const bodyItems = items.map((item) => ({
    items: [
      { children: item.title },
      {
        children: (
          <span className="flex items-center justify-center gap-2">
            <span className="flex">
              <Avatar name="John Doe" size={38} className="rounded-full bg-success-100 text-success-700" />
              <Avatar name="Jane Doe" size={38} className="-ml-3 rounded-full bg-primary-100 text-primary-700" />
              <Avatar name="Jane Doe" size={38} className="-ml-3 rounded-full bg-error-100 text-error-700" />
            </span>
            <a href="#" className="text-primary-600">
              0
            </a>
          </span>
        ),
        className: 'text-center',
      },
      { children: <ActionMenu options={options} items={item} onApplyVacancy={onDataChange} /> },
    ],
  }))

  return (
    <>
      <MainTable
        headerItems={[
          { children: 'Schedule Name', className: 'text-left' },
          { children: 'Employee in Schedule', className: 'text-center' },
          { children: 'Action', className: 'w-24' },
        ]}
        bodyItems={bodyItems}
        loading={loading}
      />
    </>
  )
}

export default Table
