import { employeeService } from '@/services'
import { Button, ButtonProps, useConfirm, useToast } from 'jobseeker-ui'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ButtonDeleteEmployee: React.FC<{ oid: string } & ButtonProps> = ({ oid, ...props }) => {
  const confirm = useConfirm()
  const toast = useToast()
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)

  const handleDelete = async () => {
    setIsLoading(true)
    const confirmed = await confirm({
      cancelBtnColor: 'primary',
      confirmBtnColor: 'error',
      text: 'Are you sure you want to delete this Employee?',
    })
    if (confirmed) {
      try {
        await employeeService.deleteEmployee(oid)
        toast('Employee deleted successfully.', { color: 'success' })
        navigate('/employees/employee-management')
      } catch (e: any) {
        toast(e.response?.data?.meta?.message || e.message, { color: 'error' })
      }
    }

    setIsLoading(false)
  }

  return (
    <Button {...props} disabled={isLoading} loading={isLoading} onClick={handleDelete} type="button">
      Delete
    </Button>
  )
}

export default ButtonDeleteEmployee
