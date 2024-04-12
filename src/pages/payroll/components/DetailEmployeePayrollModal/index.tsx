import MainTable from '@/components/Elements/Tables/MainTable'
import useRemember from '@/hooks/use-remember'
import { Avatar, Button, Modal, ModalFooter, ModalHeader } from 'jobseeker-ui'
import React from 'react'
import TableItem from './TableItem'

type PropTypes = {
  item?: IEmployeePayrollResult | null
  onClose?: () => void
  onRefresh?: () => void
}

const DetailEmployeePayrollModal: React.FC<PropTypes> = ({ item, onClose }) => {
  const rItem = useRemember(item)

  return (
    <Modal show={!!item} className="max-w-5xl">
      <ModalHeader onClose={onClose}>Detail Payroll</ModalHeader>

      <div className="flex items-center gap-3 p-3">
        <Avatar name={`${rItem?.name}`} size={48} className="bg-primary-50 text-primary-700" />
        <div>
          <h3 className="font-semibold capitalize">{rItem?.name}</h3>
          <span className="block text-xs">{rItem?.oid}</span>
        </div>
      </div>

      <div>
        <MainTable
          headerItems={[
            { children: 'Name', className: 'text-left' },
            { children: 'Type', className: 'text-left' },
            { children: 'Amount', className: 'text-left' },
            { children: 'Action', className: 'w-32' },
          ]}
          bodyItems={[
            { children: <TableItem /> },
            { children: <TableItem /> },
            { children: <TableItem /> },
            {
              className: 'border-t',
              items: [
                { colSpan: 2 },
                {
                  className: 'text-right',
                  colSpan: 2,
                  children: (
                    <>
                      <strong>Total Payroll : </strong> Rp 123.134.144
                    </>
                  ),
                },
              ],
            },
          ]}
        />
      </div>

      <ModalFooter>
        <Button variant="light" color="error" className="w-24" onClick={onClose}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default DetailEmployeePayrollModal
