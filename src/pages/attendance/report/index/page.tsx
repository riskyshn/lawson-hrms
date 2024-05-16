import type { IDataTableEmployee, IPaginationResponse } from '@/types'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Container, MainCard, MainCardHeader, PageHeader } from 'jobseeker-ui'
import { usePagination } from '@/hooks'
import { employeeService } from '@/services'
import Table from '../components/Table'

export const Component: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [searchParams, setSearchParam] = useSearchParams()
  const search = searchParams.get('search') || undefined

  const [pageData, setPageData] = useState<IPaginationResponse<IDataTableEmployee>>()
  const [pageError, setPageError] = useState<any>()

  const pagination = usePagination({
    params: { search },
    pathname: '/attendance/report',
    totalPage: pageData?.totalPages || 0,
  })

  useEffect(() => {
    setIsLoading(true)
    const loadEmployees = async () => {
      try {
        const response = await employeeService.fetchEmployees({
          limit: 20,
          page: pagination.currentPage,
          q: search,
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
      <PageHeader breadcrumb={[{ text: 'Attendance' }, { text: 'Report' }]} subtitle="Manage Your Team Report" title="Report" />

      <Container className="relative flex flex-col gap-3 py-3 xl:pb-8">
        <MainCard
          body={<Table items={pageData?.content || []} loading={isLoading} />}
          footer={pagination.render()}
          header={() => (
            <MainCardHeader
              search={{
                setValue: (v) => setSearchParam({ search: v }),
                value: search || '',
              }}
              subtitle={
                <>
                  You have <span className="text-primary-600">{pageData?.totalElements} Attendance</span> in total
                </>
              }
              subtitleLoading={typeof pageData?.totalElements !== 'number'}
              title="Request List"
            />
          )}
        />
      </Container>
    </>
  )
}

Component.displayName = 'ReportPage'
