import type { IPreviousEmployee } from '@/types'
import React from 'react'
import { useConfirm, useToast } from 'jobseeker-ui'
import { PowerIcon } from 'lucide-react'
import * as Table from '@/components/Tables'
import { employeeService } from '@/services'
import { axiosErrorMessage } from '@/utils'

// Define the props for the ActionMenu component
type ActionMenuProps = {
  index: number
  item: IPreviousEmployee // Assuming IPreviousEmployee is defined elsewhere
  onRestored?: () => void // Optional callback function when employee is restored
  total: number
  upSpace?: number
}

// ActionMenu component for handling actions on each employee item
const ActionMenu: React.FC<ActionMenuProps> = ({ index, item, onRestored, total, upSpace = total > 8 ? 3 : 0 }) => {
  const confirm = useConfirm() // Hook for displaying confirmation dialogs
  const toast = useToast() // Hook for displaying toast messages

  // Action to restore an employee
  const restoreEmployee: Table.ActionMenuItemProps = {
    action: async () => {
      const confirmed = await confirm({
        cancelBtnColor: 'primary', // Color for the cancel button
        confirmBtnColor: 'error', // Color for the confirmation button
        text: 'Are you sure you want to restore this employee?', // Confirmation message
      })

      if (confirmed) {
        try {
          // Call service to restore employee
          await employeeService.restoreEmployee(item.oid)
          // Display success message
          toast('Employee restored successfully.', { color: 'success' })
          // Callback to parent component if provided
          onRestored?.()
        } catch (e) {
          // Display error message if restoration fails
          toast(axiosErrorMessage(e), { color: 'error' })
        }
      }
    },
    icon: PowerIcon,
    text: 'Restore Employee',
  }

  const menuItems = [restoreEmployee] // List of available menu items

  return (
    <Table.ActionMenu up={index >= total - upSpace}>
      {/* Render each menu item */}
      {menuItems.map((item, i) => (
        <Table.ActionMenuItem key={i} {...item} />
      ))}
    </Table.ActionMenu>
  )
}

export default ActionMenu
