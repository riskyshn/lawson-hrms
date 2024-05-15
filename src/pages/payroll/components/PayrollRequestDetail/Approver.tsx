import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card, CardBody, CardFooter, Textarea, useToast } from 'jobseeker-ui'
import { payrollService } from '@/services'
import { axiosErrorMessage } from '@/utils'

const Approver: React.FC<{ oid: string }> = ({ oid }) => {
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<'APPROVED' | 'REJECTED'>()
  const [notes, setNotes] = useState('')

  const toast = useToast()
  const navigate = useNavigate()

  const handleSubmit = async (status: 'APPROVED' | 'REJECTED') => {
    setStatus(status)
    setLoading(true)
    try {
      await payrollService.updatePayrollRequestStatus(oid, { notes, status })
      toast(`Successfully ${status.toLowerCase()} request.`)
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
        <Button
          className="w-24"
          color="error"
          disabled={loading}
          loading={loading && status == 'REJECTED'}
          onClick={() => handleSubmit('REJECTED')}
        >
          Reject
        </Button>
        <Button
          className="w-24"
          color="primary"
          disabled={loading}
          loading={loading && status == 'APPROVED'}
          onClick={() => handleSubmit('APPROVED')}
        >
          Approve
        </Button>
      </CardFooter>
    </Card>
  )
}

export default Approver
