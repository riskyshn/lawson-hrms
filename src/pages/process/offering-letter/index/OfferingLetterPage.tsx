import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Container from '@jshrms/shared/components/Elements/Layout/Container'
import MainCard from '@jshrms/shared/components/Elements/Layout/MainCard'
import MainCardHeader from '@jshrms/shared/components/Elements/Layout/MainCardHeader'
import PageHeader from '@jshrms/shared/components/Elements/Layout/PageHeader'
import { useAsyncSearch, useOptionSearchParam, usePagination } from '@jshrms/shared/hooks'
import { organizationService, processService, vacancyService } from '@jshrms/shared/services'
import { AsyncSelect, Button } from '@jshrms/ui'
import { SettingsIcon } from 'lucide-react'
import Table from '../../components/Table'
import SetupOfferingLetterModal from './components/SetupOfferingLetterModal'

const OfferingLetterPage: React.FC = () => {
  const [searchParams, setSearchParam] = useSearchParams()
  const [showSetupOfferingLetterModal, setShowSetupOfferingLetterModal] = useState(false)

  const search = searchParams.get('search')
  const [vacancy, setVacancy, rawVacancy] = useOptionSearchParam('vacancy')
  const [stage, setStage, rawStage] = useOptionSearchParam('stage')

  const { isLoading, onRefresh, pageData } = useAsyncSearch(
    processService.fetchProcess,
    { limit: 20, stageName: stage?.value, type: 'OFFERING', vacancyId: vacancy?.value },
    search,
  )

  const pagination = usePagination({
    params: { search, state: rawStage, vacancy: rawVacancy },
    pathname: '/process/offering-letter',
    totalPage: pageData?.totalPages,
  })

  return (
    <>
      <PageHeader
        actions={
          <Button
            className="text-gray-600"
            color="primary"
            leftChild={<SettingsIcon size={16} />}
            onClick={() => setShowSetupOfferingLetterModal(true)}
            type="button"
            variant="light"
          >
            Setup Offering Letter
          </Button>
        }
        breadcrumb={[{ text: 'Process' }, { text: 'Offering Letter' }]}
        title="Offering Letter"
      />

      <SetupOfferingLetterModal onClose={() => setShowSetupOfferingLetterModal(false)} show={showSetupOfferingLetterModal} />

      <Container className="relative flex flex-col gap-3 py-3 xl:pb-8">
        <MainCard
          body={<Table items={pageData?.content || []} loading={isLoading} onRefresh={onRefresh} type="OFFERING" />}
          footer={pagination.render()}
          header={(open, toggleOpen) => (
            <MainCardHeader
              filter={
                open && (
                  <div className="grid grid-cols-2 gap-3 p-3">
                    <AsyncSelect
                      action={vacancyService.fetchVacancies}
                      className="mb-2"
                      converter={(data) => data.content.map((el) => ({ label: el.vacancyName, value: el.oid }))}
                      onValueChange={setVacancy}
                      placeholder="All Vacancy"
                      value={vacancy}
                      withReset
                    />
                    <AsyncSelect
                      action={organizationService.fetchRecruitmentStages}
                      className="mb-2"
                      converter={(res) => res.content.map(({ name, oid }) => ({ label: name || oid, value: name || oid }))}
                      onValueChange={setStage}
                      placeholder="All Stage"
                      value={stage}
                      withReset
                    />
                  </div>
                )
              }
              filterToogle={toggleOpen}
              onRefresh={onRefresh}
              search={{ setValue: (search) => setSearchParam({ search }), value: search || '' }}
              subtitle={
                <>
                  You have <span className="text-primary-600">{pageData?.totalElements} Candidate</span> in total
                </>
              }
              subtitleLoading={typeof pageData?.totalElements !== 'number'}
              title="Candidate List"
            />
          )}
        />
      </Container>
    </>
  )
}

export default OfferingLetterPage
