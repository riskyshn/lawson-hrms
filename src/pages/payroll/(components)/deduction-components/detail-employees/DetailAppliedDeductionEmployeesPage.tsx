import { useParams, useSearchParams } from 'react-router-dom'
import { Container, MainCard, MainCardHeader, PageHeader } from 'jobseeker-ui'
import { useAsyncSearch, usePagination } from '@/hooks'
import { employeeService } from '@/services'
import Table from '../../components/DetailEmployees/Table'

const DetailAppliedDeductionEmployeesPage: React.FC = () => {
  const { componentId } = useParams()
  const [searchParams, setSearchParam] = useSearchParams()

  const search = searchParams.get('search')
  const { isLoading, onRefresh, pageData } = useAsyncSearch(employeeService.fetchPreviousEmployees, { limit: 20 }, search)

  const pagination = usePagination({
    params: { search },
    pathname: `/payroll/deduction-components/${componentId}/employees`,
    totalPage: pageData?.totalPages,
  })

  return (
    <>
      <PageHeader
        breadcrumb={[{ text: 'Payroll' }, { text: 'Deduction Components' }, { text: 'Employees have Deduction' }]}
        title="Employees have Deduction"
      />

      <Container className="relative flex flex-col gap-3 py-3 xl:pb-8">
        <MainCard
          body={<Table items={(pageData?.content as any) || []} loading={isLoading} onRefresh={onRefresh} />}
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

export default DetailAppliedDeductionEmployeesPage
