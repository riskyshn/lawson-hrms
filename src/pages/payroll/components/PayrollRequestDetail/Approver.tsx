import { payrollService } from '@/services'
import { axiosErrorMessage } from '@/utils/axios'
import { Button, Card, CardBody, CardFooter, Textarea, useToast } from 'jobseeker-ui'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

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
      await payrollService.updatePayrollRequestStatus(oid, { status, notes })
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
        <Textarea label="Notes" value={notes} onChange={(e) => setNotes(e.currentTarget.value)} />
      </CardBody>
      <CardFooter>
        <Button
          color="error"
          className="w-24"
          disabled={loading}
          loading={loading && status == 'REJECTED'}
          onClick={() => handleSubmit('REJECTED')}
        >
          Reject
        </Button>
        <Button
          color="primary"
          className="w-24"
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
