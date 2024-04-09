import MainTable from '@/components/Elements/MainTable'

type PropTypes = {
  items: any
}

const Table: React.FC<PropTypes> = ({ items }) => {
  const bodyItems = items.map(() => ({
    items: [
      { children: 'John Doe', className: 'text-center' },
      { children: 3, className: 'text-center' },
      { children: 4, className: 'text-center' },
      { children: 1, className: 'text-center' },
      { children: 2, className: 'text-center' },
      { children: 8, className: 'text-center' },
      { children: 0, className: 'text-center' },
    ],
  }))

  return (
    <>
      <MainTable
        headerItems={[
          { children: 'Name' },
          { children: 'Post Job' },
          { children: 'hired' },
          { children: 'Rejected' },
          { children: 'Interviewed' },
          { children: 'Locked' },
          { children: 'Blacklisted' },
        ]}
        bodyItems={bodyItems}
      />
    </>
  )
}

export default Table
