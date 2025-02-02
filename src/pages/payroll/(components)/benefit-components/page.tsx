import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Button, Container, MainCard, MainCardHeader, PageHeader } from 'jobseeker-ui'
import { SettingsIcon } from 'lucide-react'
import { useAsyncSearch, usePagination } from '@/hooks'
import { payrollService } from '@/services'
import CreateModal from '../components/CreateModal'
import Table from '../components/Table'

export const Component: React.FC = () => {
  const [searchParams, setSearchParam] = useSearchParams()
  const [showCreateModal, setShowCreateModal] = useState(false)

  const search = searchParams.get('search')

  const { pageData, isLoading, onRefresh } = useAsyncSearch(payrollService.fetchBenefitComponents, { limit: 20 }, search)
  const pagination = usePagination({
    params: { search },
    pathname: '/payroll/benefit-components',
    totalPage: pageData?.totalPages,
  })

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

      <CreateModal onClose={() => setShowCreateModal(false)} onCreated={onRefresh} show={showCreateModal} type="BENEFIT" />

      <Container className="relative flex flex-col gap-3 py-3 xl:pb-8">
        <MainCard
          body={<Table items={pageData?.content || []} loading={isLoading} onRefresh={onRefresh} type="BENEFIT" />}
          footer={pagination.render()}
          header={
            <MainCardHeader
              search={{
                setValue: (v) => setSearchParam({ search: v }),
                value: search || '',
              }}
              onRefresh={onRefresh}
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

Component.displayName = 'BenefitComponentsPage'
