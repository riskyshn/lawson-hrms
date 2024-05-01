import Container from '@/components/Elements/Layout/Container'
import PageHeader from '@/components/Elements/Layout/PageHeader'
import PreviewVacancy from '@/components/Modules/Job/PreviewVacancy'
import { employeeService, vacancyService } from '@/services'
import { useAuthStore } from '@/store'
import { axiosErrorMessage } from '@/utils/axios'
import { yupResolver } from '@hookform/resolvers/yup'
import { Alert, Button, Card, CardBody, CardFooter, Skeleton, Textarea, useToast } from 'jobseeker-ui'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import * as yup from 'yup'

import useVacancyPage from '../../hooks/use-vacancy-page'

const schema = yup.object().shape({
  notes: yup.string().required().label('Notes'),
})

export const Component: React.FC = () => {
  const { isLoading, vacancy } = useVacancyPage()
  const [loading, setLoading] = useState(false)
  const [employee, setEmployee] = useState<IEmployee>()
  const [pageError, setPageError] = useState<any>()
  const toast = useToast()
  const navigate = useNavigate()
  const { user } = useAuthStore()

  const isAdmin = true // hard code is have permission to approve requisition.
  const queuedEmployee = vacancy?.approvals?.users?.find((el) => el.flag === 0)

  useEffect(() => {
    if (!isAdmin || !queuedEmployee || queuedEmployee.oid === user?.employee?.oid) return

    const load = async () => {
      try {
        const employee = await employeeService.fetchEmployee(queuedEmployee?.oid)
        setEmployee(employee)
      } catch (e) {
        setPageError(axiosErrorMessage(e))
      }
    }

    load()
  }, [isAdmin, queuedEmployee, user?.employee?.oid])

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = (flag: number, oid: string) =>
    handleSubmit(async (data) => {
      if (!vacancy) return
      try {
        setLoading(true)
        vacancyService.approveRequisition(vacancy.oid, {
          approvalId: oid,
          flag,
          notes: data.notes,
        })
        toast(`Success fully ${flag === 1 ? 'Approve' : 'Reject'} this requisition.`, { color: 'success' })
        navigate('/job/requisition')
      } catch (error: any) {
        toast(axiosErrorMessage(error), { color: 'error' })
      } finally {
        setLoading(false)
      }
    })

  if (pageError) throw pageError

  return (
    <>
      <PageHeader
        actions={
          <Button as={Link} color="error" to="/job/requisition" variant="light">
            Cancel
          </Button>
        }
        breadcrumb={[{ text: 'Job' }, { text: 'Requisition' }, { text: 'Preview Requisition' }]}
        title="Preview Job Requisition"
      />
      <Container className="flex flex-col gap-3 py-3 xl:pb-8">
        <PreviewVacancy isLoading={isLoading} vacancy={vacancy} />

        {vacancy?.status !== 'canceled' && queuedEmployee && (isAdmin || queuedEmployee.oid === user?.employee?.oid) && (
          <Card>
            <CardBody>
              {queuedEmployee.oid !== user?.employee?.oid && (
                <>
                  {employee ? (
                    <Alert className="mb-3 text-center" color="warning">
                      You will represent "<strong>{employee.name}</strong>" to accept or reject this requisition.
                    </Alert>
                  ) : (
                    <Skeleton className="mb-3 h-12" />
                  )}
                </>
              )}
              <Textarea error={errors.notes?.message} label="Notes" placeholder="Add Your Notes Here" {...register('notes')} />
            </CardBody>

            <CardFooter className="gap-3">
              <Button className="w-32" color="error" disabled={loading} onClick={() => onSubmit(2, queuedEmployee.oid)()} type="button">
                Reject
              </Button>
              <Button className="w-32" color="primary" disabled={loading} onClick={() => onSubmit(1, queuedEmployee.oid)()} type="button">
                Approve
              </Button>
            </CardFooter>
          </Card>
        )}
      </Container>
    </>
  )
}

Component.displayName = 'DetailJobRequisitionPage'
