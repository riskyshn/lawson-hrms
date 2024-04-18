import MainTable from '@/components/Elements/Tables/MainTable'
import { Badge, Button, Color } from 'jobseeker-ui'
import moment from 'moment'
import React from 'react'
import { Link } from 'react-router-dom'
import ActionMenu from './ActionMenu'

const Table: React.FC<{ items: IPayrollRequest[]; loading?: boolean; onRefresh?: () => void }> = ({ items, loading }) => {
  const headerItems = [
    { children: 'Name', className: 'text-left' },
    { children: 'Period' },
    { children: 'Schedule' },
    { children: 'Requestor' },
    { children: 'Approver' },
    { children: 'Status' },
    { children: 'Action', className: 'w-24' },
  ]

  const bodyItems = items.map((item, index) => ({
    items: [
      { children: <span className="block font-semibold">{item.name}</span> },
      {
        children: `${moment(item.startPeriod).format('DD-MM-YYYY')} - ${moment(item.endPeriod).format('DD-MM-YYYY')}`,
        className: 'text-center',
      },
      { children: item.paymentedAt ? moment(item.paymentedAt).format('DD-MM-YYYY') : '-', className: 'text-center' },
      { children: item.requestor?.name || '', className: 'text-center' },
      { children: item.approver?.name || '', className: 'text-center' },
      {
        children: (
          <Badge color={getStatusColor(item.status?.oid || '')} className="font-semibold">
            {item.status?.name}
          </Badge>
        ),
        className: 'text-center',
      },
      {
        children:
          item.status?.oid === '1' ? (
            <ActionMenu item={item} index={index} total={items.length} upSpace={items.length > 8 ? 3 : 0} />
          ) : (
            <Button as={Link} block color="primary" className="text-xs" size="small" to={`/payroll/payroll-request/${item.oid}`}>
              Detail
            </Button>
          ),
      },
    ],
  }))

  return <MainTable headerItems={headerItems} bodyItems={bodyItems} loading={loading} />
}

const getStatusColor = (status: string): Color => {
  const statusMap: Record<string, Color> = {
    '0': 'warning',
    '1': 'success',
    '2': 'error',
  }
  return statusMap[status] || 'default'
}

export default Table
