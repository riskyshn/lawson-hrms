import MainTable from '@jshrms/shared/components/Elements/Tables/MainTable'

type PropTypes = {
  items: any
  loading?: boolean
}

const TableUserActivity: React.FC<PropTypes> = ({ items, loading }) => {
  const bodyItems = items.map((item: any) => ({
    items: [
      { children: item.name, className: 'text-center' },
      { children: item.postJob, className: 'text-center' },
      { children: item.hired, className: 'text-center' },
      { children: item.rejected, className: 'text-center' },
      { children: item.interviewed, className: 'text-center' },
      { children: item.locked, className: 'text-center' },
      { children: item.blacklisted, className: 'text-center' },
    ],
  }))

  return (
    <>
      <MainTable
        bodyItems={bodyItems}
        headerItems={[
          { children: 'Name', className: 'text-center' },
          { children: 'Post Job', className: 'text-center' },
          { children: 'Hired', className: 'text-center' },
          { children: 'Rejected', className: 'text-center' },
          { children: 'Interviewed', className: 'text-center' },
          { children: 'Locked', className: 'text-center' },
          { children: 'Blacklisted', className: 'text-center' },
        ]}
        loading={loading}
      />
    </>
  )
}

export default TableUserActivity
