import type { IDeductionComponent, IPaginationResponse } from '@jshrms/shared/types'
import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Container from '@jshrms/shared/components/Elements/Layout/Container'
import MainCard from '@jshrms/shared/components/Elements/Layout/MainCard'
import MainCardHeader from '@jshrms/shared/components/Elements/Layout/MainCardHeader'
import PageHeader from '@jshrms/shared/components/Elements/Layout/PageHeader'
import { usePagination } from '@jshrms/shared/hooks'
import { payrollService } from '@jshrms/shared/services'
import { Button } from '@jshrms/ui'
import { SettingsIcon } from 'lucide-react'
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
    params: { search },
    pathname: '/payroll/deduction-components',
    totalPage: pageData?.totalPages,
  })

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    const load = async (signal: AbortSignal) => {
      setIsLoading(true)
      try {
        const data = await payrollService.fetchDeductionComponents(
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
              Create Deduction
            </Button>
          </>
        }
        breadcrumb={[{ text: 'Payroll' }, { text: 'Deduction Components' }]}
        title="Deduction Components"
      />

      <CreateModal onClose={() => setShowCreateModal(false)} onCreated={refresh} show={showCreateModal} type="DEDUCTION" />

      <Container className="relative flex flex-col gap-3 py-3 xl:pb-8">
        <MainCard
          body={<Table items={pageData?.content || []} loading={isLoading} onRefresh={refresh} type="DEDUCTION" />}
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

export default DeductionComponentsPage
