import Container from '@/components/Elements/Layout/Container'
import MainCard from '@/components/Elements/Layout/MainCard'
import MainCardHeader from '@/components/Elements/Layout/MainCardHeader'
import PageHeader from '@/components/Elements/Layout/PageHeader'
import usePagination from '@/core/hooks/use-pagination'
import { attendanceService } from '@/services'
import { Button } from 'jobseeker-ui'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
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
    pathname: '/attendance/schedule',
    totalPage: pageData?.totalPages,
    params: { search },
  })

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    const load = async (signal: AbortSignal) => {
      setIsLoading(true)
      try {
        const data = await attendanceService.fetchSchedules(
          {
            q: search,
            page: pagination.currentPage,
            limit: 20,
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
        breadcrumb={[{ text: 'Attendance' }, { text: 'Schedule' }]}
        title="Schedule"
        subtitle="Manage Your Team Schedule"
        actions={
          <Button onClick={() => setShowCreateModal(true)} color="primary" className="ml-3">
            Add New Schedule
          </Button>
        }
      />

      <CreateScheduleModal show={showCreateModal} onApplyVacancy={setOnChangeData} onClose={() => setShowCreateModal(false)} />

      <Container className="relative flex flex-col gap-3 py-3 xl:pb-8">
        <MainCard
          header={() => (
            <MainCardHeader
              title="Schedule List"
              subtitleLoading={typeof pageData?.totalElements !== 'number'}
              subtitle={
                <>
                  You have <span className="text-primary-600">{pageData?.totalElements} Schedule</span> in total
                </>
              }
              search={{
                value: search || '',
                setValue: (v) => setSearchParam({ search: v }),
              }}
            />
          )}
          body={<Table items={pageData?.content || []} loading={isLoading} onDataChange={setOnChangeData} />}
          footer={pagination.render()}
        />
      </Container>
    </>
  )
}

export default SchedulePage
