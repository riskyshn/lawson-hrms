import Container from '@/components/Elements/Container'
import MainCard from '@/components/Elements/MainCard'
import MainCardHeader from '@/components/Elements/MainCardHeader'
import PageHeader from '@/components/Elements/PageHeader'
import useAsyncSearch from '@/hooks/use-async-search'
import usePagination from '@/hooks/use-pagination'
import { employeeService } from '@/services'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Table from './components/Table'

const PreviousEmployeePage: React.FC = () => {
  const [searchParams, setSearchParam] = useSearchParams()

  const search = searchParams.get('search') || undefined
  const page = searchParams.get('page') || undefined

  const [refresh, setRefresh] = useState(false)

  const { pageData, isLoading } = useAsyncSearch<IPreviousEmployee>({
    action: employeeService.fetchPreviousEmployees,
    params: { limit: 20, page },
    input: search || '',
    refresh,
  })

  const pagination = usePagination({
    pathname: '/employees/previous-employee',
    totalPage: pageData?.totalPages || 0,
    params: { search },
  })

  return (
    <>
      <PageHeader breadcrumb={[{ text: 'Employee' }, { text: 'Previous Employee' }]} title="Previous Employee" />

      <Container className="relative flex flex-col gap-3 py-3 xl:pb-8">
        <MainCard
          header={
            <MainCardHeader
              title="Employee List"
              subtitleLoading={typeof pageData?.totalElements !== 'number'}
              subtitle={
                <>
                  You have <span className="text-primary-600">{pageData?.totalElements} Employee</span> in total
                </>
              }
              search={{
                value: search || '',
                setValue: (e) => {
                  searchParams.set('search', e)
                  searchParams.delete('page')
                  setSearchParam(searchParams)
                },
              }}
            />
          }
          body={<Table items={pageData?.content || []} loading={isLoading} onRestored={() => setRefresh((v) => !v)} />}
          footer={pagination.render()}
        />
      </Container>
    </>
  )
}

export default PreviousEmployeePage
