import MainTable from '@/components/Elements/MainTable'
import { Badge, Button, Color } from 'jobseeker-ui'
import moment from 'moment'
import React from 'react'
import { Link } from 'react-router-dom'

const Table: React.FC<{ items: IPayrollRequest[]; loading?: boolean; onRefresh?: () => void }> = ({ items, loading }) => {
  const headerItems = [
    { children: 'Name', className: 'text-left' },
    { children: 'Period' },
    { children: 'Schedule' },
    { children: 'Requestor' },
    { children: 'Approver' },
    { children: 'Status' },
    { children: 'Generated at' },
    { children: 'Action', className: 'w-24' },
  ]

  const bodyItems = items.map((item) => {
    const status = getStatus(item.statusRunner || '')
    return {
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
            <Badge color={status.color} className="font-semibold">
              {status.text}
            </Badge>
          ),
          className: 'text-center',
        },
        { children: moment(item.createdAt).format('DD-MM-YYYY HH:mm'), className: 'text-center' },
        {
          children: (
            <Button as={Link} block color="primary" size="small" to={`/payroll/run-payroll-request/${item.oid}`}>
              Detail
            </Button>
          ),
        },
      ],
    }
  })

  return <MainTable headerItems={headerItems} bodyItems={bodyItems} loading={loading} />
}

const getStatus = (status: string): { text: string; color: Color } => {
  const statusMap: Record<string, { text: string; color: Color }> = {
    WAITING: { text: 'Waiting', color: 'warning' },
    ON_PROCESS: { text: 'On Process', color: 'primary' },
    COMPLETED: { text: 'Completed', color: 'success' },
    FAILED: { text: 'Failed', color: 'error' },
  }
  return statusMap[status] || { text: status || 'Unknown', color: 'default' }
}

export default Table
