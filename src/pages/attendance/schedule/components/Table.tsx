import MainTable from '@/components/Elements/Tables/MainTable'
import NumberOfEmployeeLink from '@/components/Elements/UI/NumberOfEmployeeLink'
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
        children: <NumberOfEmployeeLink to={`#`} count={Number(item.count)} />,
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
