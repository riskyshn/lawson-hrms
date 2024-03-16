import Container from '@/components/Elements/Container'
import ErrorScreen from '@/components/Elements/ErrorScreen'
import PageHeader from '@/components/Elements/PageHeader'
import { vacancyService } from '@/services'
import { axiosErrorMessage } from '@/utils/axios'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Card, CardBody, CardFooter, Textarea, useToast } from 'jobseeker-ui'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import * as yup from 'yup'
import PreviewVacancy from '../../components/PreviewVacancy'
import useVacancyPage from '../../hooks/use-vacancy-page'

const schema = yup.object().shape({
  notes: yup.string().required().label('Notes'),
})

const DetailJobRequisitionPage: React.FC = () => {
  const { vacancy, isLoading, pageError } = useVacancyPage()
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = (flag: number) =>
    handleSubmit(async (data) => {
      if (!vacancy) return
      try {
        setLoading(true)
        vacancyService.approveRequisition(vacancy.id, {
          approvalId: '65effbbb2b046273e0abd77f',
          flag,
          notes: data.notes,
        })
        toast(`Success fully ${flag === 1 ? 'Approve' : 'Reject'} this requisition.`, { color: 'success', position: 'top-right' })
      } catch (error: any) {
        toast(axiosErrorMessage(error), { color: 'error', position: 'top-right' })
      } finally {
        setLoading(false)
      }
    })

  if (pageError) return <ErrorScreen {...pageError} />
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

        <Card>
          <CardBody>
            <Textarea label="Notes" placeholder="Add Your Notes Here" error={errors.notes?.message} {...register('notes')} />
          </CardBody>

          <CardFooter className="gap-3">
            <Button type="button" color="error" className="w-32" onClick={() => onSubmit(2)()} disabled={loading}>
              Reject
            </Button>
            <Button type="button" color="primary" className="w-32" onClick={() => onSubmit(1)()} disabled={loading}>
              Approve
            </Button>
          </CardFooter>
        </Card>
      </Container>
    </>
  )
}

export default DetailJobRequisitionPage
