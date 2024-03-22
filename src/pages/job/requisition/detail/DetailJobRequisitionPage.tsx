import Container from '@/components/Elements/Container'
import PageHeader from '@/components/Elements/PageHeader'
import { employeeService, vacancyService } from '@/services'
import { useAuthStore } from '@/store'
import { axiosErrorMessage } from '@/utils/axios'
import { yupResolver } from '@hookform/resolvers/yup'
import { Alert, Button, Card, CardBody, CardFooter, Skeleton, Textarea, useToast } from 'jobseeker-ui'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import PreviewVacancy from '../../components/PreviewVacancy'
import useVacancyPage from '../../hooks/use-vacancy-page'

const schema = yup.object().shape({
  notes: yup.string().required().label('Notes'),
})

const DetailJobRequisitionPage: React.FC = () => {
  const { vacancy, isLoading } = useVacancyPage()
  const [loading, setLoading] = useState(false)
  const [employee, setEmployee] = useState<IEmployee>()
  const [pageError, setPageError] = useState<any>()
  const toast = useToast()
  const navigate = useNavigate()
  const { user } = useAuthStore()

  const isAdmin = true // hard code is have permission to approve requisition.
  const queuedEmployee = vacancy?.approvals?.users?.find((el) => el.flag === 0)

  useEffect(() => {
    if (!isAdmin || !queuedEmployee || queuedEmployee.id === user?.employee?.oid) return

    const load = async () => {
      try {
        const employee = await employeeService.fetchEmployee(queuedEmployee?.id)
        setEmployee(employee)
      } catch (e) {
        setPageError(axiosErrorMessage(e))
      }
    }

    load()
  }, [isAdmin, queuedEmployee, user?.employee?.oid])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = (flag: number, oid: string) =>
    handleSubmit(async (data) => {
      if (!vacancy) return
      try {
        setLoading(true)
        vacancyService.approveRequisition(vacancy.id, {
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
        breadcrumb={[{ text: 'Job' }, { text: 'Requisition' }, { text: 'Preview Requisition' }]}
        title="Preview Job Requisition"
        actions={
          <Button as={Link} to="/job/requisition" variant="light" color="error">
            Cancel
          </Button>
        }
      />
      <Container className="flex flex-col gap-3 py-3 xl:pb-8">
        <PreviewVacancy vacancy={vacancy} isLoading={isLoading} />

        {queuedEmployee && (isAdmin || queuedEmployee.id === user?.employee?.oid) && (
          <Card>
            <CardBody>
              {queuedEmployee.id !== user?.employee?.oid && (
                <>
                  {employee ? (
                    <Alert color="warning" className="mb-3 text-center">
                      You will represent "<strong>{employee.name}</strong>" to accept or reject this requisition.
                    </Alert>
                  ) : (
                    <Skeleton className="mb-3 h-12" />
                  )}
                </>
              )}
              <Textarea label="Notes" placeholder="Add Your Notes Here" error={errors.notes?.message} {...register('notes')} />
            </CardBody>

            <CardFooter className="gap-3">
              <Button type="button" color="error" className="w-32" onClick={() => onSubmit(2, queuedEmployee.id)()} disabled={loading}>
                Reject
              </Button>
              <Button type="button" color="primary" className="w-32" onClick={() => onSubmit(1, queuedEmployee.id)()} disabled={loading}>
                Approve
              </Button>
            </CardFooter>
          </Card>
        )}
      </Container>
    </>
  )
}

export default DetailJobRequisitionPage
