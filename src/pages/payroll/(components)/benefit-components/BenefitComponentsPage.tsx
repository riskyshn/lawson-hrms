import type { IBenefitComponent, IPaginationResponse } from '@/types'
import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Button } from '@jshrms/ui'
import { SettingsIcon } from 'lucide-react'
import Container from '@/components/Elements/Layout/Container'
import MainCard from '@/components/Elements/Layout/MainCard'
import MainCardHeader from '@/components/Elements/Layout/MainCardHeader'
import PageHeader from '@/components/Elements/Layout/PageHeader'
import usePagination from '@/core/hooks/use-pagination'
import { payrollService } from '@/services'
import CreateModal from '../components/CreateModal'
import Table from '../components/Table'

const BenefitComponentsPage: React.FC = () => {
  const [searchParams, setSearchParam] = useSearchParams()

  const search = searchParams.get('search') || undefined

  const [pageData, setPageData] = useState<IPaginationResponse<IBenefitComponent>>()
  const [pageError, setPageError] = useState<any>()
  const [isLoading, setIsLoading] = useState(true)

  const [showCreateModal, setShowCreateModal] = useState(false)
  const [switchData, setSwitchData] = useState(false)

  const pagination = usePagination({
    params: { search },
    pathname: '/payroll/benefit-components',
    totalPage: pageData?.totalPages,
  })

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    const load = async (signal: AbortSignal) => {
      setIsLoading(true)
      try {
        const data = await payrollService.fetchBenefitComponents(
          {
            limit: 20,
            page: pagination.currentPage,
            q: search,
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
        actions={
          <>
            <Button
              as={Link}
              className="text-gray-600"
              color="primary"
              leftChild={<SettingsIcon size={16} />}
              to="/payroll/bpjs-component"
              variant="light"
            >
              BPJS Component
            </Button>
            <Button className="ml-3" color="primary" onClick={() => setShowCreateModal(true)} type="button">
              Create Benefit
            </Button>
          </>
        }
        breadcrumb={[{ text: 'Payroll' }, { text: 'Benefit Components' }]}
        title="Benefit Components"
      />

      <CreateModal onClose={() => setShowCreateModal(false)} onCreated={refresh} show={showCreateModal} type="BENEFIT" />

      <Container className="relative flex flex-col gap-3 py-3 xl:pb-8">
        <MainCard
          body={<Table items={pageData?.content || []} loading={isLoading} onRefresh={refresh} type="BENEFIT" />}
          footer={pagination.render()}
          header={
            <MainCardHeader
              search={{
                setValue: (v) => setSearchParam({ search: v }),
                value: search || '',
              }}
              subtitle={
                <>
                  You have <span className="text-primary-600">{pageData?.totalElements} Component</span> in total
                </>
              }
              subtitleLoading={typeof pageData?.totalElements !== 'number'}
              title="Component List"
            />
          }
        />
      </Container>
    </>
  )
}

export default BenefitComponentsPage
