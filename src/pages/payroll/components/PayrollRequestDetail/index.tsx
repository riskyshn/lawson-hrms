import MainCard from '@/components/Elements/Layout/MainCard'
import MainCardHeader from '@/components/Elements/Layout/MainCardHeader'
import useAsyncSearch from '@/core/hooks/use-async-search'
import usePagination from '@/core/hooks/use-pagination'
import { payrollService } from '@/services'
import { useAuthStore } from '@/store'
import {} from 'jobseeker-ui'
import { useSearchParams } from 'react-router-dom'

import Approver from './Approver'
import ExportButton from './ExportButton'
import StatisticCards from './StatisticCards'
import Table from './Table'

const PayrollRequestDetail: React.FC<{ item: IPayrollRequest; showApprover?: boolean }> = ({ item, showApprover }) => {
  const [searchParams, setSearchParam] = useSearchParams()

  const search = searchParams.get('search')

  const { user } = useAuthStore()

  const { isLoading, onRefresh, pageData } = useAsyncSearch(
    (params: IPaginationParam) => payrollService.fetchPayrollRequestResults(item.oid, params),
    { limit: 20 },
    search,
  )

  const pagination = usePagination({
    params: { search },
    pathname: `/payroll/payroll-request/${item.oid}`,
    totalPage: pageData?.totalPages,
  })

  return (
    <div className="grid grid-cols-1 gap-3">
      <StatisticCards item={item} />
      <MainCard
        body={<Table items={pageData?.content || []} loading={isLoading} onRefresh={onRefresh} />}
        footer={pagination.render()}
        header={
          <MainCardHeader
            actions={
              <ExportButton oid={item.oid} title={item.name || ''} variant="light">
                Export
              </ExportButton>
            }
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
                  {pageData?.totalElements || 0} Data
                  {pageData?.totalElements !== 1 ? 's' : ''}
                </span>{' '}
                in total
              </>
            }
            subtitleLoading={typeof pageData?.totalElements !== 'number'}
            title="Review Data"
          />
        }
      />

      {showApprover && item.approver?.oid === user?.employee?.oid && <Approver oid={item.oid} />}
    </div>
  )
}

export default PayrollRequestDetail
