import { employeeService } from '@/services'
import { Button, useConfirm, useToast } from 'jobseeker-ui'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ButtonDeleteEmployee: React.FC<{ oid: string }> = ({ oid }) => {
  const confirm = useConfirm()
  const toast = useToast()
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)

  const handleDelete = async () => {
    setIsLoading(true)
    const confirmed = await confirm({
      text: 'Are you sure you want to delete this Employee?',
      confirmBtnColor: 'error',
      cancelBtnColor: 'primary',
    })
    if (confirmed) {
      try {
        await employeeService.deleteEmployee(oid)
        toast('Employee deleted successfully.', { color: 'success', position: 'top-right' })
        navigate('/employees/employee-management')
      } catch (e: any) {
        toast(e.response?.data?.meta?.message || e.message, { color: 'error', position: 'top-right' })
      }
    }

    setIsLoading(false)
  }

  return (
    <Button type="button" variant="light" color="error" disabled={isLoading} loading={isLoading} onClick={handleDelete}>
      Delete
    </Button>
  )
}

export default ButtonDeleteEmployee
