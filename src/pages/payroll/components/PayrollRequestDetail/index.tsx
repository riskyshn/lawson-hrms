import MainCard from '@/components/Elements/Layout/MainCard'
import MainCardHeader from '@/components/Elements/Layout/MainCardHeader'
import useAsyncSearch from '@/hooks/use-async-search'
import usePagination from '@/hooks/use-pagination'
import { payrollService } from '@/services'
import { useAuthStore } from '@/store'
import { useSearchParams } from 'react-router-dom'
import Approver from './Approver'
import ExportButton from './ExportButton'
import StatisticCards from './StatisticCards'
import Table from './Table'

const PayrollRequestDetail: React.FC<{ item: IPayrollRequest; showApprover?: boolean }> = ({ item, showApprover }) => {
  const [searchParams, setSearchParam] = useSearchParams()

  const search = searchParams.get('search')

  const { user } = useAuthStore()

  const { pageData, isLoading, onRefresh } = useAsyncSearch(
    (params: IPaginationParam) => payrollService.fetchPayrollRequestResults(item.oid, params),
    { limit: 20 },
    search,
  )

  const pagination = usePagination({
    pathname: `/payroll/payroll-request/${item.oid}`,
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
              <ExportButton variant="light" oid={item.oid} title={item.name || ''}>
                Export
              </ExportButton>
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

      {showApprover && item.approver?.oid === user?.employee?.oid && <Approver oid={item.oid} />}
    </div>
  )
}

export default PayrollRequestDetail
