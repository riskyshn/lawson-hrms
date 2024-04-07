import Container from '@/components/Elements/Container'
import MainCard from '@/components/Elements/MainCard'
import MainCardHeader from '@/components/Elements/MainCardHeader'
import PageHeader from '@/components/Elements/PageHeader'
import useAsyncSearch from '@/hooks/use-async-search'
import usePagination from '@/hooks/use-pagination'
import { payrollService } from '@/services'
import { Button } from 'jobseeker-ui'
import { Link, useSearchParams } from 'react-router-dom'
import Table from './components/Table'

const GeneratedPayrollRequestPage: React.FC = () => {
  const [searchParams, setSearchParam] = useSearchParams()

  const search = searchParams.get('search') || undefined
  const page = searchParams.get('page') || undefined

  const { pageData, isLoading, onRefresh } = useAsyncSearch<IPayrollRequest>({
    action: payrollService.fetchPayrollRequests,
    params: { limit: 20, page },
    input: search || '',
  })

  const pagination = usePagination({
    pathname: '/payroll/generated-payroll-request',
    totalPage: pageData?.totalPages || 0,
    params: { search },
  })

  return (
    <>
      <PageHeader
        breadcrumb={[{ text: 'Payroll' }, { text: 'Generated Payroll Requests' }]}
        title="Generated Payroll Requests"
        subtitle="Manage and view all generated payroll requests"
        actions={
          <Button as={Link} to="/payroll/run-payroll-request" color="primary">
            Run Payroll
          </Button>
        }
      />

      <Container className="relative flex flex-col gap-3 py-3 xl:pb-8">
        <MainCard
          header={
            <MainCardHeader
              title="Generated Payroll Request List"
              subtitleLoading={typeof pageData?.totalElements !== 'number'}
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

export default GeneratedPayrollRequestPage