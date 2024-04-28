import PreviewVacancy from '@/components/Modules/Job/PreviewVacancy'
import useAsyncAction from '@/core/hooks/use-async-action'
import { vacancyService } from '@/services'
import { axiosErrorMessage } from '@/utils/axios'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Card, CardBody, CardFooter, Textarea, useToast } from 'jobseeker-ui'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import * as yup from 'yup'
import PageHeader from '../../components/PageHeader'

const schema = yup.object().shape({
  notes: yup.string().label('Notes'),
})

export const Component: React.FC = () => {
  const [searchParams] = useSearchParams()

  const token = searchParams.get('token') || ''
  const vacancyId = searchParams.get('vacancy') || ''
  const approvalId = searchParams.get('approval') || ''
  const [isFormLoading, setIsFormLoading] = useState(false)

  const toast = useToast()

  if (!token || !vacancyId || !approvalId) throw { status: 419, hideLayout: true, message: 'This page url is invalid.' }

  const [vacancy, isLoading, refresh] = useAsyncAction(vacancyService.fetchVacancyDetail, vacancyId, {
    headers: { Authorization: `Bearer ${token}` },
  })

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
        await vacancyService.approveRequisition(
          vacancyId,
          {
            approvalId: approvalId,
            flag,
            notes: data.notes,
          },
          { headers: { Authorization: `Bearer ${token}` } },
        )
        refresh()
        toast(`Success fully ${flag === 1 ? 'Approve' : 'Reject'} this requisition.`, { color: 'success' })
      } catch (e) {
        toast(axiosErrorMessage(e), { color: 'error' })
      } finally {
        setIsFormLoading(false)
      }
    })

  const isNotApproved = vacancy?.approvals?.users?.find((el) => el.oid === approvalId)?.flag === 0

  return (
    <>
      <PageHeader subTitle={vacancy?.vacancyName}>Preview Job Requisition</PageHeader>

      <div className="container mx-auto flex flex-col gap-3 p-3">
        <PreviewVacancy vacancy={vacancy} isLoading={isLoading} />

        {!isLoading && vacancy?.status !== 'canceled' && isNotApproved && (
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
