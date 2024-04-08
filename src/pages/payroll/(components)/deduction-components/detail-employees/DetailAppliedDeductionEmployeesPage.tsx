import Container from '@/components/Elements/Container'
import MainCard from '@/components/Elements/MainCard'
import MainCardHeader from '@/components/Elements/MainCardHeader'
import PageHeader from '@/components/Elements/PageHeader'
import useAsyncSearch from '@/hooks/use-async-search'
import usePagination from '@/hooks/use-pagination'
import { employeeService } from '@/services'
import { useParams, useSearchParams } from 'react-router-dom'
import Table from '../../components/DetailEmployees/Table'

const DetailAppliedDeductionEmployeesPage: React.FC = () => {
  const { componentId } = useParams()
  const [searchParams, setSearchParam] = useSearchParams()

  const search = searchParams.get('search') || undefined
  const page = searchParams.get('page') || undefined

  const { pageData, isLoading, onRefresh } = useAsyncSearch<any>({
    action: employeeService.fetchPreviousEmployees,
    params: { limit: 20, page },
    input: search || '',
  })

  const pagination = usePagination({
    pathname: `/payroll/deduction-components/${componentId}/employees`,
    totalPage: pageData?.totalPages || 0,
    params: { search },
  })

  return (
    <>
      <PageHeader
        breadcrumb={[{ text: 'Payroll' }, { text: 'Deduction Components' }, { text: 'Employees have Deduction' }]}
        title="Employees have Deduction"
      />

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
              onRefresh={onRefresh}
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
          body={<Table items={pageData?.content || []} loading={isLoading} onRefresh={onRefresh} />}
          footer={pagination.render()}
        />
      </Container>
    </>
  )
}

export default DetailAppliedDeductionEmployeesPage
