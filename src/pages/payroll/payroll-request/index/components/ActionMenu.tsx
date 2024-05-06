import React from 'react'
import { useNavigate } from 'react-router-dom'
import { BanknoteIcon, DownloadIcon, EyeIcon } from 'lucide-react'
import * as Table from '@/components/Elements/Tables/MainTable'

type ActionMenuProps = {
  index: number
  item: IPayrollRequest
  total: number
  upSpace: number
}

const ActionMenu: React.FC<ActionMenuProps> = ({ index, item, total, upSpace }) => {
  const navigate = useNavigate()

  const viewDetails: Table.ActionMenuItemProps = {
    action() {
      navigate(`/payroll/payroll-request/${item.oid}`)
    },
    icon: EyeIcon,
    text: 'View Details',
  }

  const downloadReport: Table.ActionMenuItemProps = {
    icon: DownloadIcon,
    text: 'Download Report',
  }

  const downloadBankRelease: Table.ActionMenuItemProps = {
    icon: BanknoteIcon,
    text: 'Download Bank Release',
  }

  const menuItems = [viewDetails, downloadReport, downloadBankRelease]

  return (
    <Table.ActionMenu up={index >= total - upSpace}>
      {menuItems.map((item, i) => (
        <Table.ActionMenuItem key={i} {...item} />
      ))}
    </Table.ActionMenu>
  )
}

export default ActionMenu
