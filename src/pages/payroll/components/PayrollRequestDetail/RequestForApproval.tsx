import { payrollService } from '@/services'
import { axiosErrorMessage } from '@/utils/axios'
import { Button, Card, CardBody, CardFooter, Textarea, useToast } from 'jobseeker-ui'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const RequestForApproval: React.FC<{ oid: string }> = ({ oid }) => {
  const [loading, setLoading] = useState(false)
  const [notes, setNotes] = useState('')

  const toast = useToast()
  const navigate = useNavigate()

  const handleSubmit = async () => {
    setLoading(true)
    try {
      await payrollService.updatePayrollRequestStatus(oid, { notes, status: 'request-for-approval' })
      toast(`Successfully Request For Approval.`)
      navigate('/payroll/payroll-request')
    } catch (e) {
      toast(axiosErrorMessage(e), { color: 'error' })
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardBody>
        <Textarea label="Notes" onChange={(e) => setNotes(e.currentTarget.value)} value={notes} />
      </CardBody>
      <CardFooter>
        <Button color="primary" disabled={loading} loading={loading} onClick={handleSubmit}>
          Request For Approval
        </Button>
      </CardFooter>
    </Card>
  )
}

export default RequestForApproval
