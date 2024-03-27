import Container from '@/components/Elements/Container'
import MainCard from '@/components/Elements/MainCard'
import MainCardHeader from '@/components/Elements/MainCardHeader'
import PageHeader from '@/components/Elements/PageHeader'
import usePagination from '@/hooks/use-pagination'
import { vacancyService } from '@/services'
import { Button } from 'jobseeker-ui'
import { SettingsIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Table from './components/Table'
import CreateModal from './components/CreateModal'

const DeductionComponentsPage: React.FC = () => {
  const [searchParams, setSearchParam] = useSearchParams()

  const search = searchParams.get('search') || undefined

  const [pageData, setPageData] = useState<IPaginationResponse<IDeductionComponent>>()
  const [pageError, setPageError] = useState<any>()
  const [isLoading, setIsLoading] = useState(true)

  const [showCreateModal, setShowCreateModal] = useState(false)
  const [switchData, setSwitchData] = useState(false)

  const pagination = usePagination({
    pathname: '/payroll/benefit-components',
    totalPage: pageData?.totalPages || 0,
    params: { search },
  })

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    const load = async (signal: AbortSignal) => {
      setIsLoading(true)
      try {
        const data = await vacancyService.fetchVacancies(
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
        subtitle="Manage Your Job Vacancy"
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

      <CreateModal
        show={showCreateModal}
        onClose={() => {
          setShowCreateModal(false)
          refresh()
        }}
      />

      <Container className="relative flex flex-col gap-3 py-3 xl:pb-8">
        <MainCard
          header={
            <MainCardHeader
              title="Component List"
              subtitleLoading={typeof pageData?.totalElements !== 'number'}
              subtitle={
                <>
                  You have <span className="text-primary-600">{pageData?.totalElements} Vacancy</span> in total
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

export default DeductionComponentsPage
