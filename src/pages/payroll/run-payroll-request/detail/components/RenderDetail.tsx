import MainCard from '@/components/Elements/Layout/MainCard'
import MainCardHeader from '@/components/Elements/Layout/MainCardHeader'
import useAsyncSearch from '@/hooks/use-async-search'
import usePagination from '@/hooks/use-pagination'
import { payrollService } from '@/services'
import { Button } from 'jobseeker-ui'
import { useSearchParams } from 'react-router-dom'
import StatisticCards from './StatisticCards'
import Table from './Table'

const RenderDetail: React.FC<{ item: IPayrollRequest }> = ({ item }) => {
  const [searchParams, setSearchParam] = useSearchParams()

  const search = searchParams.get('search') || undefined
  const page = searchParams.get('page') || undefined

  const { pageData, isLoading, onRefresh } = useAsyncSearch<IEmployeePayrollResult>({
    action: (params: IPaginationParam) => payrollService.fetchPayrollRequestResults(item.oid, params),
    params: { limit: 20, page },
    input: search || '',
  })

  const pagination = usePagination({
    pathname: `/payroll/run-payroll-request/${item.oid}`,
    totalPage: pageData?.totalPages || 0,
    params: { search },
  })

  return (
    <div className="grid grid-cols-1 gap-3">
      <StatisticCards item={item} />
      <MainCard
        header={
          <MainCardHeader
            title="Review Data"
            subtitleLoading={typeof pageData?.totalElements !== 'number'}
            subtitle={
              <>
                You have{' '}
                <span className="text-primary-600">
                  {pageData?.totalElements || 0} Data
                  {pageData?.totalElements !== 1 ? 's' : ''}
                </span>{' '}
                in total
              </>
            }
            actions={
              <Button type="button" variant="light">
                Export
              </Button>
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
      <div className="flex justify-end">
        <Button color="primary">Request for Approval</Button>
      </div>
    </div>
  )
}

export default RenderDetail
