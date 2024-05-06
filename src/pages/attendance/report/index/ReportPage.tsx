import Container from '@/components/Elements/Layout/Container'
import MainCard from '@/components/Elements/Layout/MainCard'
import MainCardHeader from '@/components/Elements/Layout/MainCardHeader'
import PageHeader from '@/components/Elements/Layout/PageHeader'
import usePagination from '@/core/hooks/use-pagination'
import { employeeService } from '@/services'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import Table from '../components/Table'

const ReportPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [searchParams, setSearchParam] = useSearchParams()
  const search = searchParams.get('search') || undefined

  const [pageData, setPageData] = useState<IPaginationResponse<IDataTableEmployee>>()
  const [pageError, setPageError] = useState<any>()

  const pagination = usePagination({
    params: { search },
    pathname: '/attendance/report/',
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

export default ReportPage
