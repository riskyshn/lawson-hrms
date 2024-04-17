import Container from '@/components/Elements/Layout/Container'
import MainCard from '@/components/Elements/Layout/MainCard'
import MainCardHeader from '@/components/Elements/Layout/MainCardHeader'
import PageHeader from '@/components/Elements/Layout/PageHeader'
import { useSearchParams } from 'react-router-dom'
import Table from '../components/Table'
import { useEffect, useState } from 'react'
import { employeeService } from '@/services'
import usePagination from '@/hooks/use-pagination'

const ReportPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [searchParams, setSearchParam] = useSearchParams()
  const search = searchParams.get('search') || undefined

  const [pageData, setPageData] = useState<IPaginationResponse<IDataTableEmployee>>()
  const [pageError, setPageError] = useState<any>()

  const pagination = usePagination({
    pathname: '/attendance/report/',
    totalPage: pageData?.totalPages || 0,
    params: { search },
  })

  useEffect(() => {
    setIsLoading(true)
    const loadEmployees = async () => {
      try {
        const response = await employeeService.fetchEmployees({
          q: search,
          page: pagination.currentPage,
          limit: 20,
        })
        setPageData(response)
        setIsLoading(false)
      } catch (e) {
        setIsLoading(false)
        setPageError(e)
      }
    }

    loadEmployees()
  }, [search, pagination.currentPage])

  if (pageError) throw pageError

  return (
    <>
      <PageHeader breadcrumb={[{ text: 'Attendance' }, { text: 'Report' }]} title="Report" subtitle="Manage Your Team Report" />

      <Container className="relative flex flex-col gap-3 py-3 xl:pb-8">
        <MainCard
          header={() => (
            <MainCardHeader
              title="Request List"
              subtitleLoading={typeof pageData?.totalElements !== 'number'}
              subtitle={
                <>
                  You have <span className="text-primary-600">{pageData?.totalElements} Attendance</span> in total
                </>
              }
              search={{
                value: search || '',
                setValue: (v) => setSearchParam({ search: v }),
              }}
            />
          )}
          body={<Table items={pageData?.content || []} loading={isLoading} />}
          footer={[]}
        />
      </Container>
    </>
  )
}

export default ReportPage
