import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card, CardFooter, useToast } from '@jshrms/ui'
import { payrollService } from '@/services'
import { axiosErrorMessage } from '@/utils/axios'

const RequestForApproval: React.FC<{ oid: string }> = ({ oid }) => {
  const [loading, setLoading] = useState(false)

  const toast = useToast()
  const navigate = useNavigate()

  const handleSubmit = async () => {
    setLoading(true)
    try {
      await payrollService.requestForApproval(oid)
      toast(`Successfully Request For Approval.`)
      navigate('/payroll/payroll-request')
    } catch (e) {
      toast(axiosErrorMessage(e), { color: 'error' })
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardFooter>
        <Button color="primary" disabled={loading} loading={loading} onClick={handleSubmit}>
          Request For Approval
        </Button>
      </CardFooter>
    </Card>
  )
}

export default RequestForApproval
