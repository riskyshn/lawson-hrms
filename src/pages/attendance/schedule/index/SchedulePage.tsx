import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Button } from 'jobseeker-ui'
import Container from '@/components/Elements/Layout/Container'
import MainCard from '@/components/Elements/Layout/MainCard'
import MainCardHeader from '@/components/Elements/Layout/MainCardHeader'
import PageHeader from '@/components/Elements/Layout/PageHeader'
import usePagination from '@/core/hooks/use-pagination'
import { attendanceService } from '@/services'
import CreateScheduleModal from '../components/CreateScheduleModal'
import Table from '../components/Table'

const SchedulePage: React.FC = () => {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [searchParams, setSearchParam] = useSearchParams()
  const search = searchParams.get('search') || undefined
  const [onChangeData, setOnChangeData] = useState<string>()
  const [pageData, setPageData] = useState<IPaginationResponse<ISchedule>>()
  const [pageError, setPageError] = useState<any>()

  const pagination = usePagination({
    params: { search },
    pathname: '/attendance/schedule',
    totalPage: pageData?.totalPages,
  })

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    const load = async (signal: AbortSignal) => {
      setIsLoading(true)
      try {
        const data = await attendanceService.fetchSchedules(
          {
            limit: 20,
            page: pagination.currentPage,
            q: search,
          },
          signal,
        )
        setPageData(data)
        setIsLoading(false)
      } catch (e: any) {
        if (e.message !== 'canceled') setPageError(e)
      }
    }

    load(signal)

    return () => {
      controller.abort()
    }
  }, [search, pagination.currentPage, onChangeData])

  if (pageError) throw pageError

  return (
    <>
      <PageHeader
        actions={
          <Button color="primary" onClick={() => setShowCreateModal(true)}>
            Add New Schedule
          </Button>
        }
        breadcrumb={[{ text: 'Attendance' }, { text: 'Schedule' }]}
        subtitle="Manage Your Team Schedule"
        title="Schedule"
      />

      <CreateScheduleModal onApplyVacancy={setOnChangeData} onClose={() => setShowCreateModal(false)} show={showCreateModal} />

      <Container className="relative flex flex-col gap-3 py-3 xl:pb-8">
        <MainCard
          body={<Table items={pageData?.content || []} loading={isLoading} onDataChange={setOnChangeData} />}
          footer={pagination.render()}
          header={() => (
            <MainCardHeader
              search={{
                setValue: (v) => setSearchParam({ search: v }),
                value: search || '',
              }}
              subtitle={
                <>
                  You have <span className="text-primary-600">{pageData?.totalElements} Schedule</span> in total
                </>
              }
              subtitleLoading={typeof pageData?.totalElements !== 'number'}
              title="Schedule List"
            />
          )}
        />
      </Container>
    </>
  )
}

export default SchedulePage
