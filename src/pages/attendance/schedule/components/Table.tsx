import type { ISchedule } from '@/types'
import { MainTable } from '@/components'
import NumberOfEmployeeLink from '@/components/UI/NumberOfEmployeeLink'
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
      { children: item.name, className: 'whitespace-normal' },
      {
        children: (
          <NumberOfEmployeeLink
            count={Number(item.count)}
            to={`/attendance/schedule/detail?scheduleId=${item.oid}&scheduleName=${item.name}`}
          />
        ),
        className: 'text-center',
      },
      { children: <ActionMenu items={item} onApplyVacancy={onDataChange} options={options} /> },
    ],
  }))

  return (
    <>
      <MainTable
        bodyItems={bodyItems}
        headerItems={[
          { children: 'Schedule Name', className: 'text-left' },
          { children: 'Employee in Schedule', className: 'text-center' },
          { children: 'Action', className: 'w-24' },
        ]}
        loading={loading}
      />
    </>
  )
}

export default Table
