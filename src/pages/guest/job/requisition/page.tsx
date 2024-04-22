import PreviewVacancy from '@/components/Modules/Job/PreviewVacancy'
import { vacancyService } from '@/services'
import { axiosErrorMessage } from '@/utils/axios'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Card, CardBody, CardFooter, Textarea, useToast } from 'jobseeker-ui'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'
import * as yup from 'yup'
import PageHeader from '../../components/PageHeader'

const schema = yup.object().shape({
  notes: yup.string().required().label('Notes'),
})

export const Component: React.FC = () => {
  const [searchParams] = useSearchParams()

  const token = searchParams.get('token') || ''
  const vacancyId = searchParams.get('vacancy') || ''
  const approvalId = searchParams.get('approval') || ''
  const [isLoading, setIsLoading] = useState(true)
  const [isFormLoading, setIsFormLoading] = useState(false)
  const [pageError, setPageError] = useState<any>()
  const [vacancy, setVacancy] = useState<IVacancy>()

  const toast = useToast()
  const navigate = useNavigate()

  if (!token || !vacancyId || !approvalId) throw { status: 419, hideLayout: true, message: 'This page url is invalid.' }
  if (pageError) throw pageError

  useEffect(() => {
    const load = async (vacancyId: string) => {
      setPageError(undefined)
      setIsLoading(true)
      try {
        const vacancy = await vacancyService.fetchVacancyDetail(vacancyId, { headers: { Authorization: `Bearer ${token}` } })
        setVacancy(vacancy)
        setIsLoading(false)
      } catch (e: any) {
        setPageError(e)
      }
    }

    load(vacancyId)
  }, [vacancyId, navigate, token])

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
        setIsFormLoading(true)
        vacancyService.approveRequisition(
          vacancyId,
          {
            approvalId: approvalId,
            flag,
            notes: data.notes,
          },
          { headers: { Authorization: `Bearer ${token}` } },
        )
        toast(`Success fully ${flag === 1 ? 'Approve' : 'Reject'} this requisition.`, { color: 'success' })
      } catch (error: any) {
        toast(axiosErrorMessage(error), { color: 'error' })
      } finally {
        setIsFormLoading(false)
      }
    })

  return (
    <>
      <PageHeader>Preview Job Requisition</PageHeader>

      <div className="container mx-auto flex flex-col gap-3 p-3">
        <PreviewVacancy vacancy={vacancy} isLoading={isLoading} />

        {vacancy?.status !== 'canceled' && (
          <Card>
            <CardBody>
              <Textarea label="Notes" placeholder="Add Your Notes Here" error={errors.notes?.message} {...register('notes')} />
            </CardBody>

            <CardFooter className="gap-3">
              <Button type="button" color="error" className="w-32" onClick={() => onSubmit(2)()} disabled={isFormLoading}>
                Reject
              </Button>
              <Button type="button" color="primary" className="w-32" onClick={() => onSubmit(1)()} disabled={isFormLoading}>
                Approve
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </>
  )
}

Component.displayName = 'GuestJobRequisitionPage'
