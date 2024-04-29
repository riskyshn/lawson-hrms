import Container from '@/components/Elements/Layout/Container'
import MainCard from '@/components/Elements/Layout/MainCard'
import MainCardHeader from '@/components/Elements/Layout/MainCardHeader'
import PageHeader from '@/components/Elements/Layout/PageHeader'
import useAsyncSearch from '@/core/hooks/use-async-search'
import useOptionSearchParam from '@/core/hooks/use-option-search-params'
import usePagination from '@/core/hooks/use-pagination'
import { organizationService, processService, vacancyService } from '@/services'
import emmbedToOptions from '@/utils/emmbed-to-options'
import { AsyncSelect, Button } from 'jobseeker-ui'
import { SettingsIcon } from 'lucide-react'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Table from '../../components/Table'
import SetupOfferingLetterModal from './components/SetupOfferingLetterModal'

const OfferingLetterPage: React.FC = () => {
  const [searchParams, setSearchParam] = useSearchParams()
  const [showSetupOfferingLetterModal, setShowSetupOfferingLetterModal] = useState(false)

  const search = searchParams.get('search')
  const [vacancy, setVacancy, rawVacancy] = useOptionSearchParam('vacancy')
  const [stage, setStage, rawStage] = useOptionSearchParam('stage')

  const { pageData, isLoading, onRefresh } = useAsyncSearch(
    processService.fetchProcess,
    { limit: 20, stage: stage?.value, vacancy: vacancy?.value, type: 'OFFERING' },
    search,
  )

  const pagination = usePagination({
    pathname: '/process/offering-letter',
    totalPage: pageData?.totalPages,
    params: { search, vacancy: rawVacancy, state: rawStage },
  })
  return (
    <>
      <PageHeader
        breadcrumb={[{ text: 'Process' }, { text: 'Offering Letter' }]}
        title="Offering Letter"
        actions={
          <Button
            type="button"
            variant="light"
            color="primary"
            className="text-gray-600"
            leftChild={<SettingsIcon size={16} />}
            onClick={() => setShowSetupOfferingLetterModal(true)}
          >
            Setup Offering Letter
          </Button>
        }
      />

      <SetupOfferingLetterModal show={showSetupOfferingLetterModal} onClose={() => setShowSetupOfferingLetterModal(false)} />

      <Container className="relative flex flex-col gap-3 py-3 xl:pb-8">
        <MainCard
          header={(open, toggleOpen) => (
            <MainCardHeader
              title="Candidate List"
              subtitleLoading={typeof pageData?.totalElements !== 'number'}
              subtitle={
                <>
                  You have <span className="text-primary-600">{pageData?.totalElements} Candidate</span> in total
                </>
              }
              search={{ value: search || '', setValue: (search) => setSearchParam({ search }) }}
              onRefresh={onRefresh}
              filterToogle={toggleOpen}
              filter={
                open && (
                  <div className="grid grid-cols-2 gap-3 p-3">
                    <AsyncSelect
                      placeholder="All Vacancy"
                      className="mb-2"
                      withReset
                      action={vacancyService.fetchVacancies}
                      converter={(data) => data.content.map((el) => ({ label: el.vacancyName, value: el.oid }))}
                      value={vacancy}
                      onValueChange={setVacancy}
                    />
                    <AsyncSelect
                      placeholder="All Stage"
                      className="mb-2"
                      withReset
                      action={organizationService.fetchRecruitmentStages}
                      converter={emmbedToOptions}
                      value={stage}
                      onValueChange={setStage}
                    />
                  </div>
                )
              }
            />
          )}
          body={<Table type="OFFERING" items={pageData?.content || []} loading={isLoading} onRefresh={onRefresh} />}
          footer={pagination.render()}
        />
      </Container>
    </>
  )
}

export default OfferingLetterPage
