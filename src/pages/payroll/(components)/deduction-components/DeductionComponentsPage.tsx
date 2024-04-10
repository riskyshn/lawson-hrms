import Container from '@/components/Elements/Layout/Container'
import MainCard from '@/components/Elements/Layout/MainCard'
import MainCardHeader from '@/components/Elements/Layout/MainCardHeader'
import PageHeader from '@/components/Elements/Layout/PageHeader'
import usePagination from '@/hooks/use-pagination'
import { payrollService } from '@/services'
import { Button } from 'jobseeker-ui'
import { SettingsIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import CreateModal from '../components/CreateModal'
import Table from '../components/Table'

const DeductionComponentsPage: React.FC = () => {
  const [searchParams, setSearchParam] = useSearchParams()

  const search = searchParams.get('search') || undefined

  const [pageData, setPageData] = useState<IPaginationResponse<IDeductionComponent>>()
  const [pageError, setPageError] = useState<any>()
  const [isLoading, setIsLoading] = useState(true)

  const [showCreateModal, setShowCreateModal] = useState(false)
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
        breadcrumb={[{ text: 'Payroll' }, { text: 'Deduction Components' }]}
        title="Deduction Components"
        actions={
          <>
            <Button
              as={Link}
              to="/payroll/bpjs-component"
              variant="light"
              color="primary"
              className="text-gray-600"
              leftChild={<SettingsIcon size={16} />}
            >
              BPJS Component
            </Button>
            <Button type="button" color="primary" className="ml-3" onClick={() => setShowCreateModal(true)}>
              Create Deduction
            </Button>
          </>
        }
      />

      <CreateModal type="DEDUCTION" show={showCreateModal} onClose={() => setShowCreateModal(false)} onCreated={refresh} />

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
          body={<Table type="DEDUCTION" items={pageData?.content || []} loading={isLoading} onRefresh={refresh} />}
          footer={pagination.render()}
        />
      </Container>
    </>
  )
}

export default DeductionComponentsPage
