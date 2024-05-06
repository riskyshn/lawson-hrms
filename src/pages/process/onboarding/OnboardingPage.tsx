import { useSearchParams } from 'react-router-dom'
import { AsyncSelect } from 'jobseeker-ui'
import Container from '@/components/Elements/Layout/Container'
import MainCard from '@/components/Elements/Layout/MainCard'
import MainCardHeader from '@/components/Elements/Layout/MainCardHeader'
import PageHeader from '@/components/Elements/Layout/PageHeader'
import useAsyncSearch from '@/core/hooks/use-async-search'
import useOptionSearchParam from '@/core/hooks/use-option-search-params'
import usePagination from '@/core/hooks/use-pagination'
import { organizationService, processService, vacancyService } from '@/services'
import Table from '../components/Table'

const OnboardingPage: React.FC = () => {
  const [searchParams, setSearchParam] = useSearchParams()

  const search = searchParams.get('search')
  const [vacancy, setVacancy, rawVacancy] = useOptionSearchParam('vacancy')
  const [stage, setStage, rawStage] = useOptionSearchParam('stage')

  const { isLoading, onRefresh, pageData } = useAsyncSearch(
    processService.fetchProcess,
    { limit: 20, stageName: stage?.value, type: 'ONBOARDING', vacancyId: vacancy?.value },
    search,
  )

  const pagination = usePagination({
    params: { search, state: rawStage, vacancy: rawVacancy },
    pathname: '/process/onboarding',
    totalPage: pageData?.totalPages,
  })

  return (
    <>
      <PageHeader breadcrumb={[{ text: 'Process' }, { text: 'Onboarding' }]} title="Onboarding" />

      <Container className="relative flex flex-col gap-3 py-3 xl:pb-8">
        <MainCard
          body={<Table items={pageData?.content || []} loading={isLoading} onRefresh={onRefresh} type="ONBOARDING" />}
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

export default OnboardingPage
