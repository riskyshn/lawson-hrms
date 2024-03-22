import React from 'react'
import * as Table from '@/components/Elements/MainTable'
import { employeeService } from '@/services'
import { axiosErrorMessage } from '@/utils/axios'
import { useConfirm, useToast } from 'jobseeker-ui'
import { PowerIcon } from 'lucide-react'

// Define the props for the ActionMenu component
type ActionMenuProps = {
  item: IPreviousEmployee // Assuming IPreviousEmployee is defined elsewhere
  index: number
  total: number
  upSpace: number
  onRestored?: () => void // Optional callback function when employee is restored
}

// ActionMenu component for handling actions on each employee item
const ActionMenu: React.FC<ActionMenuProps> = ({ item, index, total, upSpace, onRestored }) => {
  const confirm = useConfirm() // Hook for displaying confirmation dialogs
  const toast = useToast() // Hook for displaying toast messages

  // Action to restore an employee
  const restoreEmployee: Table.ActionMenuItemProps = {
    text: 'Restore Employee',
    icon: PowerIcon,
    action: async () => {
      const confirmed = await confirm({
        text: 'Are you sure you want to restore this employee?', // Confirmation message
        confirmBtnColor: 'error', // Color for the confirmation button
        cancelBtnColor: 'primary', // Color for the cancel button
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
