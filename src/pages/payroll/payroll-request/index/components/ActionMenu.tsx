import * as Table from '@/components/Elements/Tables/MainTable'
import { BanknoteIcon, DownloadIcon, EyeIcon } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

type ActionMenuProps = {
  item: IPayrollRequest
  index: number
  total: number
  upSpace: number
}

const ActionMenu: React.FC<ActionMenuProps> = ({ item, index, total, upSpace }) => {
  const navigate = useNavigate()

  const viewDetails: Table.ActionMenuItemProps = {
    text: 'View Details',
    icon: EyeIcon,
    action() {
      navigate(`/payroll/payroll-request/${item.oid}`)
    },
  }

  const downloadReport: Table.ActionMenuItemProps = {
    text: 'Download Report',
    icon: DownloadIcon,
  }

  const downloadBankRelease: Table.ActionMenuItemProps = {
    text: 'Download Bank Release',
    icon: BanknoteIcon,
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
