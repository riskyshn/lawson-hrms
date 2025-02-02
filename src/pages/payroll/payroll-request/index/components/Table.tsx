import type { IPayrollRequest } from '@/types'
import React from 'react'
import { Link } from 'react-router-dom'
import { Badge, Button, Color } from 'jobseeker-ui'
import moment from 'moment'
import { MainTable } from '@/components'
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
          <Badge className="font-semibold" color={getStatusColor(item.status?.oid || '')}>
            {item.status?.name}
          </Badge>
        ),
        className: 'text-center',
      },
      {
        children:
          item.status?.oid === '1' ? (
            <ActionMenu index={index} item={item} total={items.length} />
          ) : (
            <Button as={Link} block className="text-xs" color="primary" size="small" to={`/payroll/payroll-request/${item.oid}`}>
              Detail
            </Button>
          ),
      },
    ],
  }))

  return <MainTable bodyItems={bodyItems} headerItems={headerItems} loading={loading} />
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
