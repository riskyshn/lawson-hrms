import { payrollService } from '@/services'
import { axiosErrorMessage } from '@/utils/axios'
import { Button, ButtonProps, useConfirm, useToast } from 'jobseeker-ui'
import React, { useState } from 'react'

const DeleteItemButton: React.FC<ButtonProps & { oid: string; onRefresh?: () => void }> = ({ oid, onRefresh, ...props }) => {
  const [loading, setLoading] = useState(false)
  const confirm = useConfirm()
  const toast = useToast()

  const handleDelete = async () => {
    const confirmed = await confirm('Are you sure? want to delete this item!')

    if (!confirmed) return

    setLoading(true)
    try {
      await payrollService.deletePayrollRequestDetail(oid)
      toast('Successfully delete item')
      onRefresh?.()
    } catch (e) {
      toast(axiosErrorMessage(e), { color: 'error' })
    }
    setLoading(false)
  }

  return <Button {...props} type="button" disabled={loading} loading={loading} onClick={handleDelete} />
}

export default DeleteItemButton
