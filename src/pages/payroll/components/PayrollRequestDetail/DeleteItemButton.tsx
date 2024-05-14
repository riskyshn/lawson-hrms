import React, { useState } from 'react'
import { payrollService } from '@jshrms/shared/services'
import { axiosErrorMessage } from '@jshrms/shared/utils'
import { Button, ButtonProps, useConfirm, useToast } from '@jshrms/ui'

const DeleteItemButton: React.FC<{ oid: string; onRefresh?: () => void } & ButtonProps> = ({ oid, onRefresh, ...props }) => {
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

  return <Button {...props} disabled={loading} loading={loading} onClick={handleDelete} type="button" />
}

export default DeleteItemButton
