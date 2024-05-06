import Container from '@/components/Elements/Layout/Container'
import MainCard from '@/components/Elements/Layout/MainCard'
import MainCardHeader from '@/components/Elements/Layout/MainCardHeader'
import PageHeader from '@/components/Elements/Layout/PageHeader'
import useAsyncSearch from '@/core/hooks/use-async-search'
import usePagination from '@/core/hooks/use-pagination'
import { employeeService } from '@/services'

import { useParams, useSearchParams } from 'react-router-dom'

import Table from '../../components/DetailEmployees/Table'

const DetailAppliedBenefitEmployeesPage: React.FC = () => {
  const { componentId } = useParams()
  const [searchParams, setSearchParam] = useSearchParams()

  const search = searchParams.get('search')

  const { isLoading, onRefresh, pageData } = useAsyncSearch(employeeService.fetchPreviousEmployees, { limit: 20 }, search)

  const pagination = usePagination({
    params: { search },
    pathname: `/payroll/benefit-components/${componentId}/employees`,
    totalPage: pageData?.totalPages,
  })

  return (
    <>
      <PageHeader
        breadcrumb={[{ text: 'Payroll' }, { text: 'Benefit Components' }, { text: 'Employees have Benefit' }]}
        title="Employees have Benefit"
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

export default DetailAppliedBenefitEmployeesPage
