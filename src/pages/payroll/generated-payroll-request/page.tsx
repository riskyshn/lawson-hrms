import { Link, useSearchParams } from 'react-router-dom'
import { Button, Container, MainCard, MainCardHeader, PageHeader } from 'jobseeker-ui'
import { useAsyncSearch, usePagination } from '@/hooks'
import { payrollService } from '@/services'
import Table from './components/Table'

export const Component: React.FC = () => {
  const [searchParams, setSearchParam] = useSearchParams()

  const search = searchParams.get('search')
  const { isLoading, onRefresh, pageData } = useAsyncSearch(payrollService.fetchPayrollRequests, { limit: 20 }, search)

  const pagination = usePagination({
    params: { search },
    pathname: '/payroll/generated-payroll-request',
    totalPage: pageData?.totalPages,
  })

  return (
    <>
      <PageHeader
        actions={
          <Button as={Link} color="primary" to="/payroll/run-payroll-request">
            Run Payroll
          </Button>
        }
        breadcrumb={[{ text: 'Payroll' }, { text: 'Generated Payroll Requests' }]}
        subtitle="Manage and view all generated payroll requests"
        title="Generated Payroll Requests"
      />

      <Container className="relative flex flex-col gap-3 py-3 xl:pb-8">
        <MainCard
          body={<Table items={pageData?.content || []} loading={isLoading} onRefresh={onRefresh} />}
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
                  You have{' '}
                  <span className="text-primary-600">
                    {pageData?.totalElements || 0} Generated Payroll Request
                    {pageData?.totalElements !== 1 ? 's' : ''}
                  </span>{' '}
                  in total
                </>
              }
              subtitleLoading={typeof pageData?.totalElements !== 'number'}
              title="Generated Payroll Request List"
            />
          }
        />
      </Container>
    </>
  )
}

Component.displayName = 'GeneratedPayrollRequestPage'
