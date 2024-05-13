import type { IPayrollRequest } from '@/types'
import React from 'react'
import { Link } from 'react-router-dom'
import { Badge, Button, Color } from 'jobseeker-ui'
import moment from 'moment'
import MainTable from '@/components/Elements/Tables/MainTable'

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
          children: `${moment.utc(item.startPeriod).local().format('DD-MM-YYYY')} - ${moment.utc(item.endPeriod).local().format('DD-MM-YYYY')}`,
          className: 'text-center',
        },
        { children: item.paymentedAt ? moment.utc(item.paymentedAt).local().format('DD-MM-YYYY') : '-', className: 'text-center' },
        { children: item.requestor?.name || '', className: 'text-center' },
        { children: item.approver?.name || '', className: 'text-center' },
        {
          children: (
            <Badge className="font-semibold" color={status.color}>
              {status.text}
            </Badge>
          ),
          className: 'text-center',
        },
        { children: moment.utc(item.createdAt).local().format('DD-MM-YYYY HH:mm'), className: 'text-center' },
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

  return <MainTable bodyItems={bodyItems} headerItems={headerItems} loading={loading} />
}

const getStatus = (status: string): { color: Color; text: string } => {
  const statusMap: Record<string, { color: Color; text: string }> = {
    COMPLETED: { color: 'success', text: 'Completed' },
    FAILED: { color: 'error', text: 'Failed' },
    ON_PROCESS: { color: 'primary', text: 'On Process' },
    WAITING: { color: 'warning', text: 'Waiting' },
  }
  return statusMap[status] || { color: 'default', text: status || 'Unknown' }
}

export default Table
