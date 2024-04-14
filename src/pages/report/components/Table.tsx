import MainTable from '@/components/Elements/Tables/MainTable'

type PropTypes = {
  items: any
  loading?: boolean
}

const Table: React.FC<PropTypes> = ({ items, loading }) => {
  const bodyItems = items.map((item: any) => ({
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
        headerItems={[
          { children: 'Job', className: 'text-center' },
          { children: 'Q1', className: 'text-center' },
          { children: 'Q2', className: 'text-center' },
          { children: 'Q3', className: 'text-center' },
          { children: 'Q4', className: 'text-center' },
        ]}
        bodyItems={bodyItems}
        loading={loading}
      />
    </>
  )
}

export default Table
