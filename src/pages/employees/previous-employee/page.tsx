import Container from '@/components/Elements/Layout/Container'
import MainCard from '@/components/Elements/Layout/MainCard'
import MainCardHeader from '@/components/Elements/Layout/MainCardHeader'
import PageHeader from '@/components/Elements/Layout/PageHeader'
import useAsyncSearch from '@/core/hooks/use-async-search'
import usePagination from '@/core/hooks/use-pagination'
import { employeeService } from '@/services'
import {} from 'jobseeker-ui'
import { useSearchParams } from 'react-router-dom'

import Table from './components/Table'

export const Component: React.FC = () => {
  const [searchParams, setSearchParam] = useSearchParams()

  const search = searchParams.get('search')

  const { isLoading, onRefresh, pageData } = useAsyncSearch(employeeService.fetchPreviousEmployees, { limit: 20 }, search)

  const pagination = usePagination({
    params: { search },
    pathname: '/employees/previous-employee',
    totalPage: pageData?.totalPages,
  })

  return (
    <>
      <PageHeader breadcrumb={[{ text: 'Employee' }, { text: 'Previous Employee' }]} title="Previous Employee" />

      <Container className="relative flex flex-col gap-3 py-3 xl:pb-8">
        <MainCard
          body={<Table items={pageData?.content || []} loading={isLoading} onRestored={onRefresh} />}
          footer={pagination.render()}
          header={
            <MainCardHeader
              onRefresh={onRefresh}
              search={{
                setValue: (e) => {
                  searchParams.set('search', e)
                  searchParams.delete('page')
                  setSearchParam(searchParams)
                },
                value: search || '',
              }}
              subtitle={
                <>
                  You have <span className="text-primary-600">{pageData?.totalElements} Employee</span> in total
                </>
              }
              subtitleLoading={typeof pageData?.totalElements !== 'number'}
              title="Employee List"
            />
          }
        />
      </Container>
    </>
  )
}

Component.displayName = 'PreviousEmployeePage'
