import Container from '@/components/Elements/Container'
import MainCard from '@/components/Elements/MainCard'
import MainCardHeader from '@/components/Elements/MainCardHeader'
import PageHeader from '@/components/Elements/PageHeader'
import usePagination from '@/hooks/use-pagination'
import { payrollService } from '@/services'
import { Button } from 'jobseeker-ui'
import { FileSpreadsheetIcon, ImportIcon, TimerResetIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Table from './components/Table'

const RequestPage: React.FC = () => {
  const [searchParams, setSearchParam] = useSearchParams()

  const search = searchParams.get('search') || undefined

  const [pageData, setPageData] = useState<IPaginationResponse<IDeductionComponent>>()
  const [pageError, setPageError] = useState<any>()
  const [isLoading, setIsLoading] = useState(true)
  const [switchData, setSwitchData] = useState(false)

  const pagination = usePagination({
    pathname: '/payroll/deduction-components',
    totalPage: pageData?.totalPages || 0,
    params: { search },
  })

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    const load = async (signal: AbortSignal) => {
      setIsLoading(true)
      try {
        const data = await payrollService.fetchDeductionComponents(
          {
            q: search,
            page: pagination.currentPage,
            limit: 20,
          },
          signal,
        )
        setPageData(data)
        setIsLoading(false)
      } catch (e: any) {
        if (e.message !== 'canceled') setPageError(e)
      }
    }

    load(signal)

    return () => {
      controller.abort()
    }
  }, [search, pagination.currentPage, switchData])

  const refresh = () => setSwitchData((v) => !v)

  if (pageError) throw pageError

  return (
    <>
      <PageHeader
        breadcrumb={[{ text: 'Payroll' }, { text: 'Run' }, { text: 'Detail' }]}
        title="Payroll Request Detail"
        subtitle="You can review or manage employee payroll components."
        actions={
          <>
            <div className="flex gap-2">
              <Button color="primary" className="text-white" leftChild={<TimerResetIcon size={16} />}>
                Reset This Period
              </Button>
              <Button color="success" leftChild={<FileSpreadsheetIcon size={16} />}>
                Export
              </Button>
              <Button color="primary" className="text-white" leftChild={<ImportIcon size={16} />}>
                Import
              </Button>
            </div>
          </>
        }
      />

      <Container className="relative flex flex-col gap-3 py-3 xl:pb-8">
        <MainCard
          header={
            <MainCardHeader
              title="Component List"
              subtitleLoading={typeof pageData?.totalElements !== 'number'}
              subtitle={
                <>
                  You have <span className="text-primary-600">{pageData?.totalElements} Component</span> in total
                </>
              }
              search={{
                value: search || '',
                setValue: (v) => setSearchParam({ search: v }),
              }}
            />
          }
          body={<Table items={pageData?.content || []} loading={isLoading} onRefresh={refresh} />}
          footer={pagination.render()}
        />
      </Container>
    </>
  )
}

export default RequestPage
