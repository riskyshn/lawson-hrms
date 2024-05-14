import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Card, CardBody, CardFooter, Textarea, useToast } from '@jshrms/ui'
import * as yup from 'yup'
import PreviewVacancy from '@/components/Modules/Job/PreviewVacancy'
import useAsyncAction from '@/core/hooks/use-async-action'
import { vacancyService } from '@/services'
import { axiosErrorMessage } from '@/utils/axios'
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

  if (!token || !vacancyId || !approvalId) throw { hideLayout: true, message: 'This page url is invalid.', status: 419 }

  const [vacancy, isLoading, refresh] = useAsyncAction(vacancyService.fetchVacancyDetail, vacancyId, {
    headers: { Authorization: `Bearer ${token}` },
  })

  const {
    formState: { errors },
    handleSubmit,
    register,
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
      <PageHeader subTitle="Preview Job Requisition is a summary of the proposed position and qualifications needed for recruitment. You play a crucial role in giving approval to kickstart this process. Let's find the best talent together!">
        Preview Job Requisition
      </PageHeader>

      <div className="container mx-auto flex flex-col gap-3 p-3">
        <PreviewVacancy isLoading={isLoading} vacancy={vacancy} />

        {!isLoading && vacancy?.status !== 'canceled' && isNotApproved && (
          <Card>
            <CardBody>
              <Textarea error={errors.notes?.message} label="Notes" placeholder="Add Your Notes Here" {...register('notes')} />
            </CardBody>

            <CardFooter className="gap-3">
              <Button className="w-32" color="error" disabled={isFormLoading} onClick={() => onSubmit(2)()} type="button">
                Reject
              </Button>
              <Button className="w-32" color="primary" disabled={isFormLoading} onClick={() => onSubmit(1)()} type="button">
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
