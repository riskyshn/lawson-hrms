import Container from '@/components/Elements/Layout/Container'
import MainCard from '@/components/Elements/Layout/MainCard'
import MainCardHeader from '@/components/Elements/Layout/MainCardHeader'
import PageHeader from '@/components/Elements/Layout/PageHeader'
import useAsyncSearch from '@/hooks/use-async-search'
import usePagination from '@/hooks/use-pagination'
import { payrollService } from '@/services'
import { useSearchParams } from 'react-router-dom'
import Table from './components/Table'

const PayrollRequestPage: React.FC = () => {
  const [searchParams, setSearchParam] = useSearchParams()

  const search = searchParams.get('search')

  const { pageData, isLoading, onRefresh } = useAsyncSearch(
    payrollService.fetchPayrollRequests,
    { limit: 20, statusRunner: 'COMPLETED' },
    search,
  )

  const pagination = usePagination({
    pathname: '/payroll/payroll-request',
    totalPage: pageData?.totalPages,
    params: { search },
  })

  return (
    <>
      <PageHeader
        breadcrumb={[{ text: 'Payroll' }, { text: 'Payroll Requests' }]}
        title="Payroll Requests"
        subtitle="Manage and view all payroll requests"
      />

      <Container className="relative flex flex-col gap-3 py-3 xl:pb-8">
        <MainCard
          header={
            <MainCardHeader
              title="Payroll Request List"
              subtitleLoading={typeof pageData?.totalElements !== 'number'}
              subtitle={
                <>
                  You have{' '}
                  <span className="text-primary-600">
                    {pageData?.totalElements || 0} Payroll Request
                    {pageData?.totalElements !== 1 ? 's' : ''}
                  </span>{' '}
                  in total
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
              onRefresh={onRefresh}
            />
          }
          body={<Table items={pageData?.content || []} loading={isLoading} onRefresh={onRefresh} />}
          footer={pagination.render()}
        />
      </Container>
    </>
  )
}

export default PayrollRequestPage
