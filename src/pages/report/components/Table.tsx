import type { INumberOfHiredDataTable } from '@/types'
import { MainTable } from '@/components'

type PropTypes = {
  items: INumberOfHiredDataTable[]
  loading?: boolean
}

const Table: React.FC<PropTypes> = ({ items, loading }) => {
  const bodyItems = items.map((item) => ({
    items: [
      { children: item.vacancy.name, className: 'text-center' },
      { children: item.q1, className: 'text-center' },
      { children: item.q2, className: 'text-center' },
      { children: item.q3, className: 'text-center' },
      { children: item.q4, className: 'text-center' },
    ],
  }))

  return (
    <>
      <MainTable
        bodyItems={bodyItems}
        headerItems={[
          { children: 'Job', className: 'text-center' },
          { children: 'Q1', className: 'text-center' },
          { children: 'Q2', className: 'text-center' },
          { children: 'Q3', className: 'text-center' },
          { children: 'Q4', className: 'text-center' },
        ]}
        loading={loading}
      />
    </>
  )
}

export default Table
